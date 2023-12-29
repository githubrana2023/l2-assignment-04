"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res, next) => {
    res.status(404).json({
        route: 'Api route not found',
        message: 'You should not send request at this Api Route'
    });
};
exports.default = notFound;
