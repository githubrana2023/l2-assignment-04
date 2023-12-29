/* eslint-disable no-unused-vars */
import { FilterQuery, Model, Types } from "mongoose";
import { TDocumentQuery } from "../../types";

export type TUserRole = 'user' | 'admin';

export type TUserPreviousPassword = {
    timestamp: Date,
    previousPassword: string
}

export type TUser = {
    username: string;
    email: string;
    password: string;
    role: TUserRole
    previousPassword: TUserPreviousPassword[]
}

export interface IUserModel extends Model<TUser> {
    isExistByField(field: FilterQuery<TUser>): Promise<TDocumentQuery<TUser>>;
    isExistById(id: string | Types.ObjectId): Promise<TDocumentQuery<TUser>>
}