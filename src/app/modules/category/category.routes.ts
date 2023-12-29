import { Router } from "express";
import * as categoryControllers from './category.controller'
import schemaValidator from "../../utils/schemaValidator";
import categoryValidationSchema from "./category.validation.schema";
import authorized from "../../middlewares/authorized";

const router = Router()

router.post('/', authorized('admin'), schemaValidator(categoryValidationSchema), categoryControllers.createCategory)

router.get('/', categoryControllers.getAllCategories)

const categoryRoutes = router
export default categoryRoutes