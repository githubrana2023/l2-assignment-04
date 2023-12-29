import { Schema, model } from "mongoose";
import { TReview } from "./review.interface";
import AppError from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";


const ReviewSchema = new Schema<TReview>({
    courseId: {
        type: Schema.Types.ObjectId,
        required: [true, 'Course Id is required'],
        ref: 'Course'
    },

    rating: {
        type: Number,
        required: [true, 'Rating is required'],
    },

    review: {
        type: String,
        required: [true, 'Review is required'],
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

ReviewSchema.pre('save', async function (next) {
    if (this.rating <= 0) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Rating cannot be less than or equal zero');
    }
    if (this.rating > 5) {
        this.rating = 5;
    }
    next();
})

const Review = model<TReview>('Review', ReviewSchema)

export default Review