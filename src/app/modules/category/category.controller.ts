import { StatusCodes } from 'http-status-codes'
import returnResponse from '../../utils/returnResponse'
import tryCatch from '../../utils/tryCatch'
import * as categoryServices from './category.services'

export const createCategory = tryCatch(async ({user,body}, res) => {

    const newCategory = await categoryServices.createCategory(user,body) //^ passing category data to category service for creating category

    return returnResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: `Category created successfully`,
        data: newCategory
    })
})


export const getAllCategories = tryCatch(async (req, res) => {

    const categories = await categoryServices.getAllCategories() //^getting all categories
    
    return returnResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: `Total ${categories.length} categories are retrieved successfully`,
        data: categories
    })
})