import axios from 'axios'
import { apiUrl } from '../../constants'
import { ICart, IProductQty, IResponse } from '../../type'

export const getCarts = async () => {
	try {
		const response: IResponse<IProductQty[]> = await axios.get(
			`${apiUrl}/cart`
		)
		if (response.data.success) return response.data.carts!
	} catch (error) {
		console.log(error)
		return {
			success: false,
			message: error,
		}
	}
}

export const addCartAPI = async (data: IProductQty[]) => {
	// const { product, quantity } = data
	// if (data.length === 0)
	// 	return {
	// 		success: false,
	// 		message: 'please add product or enter quantity greater than 0',
	// 	}
	try {
		const response: IResponse<IProductQty> = await axios.patch(
			`${apiUrl}/cart/addCart`,
			data
		)
		if (response.data.success) return response.data.carts
	} catch (error) {
		console.log(error)
		return {
			success: false,
			message: error,
		}
	}
}

export const updateCart = async (data: ICart, cart_id: string) => {
	const { product_id, quantity } = data
	if (product_id.length * quantity === 0)
		return {
			success: false,
			message: 'please add product or enter quantity greater than 0',
		}
	try {
		const response: IResponse<ICart> = await axios.put(
			`${apiUrl}/cart/${cart_id}/update`,
			data
		)
		if (response.data.success) response.data.carts
	} catch (error) {
		console.log(error)
		return {
			success: false,
			message: error,
		}
	}
}

export const deleteCart = async (cart_id: string) => {
	try {
		const response: IResponse<ICart> = await axios.delete(
			`${apiUrl}/cart/${cart_id}/delete`
		)
		if (response.data.success) response.data.carts
	} catch (error) {
		console.log(error)
		return {
			success: false,
			message: error,
		}
	}
}
