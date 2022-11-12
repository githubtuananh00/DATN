import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Layout from '../../component/Layout'
import { useAuth, usePayment } from '../../hooks'
import { IPaymentResponse } from '../../type'
import Table from 'react-bootstrap/Table'
import Link from 'next/link'
import { getHistoryAPI, getPaymentsAPI } from '../../api/PaymentAPI'

/**
 * Page Oder History
 * @returns JSX.Element | null
 */
const OrderHistory = () => {
	const router = useRouter()
	// context
	const {
		authInfo: { isAuthenticated, authLoading, isAdmin },
	} = useAuth()

	const { history, updateSetHistory } = usePayment()

	useEffect(() => {
		if (authLoading) {
			router.push('/SpinnerInfo')
		} else if (!isAuthenticated) {
			router.push('/auth/Login')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated])
	useEffect(() => {
		const getHistory = async () => {
			if (isAdmin) {
				const payments: IPaymentResponse[] =
					(await getPaymentsAPI()) as unknown as IPaymentResponse[]

				updateSetHistory(payments)
			} else {
				const history: IPaymentResponse[] =
					(await getHistoryAPI()) as unknown as IPaymentResponse[]
				updateSetHistory(history)
			}
		}
		getHistory()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, isAdmin])

	if (!history) return null
	else {
		return (
			<Layout>
				<div style={{ textAlign: 'center' }}>
					<h2>History</h2>
					<br></br>
					<h4>You have {history.length} ordered</h4>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>PaymentID</th>
								<th>Date of Purchase</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{history.map((item, index) => (
								<tr key={item.user_id}>
									<td>{index + 1} </td>
									<td>{item.paymentID}</td>
									<td>
										{new Date(
											item.createdAt
										).toDateString()}
									</td>
									<td>
										<Link
											href={`/orderHistory/${
												item._id as string
											}`}
										>
											View
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</Layout>
		)
	}
}

export default OrderHistory
