import { NextFunction, Request, Response } from "express";
import { Schema } from "zod";

const schemaValidator = (schema: Schema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { ...body } = req.body
            await schema.parseAsync({body})
            next()
        } catch (error) {
            next(error)
        }
    }
}

export default schemaValidator