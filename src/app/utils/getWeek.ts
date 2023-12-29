import { StatusCodes } from "http-status-codes"
import AppError from "./AppError"

const getWeeks = ({ endDate, startDate }: { startDate: string, endDate: string }) => {

    const timeDifference = new Date(endDate).getTime() - new Date(startDate).getTime()

    if (timeDifference < 0) {
        throw new AppError(StatusCodes.BAD_REQUEST,`Possible your start date is greater than end date`)
    }
    if (timeDifference === 0) {
        throw new AppError(StatusCodes.BAD_REQUEST,`Start date and End date can't be same`)
    }

    const weeks = Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 7))
    return weeks
}

export default getWeeks