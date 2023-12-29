import * as courseServices from './course.services'
import returnResponse from "../../utils/returnResponse";
import { StatusCodes } from "http-status-codes";
import tryCatch from "../../utils/tryCatch";

export const createCourse = tryCatch(async ({ body, user }, res) => {
    const newCourse = await courseServices.createCourse(user, body)

    return returnResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: `Course created successfully`,
        data: newCourse
    })
})


export const getAllCourses = tryCatch(async (req, res) => {
    const { ...query } = req.query
    const { courses, totalData } = await courseServices.getAllCourse(query)
    return returnResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: `Total ${courses?.length} Courses are retrieved successfully`,
        meta: {
            page: Number(req?.query?.page) || 1,
            limit: Number(req?.query?.limit) || 10,
            total: totalData
        },
        data: courses
    })
})


export const updateSingleCourse = tryCatch(async (req, res) => {
    const { ...updateAbleData } = req.body
    const id = req.params.courseId

    const updatedCourse = await courseServices.updateSingleCourse(id, updateAbleData)

    return returnResponse(
        res,
        {
            success: true,
            statusCode: StatusCodes.OK,
            message: 'Course updated successfully',
            data: updatedCourse
        }
    )
})


export const getSingleCourseWithReviews = tryCatch(async (req, res) => {
    const id = req.params.courseId
    const result = await courseServices.getSingleCourseWithReviews(id)
    return returnResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: `$ Course found successfully`,
        data: result
    })
})


export const getBestCourseOnAvgRating = tryCatch(async (req, res) => {
    const result = await courseServices.getBestCourseOnAvgRating()
    return returnResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Course found successfully',
        data: result
    })
})