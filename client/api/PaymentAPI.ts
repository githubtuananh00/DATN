import axios from 'axios'
import { apiUrl } from '../constants'
import { IPayment, IPaymentResponse, IResponse } from '../type'

/**
 * Add Payment
 * @param data IPayment
 * @returns Promise<IPayLoad<IPaymentResponse> | {
    success: boolean;
    message: unknown;
} | undefined>
 */
export const addPayment = async (data: IPayment) => {
	try {
		// Call API to payment
		const response: IResponse<IPaymentResponse> = await axios.post(
			`${apiUrl}/payment/createPayment`,
			data
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
 * Get History
 * @returns Promise<IPayLoad<IPaymentResponse[]> | {
    success: boolean;
    message: unknown;
} | undefined>
 */
export const getHistoryAPI = async () => {
	try {
		const response: IResponse<IPaymentResponse[]> = await axios.get(
			`${apiUrl}/payment/history`
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
 * Get Payments
 * @returns Promise<IPayLoad<IPaymentResponse[]> | {
    success: boolean;
    message: unknown;
} | undefined>
 */
export const getPaymentsAPI = async () => {
	try {
		const response: IResponse<IPaymentResponse[]> = await axios.get(
			`${apiUrl}/payment`
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
