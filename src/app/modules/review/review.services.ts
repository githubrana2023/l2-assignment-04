import { isExistById } from './../../utils/isExist';
import { JwtPayload } from "jsonwebtoken";
import { TReview } from "./review.interface";
import Review from "./review.model";
import User from '../auth/auth.model';


export const createReview = async (user: JwtPayload, payload: TReview) => {

    const existingUser = await isExistById(
        {
            model: User,
            id: user._id,
            select: '-password -previousPassword'
        }
    )

    const review = await Review.create({ ...payload, createdBy: existingUser._id });

    const newReview = await review.populate('createdBy')

    return newReview;
}
