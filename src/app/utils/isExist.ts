import { FilterQuery, Model, Types } from "mongoose";
import AppError from "./AppError";
import { StatusCodes } from "http-status-codes";

export type isExist<T> = {
    model: Model<T>;
    message?: string;
    statusCode?: StatusCodes;
    select?: string;
    populate?: string;
}

export interface isExistByIdParams<T> extends isExist<T> {
    id: Types.ObjectId | string;
}

export interface isExistByFieldParams<T> extends isExist<T> {
    field: FilterQuery<T>
}

export const isExistById = async <T>({ model, id, message, statusCode, select, populate }: isExistByIdParams<T>) => {

    const exist = await model.findById(id).select(select || '-__v').populate(populate || '')
    if (!exist) {
        throw new AppError(statusCode || StatusCodes.NOT_FOUND, message || 'User does not exist')
    }
    return exist
}

export const isExistByField = async <T>({ model, field, message, statusCode, select, populate }: isExistByFieldParams<T>) => {

    const exist = await model.findById(field).select(select || '-__v').populate(populate || '')
    if (!exist) {
        throw new AppError(statusCode || StatusCodes.NOT_FOUND, message || 'User does not exist')
    }
    return exist
}