
const priceFilter = (maxPrice: string, minPrice: string) => {
    if (maxPrice && minPrice) {
        return {
            $and: [
                { price: { $lte: maxPrice } },
                { price: { $gte: minPrice } }
            ]
        }
    }
    if (maxPrice) {
        return { price: { $lte: maxPrice } }
    }
    if (minPrice) {
        return { price: { $gte: minPrice } }
    }

    return {}
}

export default priceFilter