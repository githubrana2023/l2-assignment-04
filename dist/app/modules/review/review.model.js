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
const ReviewSchema = new mongoose_1.Schema({
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Course Id is required'],
        ref: 'Course'
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
    },
    review: {
        type: String,
        required: [true, 'Review is required'],
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
});
ReviewSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.rating <= 0) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Rating cannot be less than or equal zero');
        }
        if (this.rating > 5) {
            this.rating = 5;
        }
        next();
    });
});
const Review = (0, mongoose_1.model)('Review', ReviewSchema);
exports.default = Review;
