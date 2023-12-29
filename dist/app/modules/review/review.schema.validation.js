"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const reviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        courseId: zod_1.z.string({
            invalid_type_error: 'Course ID must be string',
            required_error: 'Course id is required'
        }),
        rating: zod_1.z.number({
            invalid_type_error: 'Rating must be number',
            required_error: 'Rating is required'
        }).min(1, { message: 'Rating must be at least 1 digit' }),
        review: zod_1.z.string({
            invalid_type_error: 'Review must be string',
            required_error: 'Review is required'
        })
    })
});
exports.default = reviewValidationSchema;
