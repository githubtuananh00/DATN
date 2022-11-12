import axios from 'axios'
import { apiUrl } from '../constants'
import { IProduct, IResponse, IResponseRegister, IUpLoadProduct } from '../type'

/**
 * Get Products Info
 * @param page number page
 * @param category name Category
 * @param sort ASC or DESC
 * @param search search
 * @returns Promise<IPayLoad<IProduct[]> | {
    success: boolean;
    message: unknown;
} | undefined>
 */
export const getProductsInfoAPI = async (
	page: number = 1,
	category: string = '',
	sort: string = '',
	search: string = ''
) => {
	try {
		// Call API to product info
		const response: IResponse<IProduct[]> = await axios.get(
			`${apiUrl}/product?limit=${
				page * 9
			}&${category}&${sort}&title[regex]=${search}`
		)
		// Return data if there is data
		if (response.data.success) {
			return response.data.payload
		}
	} catch (error) {
		// Return data if the data is not found
		return {
			success: false,
			message: error,
		}
	}
}

/**
 * Add Product
 * @param data IUpLoadProduct
 * @returns Promise<{
    success: boolean;
    message: string;
    payload: IPayLoad<IProduct>;
} | {
    success: boolean;
    message: unknown;
} | undefined>
 */
export const addProductAPI = async (data: IUpLoadProduct) => {
	try {
		const response: IResponse<IProduct> = await axios.post(
			`${apiUrl}/product/createProduct`,
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
 * Get Product By Id
 * @param id Id Product
 * @returns Promise<IPayLoad<IProduct> | {
    success: boolean;
    message: unknown;
} | undefined>
 */
export const getProductByIdAPI = async (id: string) => {
	try {
		const response: IResponse<IProduct> = await axios.get(
			`${apiUrl}/product/detail/${id}`
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
export const updateProductAPI = async (id: string, data: IUpLoadProduct) => {
	try {
		const response: IResponse<IProduct> = await axios.put(
			`${apiUrl}/product/${id}/update`,
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
export const deleteProductAPI = async (id: string) => {
	try {
		const response: IResponse<IResponseRegister> = await axios.delete(
			`${apiUrl}/product/${id}/delete`
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
