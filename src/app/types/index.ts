/* eslint-disable @typescript-eslint/ban-types */
import { Router } from 'express';
import { Types } from 'mongoose';
import { Document } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

export type TRoutes = {
    path: string;
    router: Router
}[]


export type TIsExistReturn<T> = Promise<(Document<unknown, Record<string, never>, T> & T & {
    _id: Types.ObjectId;
})>


export type TDocumentQuery<T> = Document<unknown, {}, T> & T & {
    _id: Types.ObjectId;
}

export type TServicesReturn<T> = Promise<Document<unknown, {}, T> & T & {
    _id: Types.ObjectId;
}>


export type TReturnResponse<T> = {
    success: boolean,
    statusCode: StatusCodes,
    message: string
    meta?: {
        page: number;
        limit: number;
        total: number
    },
    data: T
}