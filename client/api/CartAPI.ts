import axios from 'axios'
import { apiUrl } from '../constants'
import { ICart, IProductQty, IResponse } from '../type'

/**
 * Get Carts
 * @returns Promise<IPayLoad<IProductQty[]> | { success: boolean; message: unknown;} | undefined>
 */
export const getCarts = async () => {
	try {
		// Call API to cart
		const response: IResponse<IProductQty[]> = await axios.get(
			`${apiUrl}/cart`
		)

		// Return data (cart) if there is data (cart)
		if (response.data.success) return response.data.payload
	} catch (error) {
		// Return success = false if the cart is not found
		return {
			success: false,
			message: error,
		}
	}
}

export const addCartAPI = async (data: IProductQty[]) => {
	try {
		// Call API to add Cart
		const response: IResponse<IProductQty> = await axios.patch(
			`${apiUrl}/cart/addCart`,
			data
		)
		// Return data if there is data
		if (response.data.success) return response.data.payload
	} catch (error) {
		// Return success = false if the token is not found
		return {
			success: false,
			message: error,
		}
	}
}

/**
 * Update Cart
 * @param data ICart
 * @param cart_id ID Cart
 * @returns Promise<{
    success: boolean;
    message: unknown;
} | undefined>
 */
export const updateCart = async (data: ICart, cart_id: string) => {
	const { product_id, quantity } = data
	// Check size product Id
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
		// Return data if there is data
		if (response.data.success) response.data.payload
	} catch (error) {
		// Return success = false if the token is not found
		return {
			success: false,
			message: error,
		}
	}
}

/**
 * Delete Cart
 * @param cart_id Id Cart
 * @returns  Promise<{
    success: boolean;
    message: unknown;
} | undefined>
 */
export const deleteCart = async (cart_id: string) => {
	try {
		const response: IResponse<ICart> = await axios.delete(
			`${apiUrl}/cart/${cart_id}/delete`
		)
		// Return data if there is data
		if (response.data.success) response.data.payload
	} catch (error) {
		// Return success = false if the token is not found
		return {
			success: false,
			message: error,
		}
	}
}
