/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { TIsExistReturn } from "../../types";


export type TCourseTags = {
    name: string;
    isDeleted: boolean;
}

export type TCourseDetails = {
    level: "Beginner" | "Intermediate" | "Advanced";
    description: string;
}

export type TCourse = {
    title: string;
    instructor: string;
    categoryId: Types.ObjectId;
    price: number;
    tags: TCourseTags[];
    startDate: string;
    endDate: string;
    language: string;
    provider: string;
    durationInWeeks: number;
    details: TCourseDetails,
    createdBy:Types.ObjectId
}

export interface ICourseModel extends Model<TCourse> {
    isExistCourse(id: string): TIsExistReturn<TCourse>
}