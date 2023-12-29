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
const mongoose_2 = require("mongoose");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const http_status_codes_1 = require("http-status-codes");
const CategorySchema = new mongoose_1.Schema({
    //^ Category name
    name: {
        type: String,
        required: [true, 'Category Name is required'],
        unique: true,
        trim: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });
CategorySchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isExist = yield Category.findOne({ name: this.name }); //^ checking category is exists or not
        if (isExist) {
            //^ if exists, throwing error that category is already exists
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `Category is already exists`);
        }
        next(); //^ if not exists, calling next function
    });
});
const Category = (0, mongoose_2.model)('Category', CategorySchema); //^ creating category collection or model
exports.default = Category;
