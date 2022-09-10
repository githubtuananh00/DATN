import axios from 'axios'
import { apiUrl } from '../../constants'
import { IPayment, IPaymentResponse, IResponse } from '../../type'

export const addPayment = async (data: IPayment) => {
	try {
		const response: IResponse<IPaymentResponse> = await axios.post(
			`${apiUrl}/payment/createPayment`,
			data
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

export const getHistoryAPI = async () => {
	try {
		const response: IResponse<IPaymentResponse[]> = await axios.get(
			`${apiUrl}/payment/history`
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

export const getPaymentsAPI = async () => {
	try {
		const response: IResponse<IPaymentResponse[]> = await axios.get(
			`${apiUrl}/payment`
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
