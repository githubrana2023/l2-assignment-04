/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from "express"

const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        route: 'Api route not found',
        message: 'You should not send request at this Api Route'
    })
}

export default notFound