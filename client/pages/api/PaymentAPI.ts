import axios from 'axios'
import { apiUrl } from '../../constants'
import { IPayment, IPaymentResponse, IResponse } from '../../type'

export const addPayment = async (data: IPayment) => {
	try {
		const response: IResponse<IPaymentResponse> = await axios.post(
			`${apiUrl}/payment/createPayment`,
			data
		)
		if (response.data.success) return response.data.payment
	} catch (error) {
		console.log(error)
		return {
			success: false,
			message: error,
		}
	}
}
