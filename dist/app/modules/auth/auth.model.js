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
const UserPreviousPasswordSchema = new mongoose_1.Schema({
    previousPassword: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
}, { _id: false, });
const UserSchema = new mongoose_1.Schema({
    //^username
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    //^email
    email: {
        type: String,
        required: true,
        unique: true,
    },
    //^password
    password: {
        type: String,
        required: true,
        select: 0
    },
    //^role
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: 'Invalid role `{VALUE}`. Role must be one of the following values ("user", "admin")'
        },
        default: 'user'
    },
    previousPassword: {
        type: [UserPreviousPasswordSchema],
        select: 0
    }
}, { timestamps: true });
UserSchema.statics.isExistByField = function (field) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield this.findOne(field).select('+password +previousPassword');
        if (!existingUser) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User does not exist');
        }
        return existingUser;
    });
};
UserSchema.statics.isExistById = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield this.findById(id).select('+password +previousPassword');
        if (!existingUser) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User does not exist');
        }
        return existingUser;
    });
};
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
