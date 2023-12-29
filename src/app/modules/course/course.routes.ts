
import { Router } from "express";
import * as courseControllers from './course.controllers'
import schemaValidator from "../../utils/schemaValidator";
import courseValidationSchema, { updateCourseValidationSchema } from "./course.validation.schema";
import authorized from "../../middlewares/authorized";

const router = Router()

//^ course create route
router.post('/course', authorized('admin'), schemaValidator(courseValidationSchema), courseControllers.createCourse)

//^ all courses get route
router.get('/courses', courseControllers.getAllCourses)

//^ best courses depend on rating get route
router.get('/course/best', courseControllers.getBestCourseOnAvgRating)

//^ update single course put route
router.put('/courses/:courseId',authorized('admin'), schemaValidator(updateCourseValidationSchema), courseControllers.updateSingleCourse)

//^ get single course's reviews get route
router.get('/courses/:courseId/reviews', courseControllers.getSingleCourseWithReviews)

const courseRoutes = router
export default courseRoutes