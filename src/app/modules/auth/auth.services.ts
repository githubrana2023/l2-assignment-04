import { StatusCodes } from "http-status-codes";
import AppError from "../../utils/AppError";
import { TUser, TUserPreviousPassword } from "./auth.interface";

import bcrypt from 'bcryptjs'
import config from "../../config";
import createToken from "../../utils/createToken";
import { JwtPayload } from "jsonwebtoken";
import User from "./auth.model";

export const createUser = async (payload: TUser) => {

    const { email, password, username, role } = payload
    const storedPreviousPassword: TUserPreviousPassword[] = []

    const existingUserByUsername = await User.findOne(
        {
            username
        }
    )


    if (existingUserByUsername) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            `User already exists with this username ${username}`
        )
    }

    const existingUserByEmail = await User.findOne(
        {
            email
        }
    )


    if (existingUserByEmail) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            `User already exists with this email ${email}`
        )
    }


    const hashedPassword = await bcrypt.hash(password, config.bcrypt_salt_round)

    storedPreviousPassword.unshift({ previousPassword: hashedPassword, timestamp: new Date() })


    const user: TUser = {
        ...payload,
        role: role || 'user',
        password: hashedPassword,
        previousPassword: storedPreviousPassword
    }


    const newUser = await User.create(user)

    return newUser
}

export const loginUser = async (payload: Pick<TUser, 'username' | 'password'>) => {
    const { username, password } = payload

    const existingUser = await User.findOne(
        {
            username
        }
    ).select('+password')

    if (!existingUser) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            'User not found'
        )
    }


    const isCorrectPassword = await bcrypt.compare(password, existingUser.password)

    if (!isCorrectPassword) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            'Invalid credentials'
        )
    }

    const token = await createToken(
        {
            _id: existingUser._id,
            email: existingUser.email,
            role: existingUser.role,
        },
        config.jwt_secret,
        { expiresIn: '90d' }
    )

    return {
        user: {
            _id: existingUser._id,
            email: existingUser.email,
            username: existingUser.username,
            role: existingUser.role
        },
        token
    }
}

export const changePassword = async (user: JwtPayload, payload: { currentPassword: string, newPassword: string }) => {
    const existingUser = await User.isExistById(user._id)

    const isCorrectPassword = await bcrypt.compare(payload.currentPassword, existingUser.password)

    if (!isCorrectPassword) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid credentials')
    }

    const previousThreePasswords = existingUser.previousPassword.sort(
        (a, b) => {
            const x = new Date(a.timestamp).getTime()
            const y = new Date(b.timestamp).getTime()
            return y - x
        }
    ).slice(0, 2)

    const isUnique = previousThreePasswords.every((value) => {
        return !bcrypt.compareSync(payload.newPassword, value.previousPassword) && !bcrypt.compareSync(payload.newPassword, existingUser.password)
    })

    if (!isUnique) {
        return {
            isSuccessfullyChanged: false,
            message: `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${previousThreePasswords[0].timestamp}).`,
            data: null
        }
    }
    const newHashedPassword = await bcrypt.hash(payload.newPassword, config.bcrypt_salt_round)

    const previousChangedPassword = [...previousThreePasswords]

    previousChangedPassword.push({ previousPassword: newHashedPassword, timestamp: new Date() })

    const updatedPassword = await User.findByIdAndUpdate(
        existingUser._id,
        {
            $set: {
                password: newHashedPassword,
                previousPassword: previousChangedPassword
            }
        },
        {
            new: true
        }
    )

    if (!updatedPassword) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update password')
    }

    const updatedUser = await User.findById(user._id).select('-password -previousPassword')

    return {
        isSuccessfullyChanged: true,
        message: 'Password changed successfully',
        data: updatedUser
    }
}