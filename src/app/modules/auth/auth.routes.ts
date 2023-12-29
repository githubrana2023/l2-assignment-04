import { Router } from "express";
import * as userControllers from './auth.controllers'
import schemaValidator from "../../utils/schemaValidator";
import authValidationSchema from "./auth.validation.schema";
import authorized from "../../middlewares/authorized";


const router = Router()

router.post(
    '/register',
    schemaValidator(authValidationSchema.userValidationSchema),
    userControllers.createUser
)

router.post(
    '/login',
    schemaValidator(authValidationSchema.userLoginValidationSchema),
    userControllers.loginUser
)

router.post(
    '/change-password',
    authorized('user', 'admin'),
    schemaValidator(authValidationSchema.changePasswordValidationSchema),
    userControllers.changePassword
)

const authRoutes = router
export default authRoutes