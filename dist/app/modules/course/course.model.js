"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const http_status_codes_1 = require("http-status-codes");
const CourseTagsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Course Tag Name is Required'],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, { _id: false });
const CourseDetailsSchema = new mongoose_1.Schema({
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
}, { _id: false });
const CourseSchema = new mongoose_1.Schema({
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });
CourseSchema.static('isExistCourse', function isExistCourse(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const course = yield this.findById(id);
        if (!course) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, `Course not found`);
        }
        return course;
    });
});
const Course = (0, mongoose_1.model)('Course', CourseSchema);
exports.default = Course;
