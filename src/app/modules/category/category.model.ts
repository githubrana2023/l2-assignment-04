import { Schema } from "mongoose";
import { TCategory } from "./category.interface";
import { model } from "mongoose";
import AppError from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";


const CategorySchema = new Schema<TCategory>({
    //^ Category name
    name: {
        type: String,
        required: [true, 'Category Name is required'],
        unique: true,
        trim: true,
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

CategorySchema.pre('save', async function (next) {
    const isExist = await Category.findOne({ name: this.name }) //^ checking category is exists or not

    if (isExist) {
        //^ if exists, throwing error that category is already exists
        throw new AppError(StatusCodes.BAD_REQUEST, `Category is already exists`)
    }
    next()  //^ if not exists, calling next function
})

const Category = model<TCategory>('Category', CategorySchema) //^ creating category collection or model
export default Category