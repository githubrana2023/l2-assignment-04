import { NextFunction, RequestHandler, Request, Response } from "express";

const tryCatch = (callbackFn: RequestHandler) => {

    return async (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(callbackFn(req, res, next)).catch(error => next(error));
    }
}

export default tryCatch