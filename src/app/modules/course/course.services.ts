// import { TServicesReturn } from "../../types";
import mongoose from "mongoose";
import { TServicesReturn } from "../../types";
import getWeeks from "../../utils/getWeek";
import { TCourse } from "./course.interface";
import Course from "./course.model";
import { fields, filter, filterByPrice, pagination, search, sort } from "../../utils/queryBuilderFn";
import AppError from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { isExistById } from "../../utils/isExist";
import Review from "../review/review.model";


export const createCourse = async (user: JwtPayload, payload: TCourse): TServicesReturn<TCourse> => {

    //^ calculate duration in weeks and assign calculated result to durationInWeeks property 
    payload.durationInWeeks = getWeeks({ startDate: payload.startDate, endDate: payload.endDate })



    const newCourse = await Course.create({ ...payload, createdBy: user._id }); //^creating new course
    return newCourse;

}


export const getAllCourse = async (query: Record<string, unknown>) => {

    const searchQuery = search(Course.find().populate('createdBy'), query) //^ search filtering depends on user query

    const filterQuery = filter(searchQuery, query) //^ exact match filtering depends on user needs to be filtered

    const filterByPriceQuery = filterByPrice(filterQuery, query) //^filtering by price depends on user input

    const sortQuery = sort(filterByPriceQuery, query) //^ sorting depends on user input

    const paginationQuery = pagination(sortQuery, query) //^ pagination filtering 

    const fieldsQuery = await fields(paginationQuery, query) //^ fields filtering 

    const totalData = (await Course.find()).length

    return { courses: fieldsQuery, totalData }
}


export const updateSingleCourse = async (id: string, { details, tags, ...payload }: Partial<TCourse>): TServicesReturn<TCourse> => {
    const course = await Course.isExistCourse(id) //^before update course checking course exist or not 

    const modifiedPayload: Record<string, unknown> = { ...payload } //^ assign a object variable for update dynamically

    if (details && Object.keys(details).length) { //^ for dynamic update details non-primitive value

        for (const [key, value] of Object.entries(details)) {
            modifiedPayload[`details.${key}`] = value
        }
    }

    if (payload.durationInWeeks) { //^ if admin want to update course duration in weeks directly throwing an error 
        throw new AppError(StatusCodes.BAD_REQUEST, `Please update startDate and endDate to update durationInWeeks`)
    }


    if (modifiedPayload.startDate || modifiedPayload.endDate) {
        //^ if admin want to update startDate and endDate then calculate durationInWeeks and update that dynamically
        modifiedPayload.durationInWeeks = getWeeks(
            {
                startDate: (modifiedPayload?.startDate as string) || course.startDate,
                endDate: (modifiedPayload?.endDate as string) || course.endDate
            }
        )
    }

    //^ dynamically delete course tags elements
    const deletedTags = tags?.filter(tag => tag.name && tag.isDeleted).map(tag => tag.name)

    //^ dynamically add course tags elements
    const addedTags = tags?.filter(tag => tag.name && !tag.isDeleted)

    const session = await mongoose.startSession() //^ for safety multiple database write operations

    try {
        session.startTransaction()

        //^ update basic properties
        const basicUpdatedTags = await Course.findByIdAndUpdate(
            id,
            {
                $set: modifiedPayload,
            },
            {
                session,
                new: true,
                runValidators: true
            }
        ).populate('createdBy')

        if (!basicUpdatedTags) { //^ if failed to update course
            throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update')
        }

        if (tags && tags.length) {
            //^ delete tags array elements properties has isDeleted true 
            const deletedUpdatedTags = await Course.findByIdAndUpdate(
                id,
                {
                    $pull: { tags: { name: { $in: deletedTags } } }
                },
                {
                    session,
                    new: true,
                    runValidators: true
                }
            ).populate('createdBy')

            if (!deletedUpdatedTags) {
                throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update')
            }

            //^ adding tags array elements properties has isDeleted false 
            const addedUpdatedTags = await Course.findByIdAndUpdate(
                id,
                {
                    $addToSet: { tags: { $each: addedTags } }
                },
                {
                    session,
                    new: true,
                    runValidators: true
                }
            ).populate('createdBy')

            if (!addedUpdatedTags) {
                throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update')
            }
        }

        await session.commitTransaction()
        await session.endSession()


        const updatedCourse = await isExistById(
            {
                model: Course,
                id,
                populate: 'createdBy'
            }
        )


        return updatedCourse
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(StatusCodes.BAD_REQUEST, 'failed to update course')
    }
}


export const getSingleCourseWithReviews = async (id: string) => {
    const course = await isExistById(
        {
            model: Course,
            id,
            message: 'Course not found',
            populate: 'createdBy'
        }
    )

    const reviews = await Review.find({ courseId: course._id }).populate('createdBy')


    return {
        course,
        reviews
    }
}


export const getBestCourseOnAvgRating = async () => {

    const courseWithReviews = await Course.aggregate(
        [
            {
                $lookup: {
                    from: 'reviews',  //^ looking data into reviews collection or model
                    localField: '_id',  //^ by local field _id
                    foreignField: 'courseId',  //^ looking reference to reviews collection or model courseId
                    as: 'reviews'
                }
            },
            {
                $addFields: {
                    averageRating: { $avg: '$reviews.rating' },  //^ adding averageRating field to course data
                    reviewCount: { $size: '$reviews' } //^ adding reviewCount field to course data
                }
            },
            {
                $sort: { 'averageRating': -1 } //^ sorting descending by averageRating field 
            },
            {
                $limit: 1 //^ limit single document for best course
            },
            {
                $project: { 'reviews': 0 }
            }
        ]
    )

    return courseWithReviews
}