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
exports.isExistByField = exports.isExistById = void 0;
const AppError_1 = __importDefault(require("./AppError"));
const http_status_codes_1 = require("http-status-codes");
const isExistById = ({ model, id, message, statusCode, select, populate }) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield model.findById(id).select(select || '-__v').populate(populate || '');
    if (!exist) {
        throw new AppError_1.default(statusCode || http_status_codes_1.StatusCodes.NOT_FOUND, message || 'User does not exist');
    }
    return exist;
});
exports.isExistById = isExistById;
const isExistByField = ({ model, field, message, statusCode, select, populate }) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield model.findById(field).select(select || '-__v').populate(populate || '');
    if (!exist) {
        throw new AppError_1.default(statusCode || http_status_codes_1.StatusCodes.NOT_FOUND, message || 'User does not exist');
    }
    return exist;
});
exports.isExistByField = isExistByField;
