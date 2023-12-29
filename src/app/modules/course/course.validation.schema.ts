import { z } from "zod";


const courseTagsValidationSchema = z.object({
    name: z.string({
        required_error: 'Course tag name is required',
        invalid_type_error: 'Course tag name must be string'
    }).min(3, { message: 'Course tag name must be at least 3 characters long' }).trim(),


    isDeleted: z.boolean({
        invalid_type_error: 'Course tag isDeleted must be boolean'
    }).optional()
})

const updateCourseTagsValidationSchema = z.object({
    name: z.string({
        invalid_type_error: 'Course tag name must be string'
    }).min(3, { message: 'Course tag name must be at least 3 characters long' }).trim().optional(),


    isDeleted: z.boolean({
        invalid_type_error: 'Course tag isDeleted must be boolean'
    }).optional()
})


const courseDetailsValidationSchema = z.object({
    level: z.enum(["Beginner", "Intermediate", "Advanced"]),

    description: z.string({
        invalid_type_error: 'Course description must be string',
    }).min(10, { message: 'Course description	must be at least 10 characters long' })
})

const updateCourseDetailsValidationSchema = z.object({
    level: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),

    description: z.string({
        invalid_type_error: 'Course description must be string',
    }).min(10, { message: 'Course description	must be at least 10 characters long' }).optional()
})

const courseValidationSchema = z.object({
    body: z.object(
        {
            //^ course category id
            categoryId: z.string({
                required_error: 'Course category id required',
                invalid_type_error: 'Course category must be string'
            }),


            //^ course title
            title: z.string({
                required_error: 'Course title required',
                invalid_type_error: 'Course title must be string'
            }).trim(),


            //^ course instructor
            instructor: z.string({
                required_error: 'Course instructor required',
                invalid_type_error: 'Course instructor must be string'
            }).trim(),


            //^ course price
            price: z.number({
                required_error: 'Course price required',
                invalid_type_error: 'Course price must be number'
            }).min(1, { message: 'Course price must be at least 1 digit long' }),


            //^ course language
            language: z.string({
                required_error: 'Course language required',
                invalid_type_error: 'Course language must be string'
            }).trim(),


            //^ course provider
            provider: z.string({
                required_error: 'Course provider required',
                invalid_type_error: 'Course provider must be string'
            }).trim(),


            //^ course start date
            startDate: z.string({
                required_error: 'Course start date required',
                invalid_type_error: 'Course start date must be string'
            }),


            //^ course start date
            endDate: z.string({
                required_error: 'Course end date required',
                invalid_type_error: 'Course end date must be string'
            }),


            //^ course price
            tags: z.array(courseTagsValidationSchema),


            //^ course price
            details: courseDetailsValidationSchema
        }
    )
})

export const updateCourseValidationSchema = z.object({
    //^ course category id
    categoryId: z.string({
        invalid_type_error: 'Course category must be string'
    }).optional(),


    //^ course title
    title: z.string({
        invalid_type_error: 'Course title must be string'
    }).trim().optional(),


    //^ course instructor
    instructor: z.string({
        invalid_type_error: 'Course instructor must be string'
    }).trim().optional(),


    //^ course price
    price: z.number({
        invalid_type_error: 'Course price must be number'
    }).min(1, { message: 'Course price must be at least 1 digit long' }).optional(),


    //^ course language
    language: z.string({
        invalid_type_error: 'Course language must be string'
    }).trim().optional(),


    //^ course provider
    provider: z.string({
        invalid_type_error: 'Course provider must be string'
    }).trim().optional(),


    //^ course start date
    startDate: z.string({
        invalid_type_error: 'Course start date must be string'
    }).optional(),


    //^ course start date
    endDate: z.string({
        invalid_type_error: 'Course end date must be string'
    }).optional(),


    //^ course price
    tags: z.array(updateCourseTagsValidationSchema).optional(),


    //^ course price
    details: updateCourseDetailsValidationSchema.optional()
})


export default courseValidationSchema