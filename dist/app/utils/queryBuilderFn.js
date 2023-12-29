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
exports.fields = exports.pagination = exports.sort = exports.filterByPrice = exports.filter = exports.search = void 0;
const course_constant_1 = require("../modules/course/course.constant");
const priceFilter_1 = __importDefault(require("./priceFilter"));
const search = (modelQuery, query) => {
    const regexQuery = (query === null || query === void 0 ? void 0 : query.query) || '';
    const searchAbleFields = ['startDate', 'endDate', 'tags.name', 'details.level', 'provider', 'language'].map(field => ({
        [field]: { $regex: regexQuery, $options: 'i' }
    }));
    const searchQuery = modelQuery.find({
        $or: searchAbleFields
    });
    return searchQuery;
};
exports.search = search;
const filter = (modelQuery, query) => {
    const filterQuery = Object.assign({}, query);
    Object.entries(filterQuery).length && Object.entries(filterQuery).forEach(([key, value]) => {
        if (key === 'level') {
            filterQuery[`details.${key}`] = value;
        }
        if (key === 'tags') {
            filterQuery[`${key}.name`] = value;
        }
        filterQuery[key] = value;
    });
    course_constant_1.excludedFields.forEach(field => delete filterQuery[field]);
    const filterQueryData = modelQuery.where(filterQuery);
    return filterQueryData;
};
exports.filter = filter;
const filterByPrice = (modelQuery, query) => {
    const price = (0, priceFilter_1.default)(query.maxPrice, query.minPrice);
    const filterPriceQuery = modelQuery.find(price);
    return filterPriceQuery;
};
exports.filterByPrice = filterByPrice;
const sort = (modelQuery, query) => {
    if ((query === null || query === void 0 ? void 0 : query.sortBy) === 'duration') {
        query.sortBy = 'durationInWeeks';
    }
    const sort = query.sortOrder === 'desc' && query.sortBy ? `-${query.sortBy}` : query.sortBy;
    const sortQuery = modelQuery.sort(sort);
    return sortQuery;
};
exports.sort = sort;
const pagination = (modelQuery, query) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit || 0;
    const paginationQuery = modelQuery.skip(skip).limit(limit);
    return paginationQuery;
};
exports.pagination = pagination;
const fields = (modelQuery, query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryFields = query.fields ? query.fields.split(',').join(' ') : '-__v';
    const fieldsQuery = yield modelQuery.select(queryFields);
    return fieldsQuery;
});
exports.fields = fields;
