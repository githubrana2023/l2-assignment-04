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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBestCourseOnAvgRating = exports.getSingleCourseWithReviews = exports.updateSingleCourse = exports.getAllCourse = exports.createCourse = void 0;
// import { TServicesReturn } from "../../types";
const mongoose_1 = __importDefault(require("mongoose"));
const getWeek_1 = __importDefault(require("../../utils/getWeek"));
const course_model_1 = __importDefault(require("./course.model"));
const queryBuilderFn_1 = require("../../utils/queryBuilderFn");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const http_status_codes_1 = require("http-status-codes");
const isExist_1 = require("../../utils/isExist");
const review_model_1 = __importDefault(require("../review/review.model"));
const createCourse = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //^ calculate duration in weeks and assign calculated result to durationInWeeks property 
    payload.durationInWeeks = (0, getWeek_1.default)({ startDate: payload.startDate, endDate: payload.endDate });
    const newCourse = yield course_model_1.default.create(Object.assign(Object.assign({}, payload), { createdBy: user._id })); //^creating new course
    return newCourse;
});
exports.createCourse = createCourse;
const getAllCourse = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchQuery = (0, queryBuilderFn_1.search)(course_model_1.default.find().populate('createdBy'), query); //^ search filtering depends on user query
    const filterQuery = (0, queryBuilderFn_1.filter)(searchQuery, query); //^ exact match filtering depends on user needs to be filtered
    const filterByPriceQuery = (0, queryBuilderFn_1.filterByPrice)(filterQuery, query); //^filtering by price depends on user input
    const sortQuery = (0, queryBuilderFn_1.sort)(filterByPriceQuery, query); //^ sorting depends on user input
    const paginationQuery = (0, queryBuilderFn_1.pagination)(sortQuery, query); //^ pagination filtering 
    const fieldsQuery = yield (0, queryBuilderFn_1.fields)(paginationQuery, query); //^ fields filtering 
    const totalData = (yield course_model_1.default.find()).length;
    return { courses: fieldsQuery, totalData };
});
exports.getAllCourse = getAllCourse;
const updateSingleCourse = (id, _a) => __awaiter(void 0, void 0, void 0, function* () {
    var { details, tags } = _a, payload = __rest(_a, ["details", "tags"]);
    const course = yield course_model_1.default.isExistCourse(id); //^before update course checking course exist or not 
    const modifiedPayload = Object.assign({}, payload); //^ assign a object variable for update dynamically
    if (details && Object.keys(details).length) { //^ for dynamic update details non-primitive value
        for (const [key, value] of Object.entries(details)) {
            modifiedPayload[`details.${key}`] = value;
        }
    }
    if (payload.durationInWeeks) { //^ if admin want to update course duration in weeks directly throwing an error 
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `Please update startDate and endDate to update durationInWeeks`);
    }
    if (modifiedPayload.startDate || modifiedPayload.endDate) {
        //^ if admin want to update startDate and endDate then calculate durationInWeeks and update that dynamically
        modifiedPayload.durationInWeeks = (0, getWeek_1.default)({
            startDate: (modifiedPayload === null || modifiedPayload === void 0 ? void 0 : modifiedPayload.startDate) || course.startDate,
            endDate: (modifiedPayload === null || modifiedPayload === void 0 ? void 0 : modifiedPayload.endDate) || course.endDate
        });
    }
    //^ dynamically delete course tags elements
    const deletedTags = tags === null || tags === void 0 ? void 0 : tags.filter(tag => tag.name && tag.isDeleted).map(tag => tag.name);
    //^ dynamically add course tags elements
    const addedTags = tags === null || tags === void 0 ? void 0 : tags.filter(tag => tag.name && !tag.isDeleted);
    const session = yield mongoose_1.default.startSession(); //^ for safety multiple database write operations
    try {
        session.startTransaction();
        //^ update basic properties
        const basicUpdatedTags = yield course_model_1.default.findByIdAndUpdate(id, {
            $set: modifiedPayload,
        }, {
            session,
            new: true,
            runValidators: true
        }).populate('createdBy');
        if (!basicUpdatedTags) { //^ if failed to update course
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to update');
        }
        if (tags && tags.length) {
            //^ delete tags array elements properties has isDeleted true 
            const deletedUpdatedTags = yield course_model_1.default.findByIdAndUpdate(id, {
                $pull: { tags: { name: { $in: deletedTags } } }
            }, {
                session,
                new: true,
                runValidators: true
            }).populate('createdBy');
            if (!deletedUpdatedTags) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to update');
            }
            //^ adding tags array elements properties has isDeleted false 
            const addedUpdatedTags = yield course_model_1.default.findByIdAndUpdate(id, {
                $addToSet: { tags: { $each: addedTags } }
            }, {
                session,
                new: true,
                runValidators: true
            }).populate('createdBy');
            if (!addedUpdatedTags) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to update');
            }
        }
        yield session.commitTransaction();
        yield session.endSession();
        const updatedCourse = yield (0, isExist_1.isExistById)({
            model: course_model_1.default,
            id,
            populate: 'createdBy'
        });
        return updatedCourse;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'failed to update course');
    }
});
exports.updateSingleCourse = updateSingleCourse;
const getSingleCourseWithReviews = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield (0, isExist_1.isExistById)({
        model: course_model_1.default,
        id,
        message: 'Course not found',
        populate: 'createdBy'
    });
    const reviews = yield review_model_1.default.find({ courseId: course._id }).populate('createdBy');
    return {
        course,
        reviews
    };
});
exports.getSingleCourseWithReviews = getSingleCourseWithReviews;
const getBestCourseOnAvgRating = () => __awaiter(void 0, void 0, void 0, function* () {
    const courseWithReviews = yield course_model_1.default.aggregate([
        {
            $lookup: {
                from: 'reviews', //^ looking data into reviews collection or model
                localField: '_id', //^ by local field _id
                foreignField: 'courseId', //^ looking reference to reviews collection or model courseId
                as: 'reviews'
            }
        },
        {
            $addFields: {
                averageRating: { $avg: '$reviews.rating' }, //^ adding averageRating field to course data
                reviewCount: { $size: '$reviews' } //^ adding reviewCount field to course data
            }
        },
        {
            $sort: { 'averageRating': -1 } //^ sorting descending by averageRating field 
        },
        {
            $limit: 1 //^ limit single document for best course
        },
        {
            $project: { 'reviews': 0 }
        }
    ]);
    return courseWithReviews;
});
exports.getBestCourseOnAvgRating = getBestCourseOnAvgRating;
