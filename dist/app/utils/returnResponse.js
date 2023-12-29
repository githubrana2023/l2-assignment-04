"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const returnResponse = (res, data) => {
    if (data === null || data === void 0 ? void 0 : data.meta) {
        return res.status(data.statusCode).json({
            success: data.success,
            statusCode: data.statusCode,
            message: data.message,
            meta: data.meta,
            data: data.data,
        });
    }
    return res.status(data.statusCode).json({
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        data: data.data,
    });
};
exports.default = returnResponse;
