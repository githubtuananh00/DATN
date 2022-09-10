// import { OnApproveData } from '@paypal/paypal-js'
import { PayPalButtons } from '@paypal/react-paypal-js'
import {
	CreateOrderData,
	CreateOrderActions,
} from '@paypal/paypal-js/types/components/buttons'
import { OrderResponseBody } from '@paypal/paypal-js/types/apis/orders'
import { useCallback, useState } from 'react'
import { IPayment, IProductQty } from '../../type'
import { addPayment } from '../api/PaymentAPI'
import { useCart } from '../../hooks'
import { addCartAPI } from '../api/CartAPI'

// import { productItemProps } from '../products/ProductItem'
interface IPayPal {
	total: string
	carts: IProductQty[]
}
const PayPal = ({ total, carts }: IPayPal) => {
	const { updateSetCart } = useCart()
	const [paidFor, setPaidFor] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const handleApprove = async (data: OrderResponseBody) => {
		// Call backend function to fulfill order
		// console.log(data.paymentID)
		console.log(data)
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

		// if the response is error
		// alert("You payment was process successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.")
	}

	if (paidFor) {
		// Display success message, modal or redirect user to success page
		alert('Thank you for your purchase!')
	}

	if (error) {
		// Display success message, modal or redirect user to success page
		alert(error)
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
			// onApprove={(data, actions) => {
			// 	return actions.order!.capture().then((details) => {
			// 		const name = details.payer.name!.given_name
			// 		console.log(data)

			// 		alert(`Transaction completed by ${name}`)
			// 	})
			// }}
			onApprove={async (data, actions) => {
				const order = await actions.order!.capture()
				// console.log(order)

				// console.log(order.purchase_units[0].payments!.captures![0])
				// console.log(data.orderID)

				handleApprove(order)
			}}
			// // onChange={() => {
			// //   // Display cancel message, modal or redirect user to cancel page or back to cart
			// // }}
			onError={(err) => {
				setError(err as unknown as string)
				console.log('PayPal Checkout Error', err)
			}}
		/>
	)
}

export default PayPal