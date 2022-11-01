import axios from 'axios'
import { apiUrl } from '../constants'
import { IProduct, IResponse, IResponseRegister, IUpLoadProduct } from '../type'

export interface IProductApi {
	products: [products: IProduct[], setProducts: (product: IProduct[]) => void]
	getProducts: () => Promise<IProduct | undefined>
}

export const getProductsInfoAPI = async (
	page: number = 1,
	category: string = '',
	sort: string = '',
	search: string = ''
) => {
	try {
		const response: IResponse<IProduct[]> = await axios.get(
			`${apiUrl}/product?limit=${
				page * 9
			}&${category}&${sort}&title[regex]=${search}`
		)
		if (response.data.success) {
			return response.data.payload
		}
	} catch (error) {
		return {
			success: false,
			message: error,
		}
	}
}

export const addProductAPI = async (data: IUpLoadProduct) => {
	try {
		const response: IResponse<IProduct> = await axios.post(
			`${apiUrl}/product/createProduct`,
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

export const getProductByIdAPI = async (id: string) => {
	try {
		const response: IResponse<IProduct> = await axios.get(
			`${apiUrl}/product/detail/${id}`
		)

		if (response.data.success) return response.data.payload
	} catch (error) {
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
		if (response.data.success) return response.data
	} catch (error) {
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
		if (response.data.success) return response.data
	} catch (error) {
		return {
			success: false,
			message: error,
		}
	}
}
