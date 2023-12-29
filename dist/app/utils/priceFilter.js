"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const priceFilter = (maxPrice, minPrice) => {
    if (maxPrice && minPrice) {
        return {
            $and: [
                { price: { $lte: maxPrice } },
                { price: { $gte: minPrice } }
            ]
        };
    }
    if (maxPrice) {
        return { price: { $lte: maxPrice } };
    }
    if (minPrice) {
        return { price: { $gte: minPrice } };
    }
    return {};
};
exports.default = priceFilter;
