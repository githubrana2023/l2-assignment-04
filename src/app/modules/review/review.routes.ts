import { Router } from "express";
import * as reviewControllers from './review.controllers'
import schemaValidator from "../../utils/schemaValidator";
import reviewValidationSchema from "./review.schema.validation";
import authorized from "../../middlewares/authorized";

const router = Router();

router.post('/',authorized('user'), schemaValidator(reviewValidationSchema), reviewControllers.createReview)

const reviewRouter = router
export default reviewRouter