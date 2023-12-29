import { FilterQuery, Schema, Types, model } from "mongoose";
import { IUserModel, TUser, TUserPreviousPassword } from "./auth.interface";
import AppError from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";


const UserPreviousPasswordSchema = new Schema<TUserPreviousPassword>({
    previousPassword: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }

}, { _id: false, })

const UserSchema = new Schema<TUser, IUserModel>({
    //^username
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    //^email
    email: {
        type: String,
        required: true,
        unique: true,
    },

    //^password
    password: {
        type: String,
        required: true,
        select: 0
    },

    //^role
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: 'Invalid role `{VALUE}`. Role must be one of the following values ("user", "admin")'
        },
        default: 'user'
    },
    previousPassword: {
        type: [UserPreviousPasswordSchema],
        select: 0
    }

}, { timestamps: true })


UserSchema.statics.isExistByField = async function (field: FilterQuery<TUser>) {
    const existingUser = await this.findOne(
        field
    ).select('+password +previousPassword')

    if (!existingUser) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            'User does not exist'
        )
    }
    return existingUser
}
UserSchema.statics.isExistById = async function (id: string | Types.ObjectId) {
    const existingUser = await this.findById(
        id
    ).select('+password +previousPassword')

    if (!existingUser) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            'User does not exist'
        )
    }
    return existingUser
}

const User = model<TUser, IUserModel>('User', UserSchema)

export default User