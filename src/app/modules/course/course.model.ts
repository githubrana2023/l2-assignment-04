import { Schema, model } from "mongoose";
import { ICourseModel, TCourse, TCourseDetails, TCourseTags } from "./course.interface";
import { TDocumentQuery } from "../../types";
import AppError from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";


const CourseTagsSchema = new Schema<TCourseTags>({
    name: {
        type: String,
        required: [true, 'Course Tag Name is Required'],
    },

    isDeleted: {
        type: Boolean,
        default: false,
    }
}, { _id: false })


const CourseDetailsSchema = new Schema<TCourseDetails>({
    level: {
        type: String,
        enum: {
            values: ["Beginner", "Intermediate", "Advanced"],
            message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
        },
        required: [true, 'Course Details is required']
    },

    description: {
        type: String,
        required: [true, 'Course Description is required']
    }
}, { _id: false })


const CourseSchema = new Schema<TCourse, ICourseModel>({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },

    title: {
        type: String,
        required: [true, 'Course Title is required'],
        unique: true,
        trim: true,
    },

    instructor: {
        type: String,
        required: [true, 'Course Instructor is required'],
        trim: true,
    },

    price: {
        type: Number,
        required: [true, 'Course Price is required'],
    },

    language: {
        type: String,
        required: [true, 'Course Language is required'],
        trim: true,
    },

    provider: {
        type: String,
        required: [true, 'Course provider is required'],
        trim: true,
    },

    startDate: {
        type: String,
        required: [true, 'Course Start Date is required'],

    },

    endDate: {
        type: String,
        required: [true, 'Course End Date is required'],
    },

    durationInWeeks: {
        type: Number,
    },

    tags: {
        type: [CourseTagsSchema],
        required: [true, 'Course Tags is required'],
    },

    details: {
        type: CourseDetailsSchema,
        required: [true, 'Course Details is required'],
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })


CourseSchema.static('isExistCourse', async function isExistCourse(id: string) {
    const course: TDocumentQuery<TCourse> | null = await this.findById(id)
    if (!course) {
        throw new AppError(StatusCodes.NOT_FOUND, `Course not found`)
    }
    return course
})


const Course = model<TCourse, ICourseModel>('Course', CourseSchema)

export default Course