/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

const globalMiddleware = async (error: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = error.status || 500
    let message = error.message || "Something went wrong"
    let errorMessage = ''

    if (error instanceof ZodError) {
        statusCode = 400
        message = 'Validation Error'
        errorMessage = error.issues.map(issue => issue.message).toString().split(',').join('. ');
    } else if (error?.name === "CastError") {
        statusCode = 400
        message = 'Invalid ID'
        errorMessage = `${error?.value} is not valid ID`
    }


    return res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        errorDetails: error,
        stack: error.stack
    })
}

export default globalMiddleware