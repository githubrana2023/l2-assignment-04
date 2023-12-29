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
exports.createReview = void 0;
const isExist_1 = require("./../../utils/isExist");
const review_model_1 = __importDefault(require("./review.model"));
const auth_model_1 = __importDefault(require("../auth/auth.model"));
const createReview = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield (0, isExist_1.isExistById)({
        model: auth_model_1.default,
        id: user._id,
        select: '-password -previousPassword'
    });
    const review = yield review_model_1.default.create(Object.assign(Object.assign({}, payload), { createdBy: existingUser._id }));
    const newReview = yield review.populate('createdBy');
    return newReview;
});
exports.createReview = createReview;
