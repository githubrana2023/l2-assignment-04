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
exports.changePassword = exports.loginUser = exports.createUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../../config"));
const createToken_1 = __importDefault(require("../../utils/createToken"));
const auth_model_1 = __importDefault(require("./auth.model"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username, role } = payload;
    const storedPreviousPassword = [];
    const existingUserByUsername = yield auth_model_1.default.findOne({
        username
    });
    if (existingUserByUsername) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `User already exists with this username ${username}`);
    }
    const existingUserByEmail = yield auth_model_1.default.findOne({
        email
    });
    if (existingUserByEmail) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `User already exists with this email ${email}`);
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, config_1.default.bcrypt_salt_round);
    storedPreviousPassword.unshift({ previousPassword: hashedPassword, timestamp: new Date() });
    const user = Object.assign(Object.assign({}, payload), { role: role || 'user', password: hashedPassword, previousPassword: storedPreviousPassword });
    const newUser = yield auth_model_1.default.create(user);
    return newUser;
});
exports.createUser = createUser;
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = payload;
    const existingUser = yield auth_model_1.default.findOne({
        username
    }).select('+password');
    if (!existingUser) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    const isCorrectPassword = yield bcryptjs_1.default.compare(password, existingUser.password);
    if (!isCorrectPassword) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid credentials');
    }
    const token = yield (0, createToken_1.default)({
        _id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
    }, config_1.default.jwt_secret, { expiresIn: '90d' });
    return {
        user: {
            _id: existingUser._id,
            email: existingUser.email,
            username: existingUser.username,
            role: existingUser.role
        },
        token
    };
});
exports.loginUser = loginUser;
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield auth_model_1.default.isExistById(user._id);
    const isCorrectPassword = yield bcryptjs_1.default.compare(payload.currentPassword, existingUser.password);
    if (!isCorrectPassword) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid credentials');
    }
    const previousThreePasswords = existingUser.previousPassword.sort((a, b) => {
        const x = new Date(a.timestamp).getTime();
        const y = new Date(b.timestamp).getTime();
        return y - x;
    }).slice(0, 2);
    const isUnique = previousThreePasswords.every((value) => {
        return !bcryptjs_1.default.compareSync(payload.newPassword, value.previousPassword) && !bcryptjs_1.default.compareSync(payload.newPassword, existingUser.password);
    });
    if (!isUnique) {
        return {
            isSuccessfullyChanged: false,
            message: `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${previousThreePasswords[0].timestamp}).`,
            data: null
        };
    }
    const newHashedPassword = yield bcryptjs_1.default.hash(payload.newPassword, config_1.default.bcrypt_salt_round);
    const previousChangedPassword = [...previousThreePasswords];
    previousChangedPassword.push({ previousPassword: newHashedPassword, timestamp: new Date() });
    const updatedPassword = yield auth_model_1.default.findByIdAndUpdate(existingUser._id, {
        $set: {
            password: newHashedPassword,
            previousPassword: previousChangedPassword
        }
    }, {
        new: true
    });
    if (!updatedPassword) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to update password');
    }
    const updatedUser = yield auth_model_1.default.findById(user._id).select('-password -previousPassword');
    return {
        isSuccessfullyChanged: true,
        message: 'Password changed successfully',
        data: updatedUser
    };
});
exports.changePassword = changePassword;
