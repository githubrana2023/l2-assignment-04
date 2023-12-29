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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.loginUser = exports.createUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const returnResponse_1 = __importDefault(require("../../utils/returnResponse"));
const tryCatch_1 = __importDefault(require("../../utils/tryCatch"));
const authServices = __importStar(require("./auth.services"));
exports.createUser = (0, tryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const newUser = yield authServices.createUser(userData);
    return (0, returnResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: 'User registered successfully',
        data: {
            _id: newUser === null || newUser === void 0 ? void 0 : newUser._id,
            username: newUser === null || newUser === void 0 ? void 0 : newUser.username,
            email: newUser === null || newUser === void 0 ? void 0 : newUser.email,
            role: newUser === null || newUser === void 0 ? void 0 : newUser.role,
            createdAt: newUser === null || newUser === void 0 ? void 0 : newUser.createdAt,
            updatedAt: newUser === null || newUser === void 0 ? void 0 : newUser.updatedAt
        }
    });
}));
exports.loginUser = (0, tryCatch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginUserData = req.body;
    const userCredentials = yield authServices.loginUser(loginUserData);
    return (0, returnResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'User login successful',
        data: userCredentials
    });
}));
exports.changePassword = (0, tryCatch_1.default)(({ user, body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    const changedPassword = yield authServices.changePassword(user, body);
    return (0, returnResponse_1.default)(res, {
        statusCode: (changedPassword === null || changedPassword === void 0 ? void 0 : changedPassword.isSuccessfullyChanged) ? http_status_codes_1.StatusCodes === null || http_status_codes_1.StatusCodes === void 0 ? void 0 : http_status_codes_1.StatusCodes.OK : http_status_codes_1.StatusCodes === null || http_status_codes_1.StatusCodes === void 0 ? void 0 : http_status_codes_1.StatusCodes.BAD_REQUEST,
        success: changedPassword === null || changedPassword === void 0 ? void 0 : changedPassword.isSuccessfullyChanged,
        message: (changedPassword === null || changedPassword === void 0 ? void 0 : changedPassword.isSuccessfullyChanged) ? 'Password changed successfully' : changedPassword.message,
        data: changedPassword.data
    });
}));
