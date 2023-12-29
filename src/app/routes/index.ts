import { Router } from "express";
import { TRoutes } from "../types";
import categoryRoutes from "../modules/category/category.routes";
import courseRoutes from "../modules/course/course.routes";
import reviewRouter from "../modules/review/review.routes";
import authRoutes from "../modules/auth/auth.routes";


const router = Router();

const routes: TRoutes = [
    {
        path: '/auth',
        router: authRoutes
    },
    {
        path: '/categories',
        router: categoryRoutes
    },
    {
        path: '/',
        router: courseRoutes
    },
    {
        path: '/reviews',
        router: reviewRouter
    },
]

routes.map(routes => router.use(routes.path, routes.router))

export default router