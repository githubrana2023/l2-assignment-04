"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courseControllers = __importStar(require("./course.controllers"));
const schemaValidator_1 = __importDefault(require("../../utils/schemaValidator"));
const course_validation_schema_1 = __importStar(require("./course.validation.schema"));
const authorized_1 = __importDefault(require("../../middlewares/authorized"));
const router = (0, express_1.Router)();
//^ course create route
router.post('/course', (0, authorized_1.default)('admin'), (0, schemaValidator_1.default)(course_validation_schema_1.default), courseControllers.createCourse);
//^ all courses get route
router.get('/courses', courseControllers.getAllCourses);
//^ best courses depend on rating get route
router.get('/course/best', courseControllers.getBestCourseOnAvgRating);
//^ update single course put route
router.put('/courses/:courseId', (0, authorized_1.default)('admin'), (0, schemaValidator_1.default)(course_validation_schema_1.updateCourseValidationSchema), courseControllers.updateSingleCourse);
//^ get single course's reviews get route
router.get('/courses/:courseId/reviews', courseControllers.getSingleCourseWithReviews);
const courseRoutes = router;
exports.default = courseRoutes;
