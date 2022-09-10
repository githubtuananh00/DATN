import { createContext, useState } from 'react'
import { ContextStateProps } from '../../constants'
import { IPaymentResponse } from '../../type'

export interface IPaymentStateDefault {
	history: IPaymentResponse[]
	updateSetHistory: (data: IPaymentResponse[]) => void
}

const PaymentDefaults: IPaymentStateDefault = {
	history: [],
	updateSetHistory: () => {},
}
export const PaymentContext =
	createContext<IPaymentStateDefault>(PaymentDefaults)
const PaymentContextProvider = ({ children }: ContextStateProps) => {
	const [history, setHistory] = useState<IPaymentResponse[]>([])
	const updateSetHistory = (data: IPaymentResponse[]) => setHistory(data)

	const context: IPaymentStateDefault = {
		history,
		updateSetHistory,
	}
	return (
		<PaymentContext.Provider value={context}>
			{children}
		</PaymentContext.Provider>
	)
}
export default PaymentContextProvider
