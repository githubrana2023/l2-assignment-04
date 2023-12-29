"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourseValidationSchema = void 0;
const zod_1 = require("zod");
const courseTagsValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Course tag name is required',
        invalid_type_error: 'Course tag name must be string'
    }).min(3, { message: 'Course tag name must be at least 3 characters long' }).trim(),
    isDeleted: zod_1.z.boolean({
        invalid_type_error: 'Course tag isDeleted must be boolean'
    }).optional()
});
const updateCourseTagsValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        invalid_type_error: 'Course tag name must be string'
    }).min(3, { message: 'Course tag name must be at least 3 characters long' }).trim().optional(),
    isDeleted: zod_1.z.boolean({
        invalid_type_error: 'Course tag isDeleted must be boolean'
    }).optional()
});
const courseDetailsValidationSchema = zod_1.z.object({
    level: zod_1.z.enum(["Beginner", "Intermediate", "Advanced"]),
    description: zod_1.z.string({
        invalid_type_error: 'Course description must be string',
    }).min(10, { message: 'Course description	must be at least 10 characters long' })
});
const updateCourseDetailsValidationSchema = zod_1.z.object({
    level: zod_1.z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
    description: zod_1.z.string({
        invalid_type_error: 'Course description must be string',
    }).min(10, { message: 'Course description	must be at least 10 characters long' }).optional()
});
const courseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        //^ course category id
        categoryId: zod_1.z.string({
            required_error: 'Course category id required',
            invalid_type_error: 'Course category must be string'
        }),
        //^ course title
        title: zod_1.z.string({
            required_error: 'Course title required',
            invalid_type_error: 'Course title must be string'
        }).trim(),
        //^ course instructor
        instructor: zod_1.z.string({
            required_error: 'Course instructor required',
            invalid_type_error: 'Course instructor must be string'
        }).trim(),
        //^ course price
        price: zod_1.z.number({
            required_error: 'Course price required',
            invalid_type_error: 'Course price must be number'
        }).min(1, { message: 'Course price must be at least 1 digit long' }),
        //^ course language
        language: zod_1.z.string({
            required_error: 'Course language required',
            invalid_type_error: 'Course language must be string'
        }).trim(),
        //^ course provider
        provider: zod_1.z.string({
            required_error: 'Course provider required',
            invalid_type_error: 'Course provider must be string'
        }).trim(),
        //^ course start date
        startDate: zod_1.z.string({
            required_error: 'Course start date required',
            invalid_type_error: 'Course start date must be string'
        }),
        //^ course start date
        endDate: zod_1.z.string({
            required_error: 'Course end date required',
            invalid_type_error: 'Course end date must be string'
        }),
        //^ course price
        tags: zod_1.z.array(courseTagsValidationSchema),
        //^ course price
        details: courseDetailsValidationSchema
    })
});
exports.updateCourseValidationSchema = zod_1.z.object({
    //^ course category id
    categoryId: zod_1.z.string({
        invalid_type_error: 'Course category must be string'
    }).optional(),
    //^ course title
    title: zod_1.z.string({
        invalid_type_error: 'Course title must be string'
    }).trim().optional(),
    //^ course instructor
    instructor: zod_1.z.string({
        invalid_type_error: 'Course instructor must be string'
    }).trim().optional(),
    //^ course price
    price: zod_1.z.number({
        invalid_type_error: 'Course price must be number'
    }).min(1, { message: 'Course price must be at least 1 digit long' }).optional(),
    //^ course language
    language: zod_1.z.string({
        invalid_type_error: 'Course language must be string'
    }).trim().optional(),
    //^ course provider
    provider: zod_1.z.string({
        invalid_type_error: 'Course provider must be string'
    }).trim().optional(),
    //^ course start date
    startDate: zod_1.z.string({
        invalid_type_error: 'Course start date must be string'
    }).optional(),
    //^ course start date
    endDate: zod_1.z.string({
        invalid_type_error: 'Course end date must be string'
    }).optional(),
    //^ course price
    tags: zod_1.z.array(updateCourseTagsValidationSchema).optional(),
    //^ course price
    details: updateCourseDetailsValidationSchema.optional()
});
exports.default = courseValidationSchema;
