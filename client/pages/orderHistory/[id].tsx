import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import Layout from '../../component/Layout'
import { useAuth, usePayment } from '../../hooks'
import { IPaymentResponse } from '../../type'

const DetailHistory = () => {
	// context
	const {
		authInfo: { isAuthenticated, authLoading },
	} = useAuth()
	const { history } = usePayment()
	const [orderDetails, setOrderDetails] = useState<IPaymentResponse>()
	const router = useRouter()
	const { id } = router.query

	useEffect(() => {
		if (authLoading) {
			router.push('/dashboard/SpinnerInfo')
		} else if (!isAuthenticated) {
			router.push('/auth/Login')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated])
	useEffect(() => {
		if (id) {
			history.forEach((item) => {
				if ((item._id as string) === id) setOrderDetails(item)
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, history])

	if (!orderDetails) return null
	const { cart } = orderDetails
	// const cartPayment: IProductQty[] = cart
	console.log(cart)

	return (
		<Layout>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email Address</th>
						<th>Postal Code</th>
						<th>Country Code</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{`${orderDetails.address.name!.given_name} ${
							orderDetails.address.name!.surname
						}`}</td>
						<td>{orderDetails.address.email_address!}</td>
						<td>{orderDetails.address.payer_id!}</td>
						<td>{orderDetails.address.address!.country_code}</td>
					</tr>
				</tbody>
			</Table>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Products</th>
						<th>Quantity</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{cart.map((item, index) => (
						<tr key={item.product._id as string}>
							<td>{index + 1}</td>
							<td>
								{
									<img
										src={item.product.image.url}
										alt=''
										style={{ width: '100px' }}
									/>
								}
							</td>
							<td>{item.product.title}</td>
							<td>{item.quantity}</td>
							<td>$ {item.quantity * item.product.price}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Layout>
	)
}

// export interface IProps {
// 	payment: {
// 		success: boolean
// 		message: string
// 		payment: IPaymentResponse
// 	}
// }

// export interface IParams extends ParsedUrlQuery {
// 	id: string
// }

// export const getStaticProps: GetStaticProps<IProps, IParams> = async (
// 	context
// ) => {
// 	// const { id } = context.params
// 	const params: IParams = context.params!
// 	console.log(params.id)

// 	// const product = await getProductById(params.id)
// 	// return {
// 	// 	props: {
// 	// 		product,
// 	// 	},
// 	// 	revalidate: 1, // khi phía db thay đổi dữ liệu thì bên phía font-end cũng dc rerender lại
// 	// 	// props
// 	// }
// }

export default DetailHistory
