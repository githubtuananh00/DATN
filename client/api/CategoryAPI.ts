import axios from 'axios'
import { apiUrl } from '../constants'
import { ICategory, IReqCategory, IResponse } from '../type'

/**
 * Get Categories
 * @returns Promise<IPayLoad<ICategory[]> | {success: boolean;message: unknown;} | undefined>
 */
export const getCategoriesAPI = async () => {
	try {
		// Call API to category
		const response: IResponse<ICategory[]> = await axios.get(
			`${apiUrl}/category`
		)

		// Return data if there is data
		if (response.data.success) return response.data.payload
	} catch (error) {
		// Return data if the data is not found
		return {
			success: false,
			message: error,
		}
	}
}

/**
 * Get Category By Id
 * @param categoryId category Id
 * @returns Promise<IPayLoad<IReqCategory> | {
    success: boolean;
    message: unknown;
} | undefined>
 */
export const getCategoryByIdAPI = async (categoryId: string) => {
	try {
		// Call API to category
		const response: IResponse<IReqCategory> = await axios.get(
			`${apiUrl}/category/${categoryId}`
		)
		// Return data if there is data
		if (response.data.success) return response.data.payload
	} catch (error) {
		// Return data if the data is not found
		return {
			success: false,
			message: error,
		}
	}
}

/**
 * Add Category
 * @param data Name Category
 * @returns Promise<{
    success: boolean;
    message: string;
    payload: IPayLoad<IReqCategory>;
} | {
    success: boolean;
    message: unknown;
} | undefined>
 */
export const addCategoryAPI = async (data: IReqCategory) => {
	try {
		const response: IResponse<IReqCategory> = await axios.post(
			`${apiUrl}/category/createCategory`,
			data
		)
		if (response.data.success) return response.data
	} catch (error) {
		return {
			success: false,
			message: error,
		}
	}
}

/**
 * Edit Category
 * @param categoryId Category Id
 * @param data Name Category
 * @returns Promise<{
    success: boolean;
    message: string;
    payload: IPayLoad<IReqCategory>;
} | {
    success: boolean;
    message: unknown;
} | undefined>
 */
export const editCategoryAPI = async (
	categoryId: string,
	data: IReqCategory
) => {
	try {
		// Call API to update Category
		const response: IResponse<IReqCategory> = await axios.put(
			`${apiUrl}/category/${categoryId}/update`,
			data
		)
		// Return data if there is data
		if (response.data.success) return response.data
	} catch (error) {
		// Return data if the data is not found
		return {
			success: false,
			message: error,
		}
	}
}

/**
 * Deleted Category
 * @param categoryId Category Id
 * @returns Promise<{
    success: boolean;
    message: string;
    payload: IPayLoad<IReqCategory>;
} | {
    success: boolean;
    message: unknown;
} | undefined>
 */
export const deletedCategoryAPI = async (categoryId: string) => {
	try {
		// Call API to delete Category
		const response: IResponse<IReqCategory> = await axios.delete(
			`${apiUrl}/category/${categoryId}/delete`
		)
		// Return data if there is data
		if (response.data.success) return response.data
	} catch (error) {
		// Return data if the data is not found
		return {
			success: false,
			message: error,
		}
	}
}
