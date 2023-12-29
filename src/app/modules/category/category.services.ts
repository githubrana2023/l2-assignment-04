import { JwtPayload } from "jsonwebtoken";
import { TServicesReturn } from "../../types";
import { TCategory } from "./category.interface";
import Category from "./category.model";


export const createCategory = async (user: JwtPayload, payload: TCategory): TServicesReturn<TCategory> => {

    const newCategory = await Category.create({ ...payload, createdBy: user._id }); //^ creating new category into db
    return newCategory
}


export const getAllCategories = async () => {

    const categories = await Category.find().populate('createdBy').select('-previousPassword') //^ looking for all categories
    return categories
}
