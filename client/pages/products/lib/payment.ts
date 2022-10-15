import { IPaymentResponse } from '../../../type'
import { getPaymentsAPI } from '../../api/PaymentAPI'

export const getPaymentByIds = async (limit: number) => {
	const payments: IPaymentResponse[] =
		(await getPaymentsAPI()) as IPaymentResponse[]
	limit = payments.length < limit ? payments.length : limit
	return payments.slice(0, limit).map((payment: IPaymentResponse) => ({
		params: {
			id: `${payment._id}`,
		},
	}))
}
