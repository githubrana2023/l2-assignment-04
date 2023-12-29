import { z } from "zod";

const categoryValidationSchema = z.object({

    body: z.object({
        //^ category name
        name: z.string({
            required_error: 'Category name is required',
            invalid_type_error: 'Category name must be string'
        }).trim()
    })
})

export default categoryValidationSchema