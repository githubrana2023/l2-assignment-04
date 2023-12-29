import { Response } from "express";
import { TReturnResponse } from "../types";

const returnResponse = <T>(res: Response, data: TReturnResponse<T>) => {

    if (data?.meta) {
        return res.status(data.statusCode).json({
            success: data.success,
            statusCode: data.statusCode,
            message: data.message,
            meta: data.meta,
            data: data.data,
        })
    }


    return res.status(data.statusCode).json({
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        data: data.data,
    })
}

export default returnResponse