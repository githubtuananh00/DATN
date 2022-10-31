import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import { useAuth, useCart } from '../../hooks'
import { addCartAPI } from '../../api/CartAPI'
import PayPal from './PayPal'

const Cart = () => {
	const { cart, updateSetCart } = useCart()
	const router = useRouter()
	const {
		authInfo: { isAuthenticated, authLoading },
	} = useAuth()
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		if (authLoading) {
			router.push('/SpinnerInfo')
		} else if (!isAuthenticated) {
			router.push('/auth/Login')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated])

	const [total, setTotal] = useState<number>(0)
	useEffect(() => {
		const getTotal = () => {
			const total: number = cart.reduce(
				(total: number, cur) =>
					total + cur.product.price * cur.quantity,
				0
			)
			setTotal(total)
		}
		getTotal()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cart])
	const increment = async (id: string) => {
		cart.forEach((item) => {
			if ((item.product._id as string) === id) item.quantity += 1
		})
		updateSetCart([...cart])
		await addCartAPI([...cart])
	}
	const decrement = async (id: string) => {
		cart.forEach((item) => {
			if ((item.product._id as string) === id)
				item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1)
		})
		updateSetCart([...cart])
		await addCartAPI([...cart])
	}
	const removeProductCart = async (id: string) => {
		if (window.confirm('Do you want to delete this product?')) {
			cart.forEach((item, index) => {
				if ((item.product._id as string) === id) cart.splice(index, 1)
			})
			updateSetCart([...cart])
			await addCartAPI([...cart])
		}
	}

	const shipping: number = 5
	const totalPayment: number = total + shipping

	if (cart.length === 0)
		return (
			<Layout>
				<h2 style={{ textAlign: 'center', fontSize: '5rem' }}>
					Cart Empty
				</h2>
			</Layout>
		)

	return (
		<Layout>
			<div className='pageCart'>
				{/* <h1>Cart</h1> */}
				<div className='heading'>
					<h1>
						<span className='shopper'>H</span> Shopping Cart
					</h1>
				</div>
				<div className='cart transition is-open'>
					{/* <a href='#' className='btn btn-update'>
							Update cart
						</a> */}

					<div className='table'>
						<div className='layout-inline row th'>
							<div className='col col-pro'>Product</div>
							<div className='col col-price align-center'>
								Price
							</div>
							<div className='col col-qty align-center'>QTY</div>
							<div className='col'>Total</div>
							<div className='col-close'></div>
						</div>
						{cart.map((products) => (
							<div key={products.product._id as string}>
								<div className='layout-inline row'>
									<div className='col col-pro layout-inline'>
										<img
											src={products.product.image.url}
											alt='kitten'
										/>
										<p>{products.product.title}</p>
									</div>

									<div className='col col-price col-numeric align-center'>
										<p>$ {products.product.price}</p>
									</div>

									<div className='col col-qty layout-inline'>
										<button
											className='qty qty-minus'
											onClick={() =>
												decrement(
													products.product
														._id as string
												)
											}
										>
											-
										</button>
										<input
											type='numeric'
											value={products.quantity}
											// onChange={(event) =>
											// 	onChangQty(event, index)
											// }
											name='qty'
										/>
										<button
											className='qty qty-plus'
											onClick={() =>
												increment(
													products.product
														._id as string
												)
											}
										>
											+
										</button>
									</div>

									<div className='col col-total col-numeric'>
										<p>
											${' '}
											{products.product.price *
												products.quantity}
										</p>
									</div>
									<div
										className='col-close'
										onClick={() =>
											removeProductCart(
												products.product._id as string
											)
										}
									>
										X
									</div>
								</div>
							</div>
						))}
						<div className='tf'>
							<div className='row layout-inline'>
								<div className='col'>
									<p>Merchandise Subtotal: $ {total}</p>
								</div>
							</div>
							<div className='row layout-inline'>
								<div className='col'>
									<p>Shipping Total: $ {shipping}</p>
								</div>
							</div>
							<div className='row layout-inline'>
								<div className='col'>
									<p>Total Payment: $ {totalPayment}</p>
								</div>
							</div>
							<div className='row layout-inline'>
								<div className='col-paypal'>
									{totalPayment !== shipping && (
										<PayPal
											total={`${totalPayment}`}
											carts={cart}
										/>
									)}
								</div>
							</div>
						</div>
					</div>

					{/* <a href='#' className='btn btn-update'>
						Buy Now
					</a> */}
				</div>
			</div>
		</Layout>
	)
}

export default Cart
