import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from './../modules/auth/auth.interface';
import tryCatch from "../utils/tryCatch";
import config from '../config';
import User from '../modules/auth/auth.model';



const authorized = (...roles: TUserRole[]) => {
    return tryCatch(
        async (req, res, next) => {

            const token = req?.headers?.authorization

            if (!token) {

                return res.send({
                    success: false,
                    message: "Unauthorized Access",
                    errorMessage: "You do not have the necessary permissions to access this resource.",
                    errorDetails: null,
                    stack: null
                })
            }

            const decoded = jwt.verify(token, config.jwt_secret) as JwtPayload

            const existingUser = await User.findById(decoded._id)
            if (!existingUser) {
                return res.send({
                    success: false,
                    message: "Unauthorized Access",
                    errorMessage: "You do not have the necessary permissions to access this resource.",
                    errorDetails: null,
                    stack: null
                })
                // throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized Access')
            }

            if (roles.length && !roles.includes(decoded.role)) {
                // throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized Access')
                return res.send({
                    success: false,
                    message: "Unauthorized Access",
                    errorMessage: "You do not have the necessary permissions to access this resource.",
                    errorDetails: null,
                    stack: null
                })
            }

            req.user = decoded
            next()
        }
    )
}


export default authorized
