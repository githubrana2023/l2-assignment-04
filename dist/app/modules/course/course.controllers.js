"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getBestCourseOnAvgRating = exports.getSingleCourseWithReviews = exports.updateSingleCourse = exports.getAllCourses = exports.createCourse = void 0;
const courseServices = __importStar(require("./course.services"));
const returnResponse_1 = __importDefault(require("../../utils/returnResponse"));
const http_status_codes_1 = require("http-status-codes");
const tryCatch_1 = __importDefault(require("../../utils/tryCatch"));
exports.createCourse = (0, tryCatch_1.default)(({ body, user }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCourse = yield courseServices.createCourse(user, body);
    return (0, returnResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: `Course created successfully`,
        data: newCourse
    });
}));
exports.getAllCourses = (0, tryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const query = __rest(req.query, []);
    const { courses, totalData } = yield courseServices.getAllCourse(query);
    return (0, returnResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: `Total ${courses === null || courses === void 0 ? void 0 : courses.length} Courses are retrieved successfully`,
        meta: {
            page: Number((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.page) || 1,
            limit: Number((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.limit) || 10,
            total: totalData
        },
        data: courses
    });
}));
exports.updateSingleCourse = (0, tryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateAbleData = __rest(req.body, []);
    const id = req.params.courseId;
    const updatedCourse = yield courseServices.updateSingleCourse(id, updateAbleData);
    return (0, returnResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Course updated successfully',
        data: updatedCourse
    });
}));
exports.getSingleCourseWithReviews = (0, tryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.courseId;
    const result = yield courseServices.getSingleCourseWithReviews(id);
    return (0, returnResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: `$ Course found successfully`,
        data: result
    });
}));
exports.getBestCourseOnAvgRating = (0, tryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield courseServices.getBestCourseOnAvgRating();
    return (0, returnResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Course found successfully',
        data: result
    });
}));
