import { FilterQuery } from 'mongoose';
import { TDocumentQuery } from './../types/index';
import { Query } from "mongoose";
import { excludedFields } from '../modules/course/course.constant';
import { TCourse } from '../modules/course/course.interface';
import priceFilter from './priceFilter'


export const search = <T>(modelQuery: Query<T[], TDocumentQuery<T>>, query: { [key: string]: unknown }) => {
    const regexQuery = query?.query || ''

    const searchAbleFields = ['startDate', 'endDate', 'tags.name', 'details.level', 'provider', 'language'].map(field => (
        {
            [field]: { $regex: regexQuery, $options: 'i' }
        }
    ))

    const searchQuery = modelQuery.find({
        $or: searchAbleFields as FilterQuery<TDocumentQuery<T>>[]
    })

    return searchQuery
}

export const filter = <T>(modelQuery: Query<T[], TDocumentQuery<T>>, query: { [key: string]: unknown }) => {
    const filterQuery = { ...query }

    Object.entries(filterQuery).length && Object.entries(filterQuery).forEach(([key, value]) => {
        if (key === 'level') {
            filterQuery[`details.${key}`] = value
        }
        if (key === 'tags') {
            filterQuery[`${key}.name`] = value
        }
        filterQuery[key] = value
    })

    excludedFields.forEach(field => delete filterQuery[field])

    const filterQueryData = modelQuery.where(filterQuery)

    return filterQueryData
}

export const filterByPrice = <T>(modelQuery: Query<T[], TDocumentQuery<T>>, query: { [key: string]: unknown }) => {
    const price = priceFilter((query.maxPrice as string), (query.minPrice as string))

    const filterPriceQuery = modelQuery.find((price as FilterQuery<TCourse>))

    return filterPriceQuery
}

export const sort = <T>(modelQuery: Query<T[], TDocumentQuery<T>>, query: { [key: string]: unknown }) => {

    if (query?.sortBy === 'duration') {
        query.sortBy = 'durationInWeeks'
    }

    const sort = query.sortOrder === 'desc' && query.sortBy ? `-${query.sortBy}` : query.sortBy as string

    const sortQuery = modelQuery.sort(sort)
    return sortQuery
}

export const pagination = <T>(modelQuery: Query<T[], TDocumentQuery<T>>, query: { [key: string]: unknown }) => {
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 10
    const skip = (page - 1) * limit || 0

    const paginationQuery = modelQuery.skip(skip).limit(limit)

    return paginationQuery
}

export const fields = async<T>(modelQuery: Query<T[], TDocumentQuery<T>>, query: { [key: string]: unknown }) => {

    const queryFields = query.fields ? (query.fields as string).split(',').join(' ') : '-__v'

    const fieldsQuery = await modelQuery.select(queryFields)

    return fieldsQuery
}


