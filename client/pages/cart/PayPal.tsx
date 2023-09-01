// import { OnApproveData } from '@paypal/paypal-js'
import { OrderResponseBody } from '@paypal/paypal-js/types/apis/orders'
import {
	CreateOrderActions,
	CreateOrderData,
} from '@paypal/paypal-js/types/components/buttons'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useCallback, useState } from 'react'
import { addCartAPI } from '../../api/CartAPI'
import { addPayment } from '../../api/PaymentAPI'
import { useCart } from '../../hooks'
import { IPayment, IProductQty } from '../../type'
import AlertMessage, { AlertInfo } from '../layout/AlertMessage'

interface IPayPal {
	total: string
	carts: IProductQty[]
}
/**
 * Page Paypal
 * @param { total, carts }: IPayPal
 * @returns JSX.Element
 */
const PayPal = ({ total, carts }: IPayPal) => {
	const { updateSetCart } = useCart()
	const [paidFor, setPaidFor] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const [alert, setAlert] = useState<AlertInfo>({ type: null, message: '' })
	const handleApprove = async (data: OrderResponseBody) => {
		// Call backend function to fulfill order
		const dataReq: IPayment = {
			paymentID: data.id,
			address: data.payer,
			cart: carts,
			status: false,
		}
		await addPayment(dataReq)
		updateSetCart([])
		await addCartAPI([])
		// if response is success
		setPaidFor(true)
		// Refresh user's account or subscription status
	}

	if (paidFor) {
		// Display success message, modal or redirect user to success page
		setAlert({
			type: 'success',
			message: 'Thank you for your purchase!',
		})
		setTimeout(() => {
			setAlert({ type: null, message: '' })
		}, 2000)
	}

	if (error) {
		// Display success message, modal or redirect user to success page
		setAlert({
			type: 'danger',
			message: error,
		})
		setTimeout(() => {
			setAlert({ type: null, message: '' })
		}, 2000)
	}
	const createOrder1 = (
		data: CreateOrderData,
		actions: CreateOrderActions
	) => {
		return actions.order.create({
			purchase_units: [
				{
					// description: product.description,
					amount: {
						value: total,
					},
				},
			],
		})
	}

	return (
		<>
			<AlertMessage type={alert.type} message={alert.message} />
			<PayPalButtons
				style={{
					layout: 'horizontal',
					color: 'gold',
					shape: 'pill',
					label: 'pay',
				}}
				onClick={(data, actions) => {
					// Validate on button click, client or server side
					const hasAlreadyBoughtCourse: boolean = false
					if (hasAlreadyBoughtCourse) {
						setError(
							'You already bought this course. Go to your account to view your list of courses.'
						)
						return actions.reject()
					} else {
						return actions.resolve()
					}
				}}
				createOrder={useCallback(
					(data: CreateOrderData, actions: CreateOrderActions) =>
						createOrder1(data, actions),
					// eslint-disable-next-line react-hooks/exhaustive-deps
					[total]
				)}
				onApprove={async (data, actions) => {
					const order = await actions.order!.capture()
					handleApprove(order)
				}}
				onError={(err) => {
					setError(err as unknown as string)
					console.log('PayPal Checkout Error', err)
				}}
			/>
		</>
	)
}

export default PayPal
