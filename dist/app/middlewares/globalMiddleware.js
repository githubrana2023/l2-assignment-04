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
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const globalMiddleware = (error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let statusCode = error.status || 500;
    let message = error.message || "Something went wrong";
    let errorMessage = '';
    if (error instanceof zod_1.ZodError) {
        statusCode = 400;
        message = 'Validation Error';
        errorMessage = error.issues.map(issue => issue.message).toString().split(',').join('. ');
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === "CastError") {
        statusCode = 400;
        message = 'Invalid ID';
        errorMessage = `${error === null || error === void 0 ? void 0 : error.value} is not valid ID`;
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        errorDetails: error,
        stack: error.stack
    });
});
exports.default = globalMiddleware;
