import { StatusCodes } from "http-status-codes";
import returnResponse from "../../utils/returnResponse";
import tryCatch from "../../utils/tryCatch";
import * as authServices from './auth.services'
import { TDocumentQuery } from "../../types";
import { TUser } from "./auth.interface";

export const createUser = tryCatch(
    async (req, res) => {
        const userData = req.body
        const newUser = await authServices.createUser(userData) as TDocumentQuery<TUser> & { createdAt: Date, updatedAt: Date } | null
        return returnResponse(
            res,
            {
                statusCode: StatusCodes.CREATED,
                success: true,
                message: 'User registered successfully',
                data: {
                    _id: newUser?._id,
                    username: newUser?.username,
                    email: newUser?.email,
                    role: newUser?.role,
                    createdAt: newUser?.createdAt,
                    updatedAt: newUser?.updatedAt
                }
            }
        )
    }
)


export const loginUser = tryCatch(
    async (req, res) => {
        const loginUserData = req.body
        const userCredentials = await authServices.loginUser(loginUserData)
        return returnResponse(
            res,
            {
                statusCode: StatusCodes.OK,
                success: true,
                message: 'User login successful',
                data: userCredentials
            }
        )
    }
)


export const changePassword = tryCatch(
    async ({ user, body }, res) => {

        const changedPassword = await authServices.changePassword(user, body)

        return returnResponse(
            res,
            {
                statusCode: changedPassword?.isSuccessfullyChanged ? StatusCodes?.OK : StatusCodes?.BAD_REQUEST,
                success: changedPassword?.isSuccessfullyChanged,
                message: changedPassword?.isSuccessfullyChanged ? 'Password changed successfully' : changedPassword.message,
                data: changedPassword.data
            }
        )

    }
)