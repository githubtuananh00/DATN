import axios from 'axios'
import { apiUrl } from '../../constants'
import { ICategory, IReqCategory, IResponse } from '../../type'

export const getCategoriesAPI = async () => {
	try {
		const response: IResponse<ICategory[]> = await axios.get(
			`${apiUrl}/category`
		)
		if (response.data.success) return response.data.payload
	} catch (error) {
		console.log(error)
		return {
			success: false,
			message: error,
		}
	}
}

export const getCategoryByIdAPI = async (categoryId: string) => {
	try {
		const response: IResponse<IReqCategory> = await axios.get(
			`${apiUrl}/category/${categoryId}`
		)
		if (response.data.success) return response.data.payload
	} catch (error) {
		console.log(error)
		return {
			success: false,
			message: error,
		}
	}
}

export const addCategoryAPI = async (data: IReqCategory) => {
	try {
		const response: IResponse<IReqCategory> = await axios.post(
			`${apiUrl}/category/createCategory`,
			data
		)
		if (response.data.success) return response.data
	} catch (error) {
		console.log(error)
		return {
			success: false,
			message: error,
		}
	}
}

export const editCategoryAPI = async (
	categoryId: string,
	data: IReqCategory
) => {
	try {
		const response: IResponse<IReqCategory> = await axios.put(
			`${apiUrl}/category/${categoryId}/update`,
			data
		)
		if (response.data.success) return response.data
	} catch (error) {
		console.log(error)
		return {
			success: false,
			message: error,
		}
	}
}

export const deletedCategoryAPI = async (categoryId: string) => {
	try {
		const response: IResponse<IReqCategory> = await axios.delete(
			`${apiUrl}/category/${categoryId}/delete`
		)
		if (response.data.success) return response.data
	} catch (error) {
		console.log(error)
		return {
			success: false,
			message: error,
		}
	}
}
