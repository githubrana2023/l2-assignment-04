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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tryCatch_1 = __importDefault(require("../utils/tryCatch"));
const config_1 = __importDefault(require("../config"));
const auth_model_1 = __importDefault(require("../modules/auth/auth.model"));
const authorized = (...roles) => {
    return (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (!token) {
            return res.send({
                success: false,
                message: "Unauthorized Access",
                errorMessage: "You do not have the necessary permissions to access this resource.",
                errorDetails: null,
                stack: null
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        const existingUser = yield auth_model_1.default.findById(decoded._id);
        if (!existingUser) {
            return res.send({
                success: false,
                message: "Unauthorized Access",
                errorMessage: "You do not have the necessary permissions to access this resource.",
                errorDetails: null,
                stack: null
            });
            // throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized Access')
        }
        if (roles.length && !roles.includes(decoded.role)) {
            // throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized Access')
            return res.send({
                success: false,
                message: "Unauthorized Access",
                errorMessage: "You do not have the necessary permissions to access this resource.",
                errorDetails: null,
                stack: null
            });
        }
        req.user = decoded;
        next();
    }));
};
exports.default = authorized;
