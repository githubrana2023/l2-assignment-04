"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("./AppError"));
const getWeeks = ({ endDate, startDate }) => {
    const timeDifference = new Date(endDate).getTime() - new Date(startDate).getTime();
    if (timeDifference < 0) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `Possible your start date is greater than end date`);
    }
    if (timeDifference === 0) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `Start date and End date can't be same`);
    }
    const weeks = Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 7));
    return weeks;
};
exports.default = getWeeks;
