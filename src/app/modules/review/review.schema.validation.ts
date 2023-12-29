import { z } from "zod";


const reviewValidationSchema = z.object({
    body: z.object(
        {
            courseId: z.string({
                invalid_type_error: 'Course ID must be string',
                required_error: 'Course id is required'
            }),

            rating: z.number({
                invalid_type_error: 'Rating must be number',
                required_error: 'Rating is required'
            }).min(1, { message: 'Rating must be at least 1 digit' }),

            review: z.string({
                invalid_type_error: 'Review must be string',
                required_error: 'Review is required'
            })
        }
    )
})


export default reviewValidationSchema