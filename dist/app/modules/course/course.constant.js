"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAbleFields = exports.excludedFields = void 0;
exports.excludedFields = ['page', 'limit', 'sortBy', 'sortOrder', 'query', 'fields', 'maxPrice', 'minPrice', 'level', 'tags'];
exports.searchAbleFields = ['startDate', 'endDate', 'tags.name', 'details.level', 'provider', 'language', 'price'];
// 'maxPrice', 'minPrice', 'level', 'tags'
