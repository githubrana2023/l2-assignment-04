import { Router } from "express";
import userRoutes from "../modules/auth/auth.routes";
import { TRoutes } from "../types";


const router = Router()
const authRoutes: TRoutes = [
    {
        path: '/',
        router: userRoutes
    },
]

authRoutes.map((route) => router.use(route.path, route.router))
const authRouter = router
export default authRouter