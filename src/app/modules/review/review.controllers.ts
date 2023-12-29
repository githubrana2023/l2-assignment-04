import { StatusCodes } from "http-status-codes";
import returnResponse from "../../utils/returnResponse";
import tryCatch from "../../utils/tryCatch";
import * as reviewServices from './review.services'

export const createReview = tryCatch(async ({ user, body }, res) => {
    const newReview = await reviewServices.createReview(user, body)
    return returnResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: 'Review created successfully',
        data: newReview,
    })
})
