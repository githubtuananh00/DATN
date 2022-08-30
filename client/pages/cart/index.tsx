import React from 'react'
import Layout from '../../component/Layout'
import { useProduct } from '../../hooks'


import Plus from '../products/detail/icon/Plus.svg'
import Stock from '../products/detail/icon/Stock.svg'
import Truck from '../products/detail/icon/Truck.svg'
import Dimensions from '../products/detail/icon/Dimensions.svg'

const Cart = () => {
	const { addCart, cart } = useProduct()
	if (cart.length === 0)
		return <h2 style={{textAlign: 'center', fontSize:'5rem'}}>Cart Empty</h2>
	return (
		<Layout>
			{cart.map((product) => (
				<section
					className='product-selected w-100 d-flex'
					key={product.product._id as string}
				>
					<div className='product-preview'>
						<div className='product-presentation d-flex'>
							<div className='product-display d-flex align-items-center position-relative'>
								<div className='product-height d-flex align-items-center'></div>
								<img
									src={product?.product.image.url}
									className='product-photo'
									alt=''
								/>

								<a
									href='#'
									className='features-btn rounded-circle d-flex align-items-center justify-content-center position-absolute'
								>
									<img src={Plus.src} alt='' />

									<span className='ripple rounded-circle border-white'></span>
									<span className='ripple rounded-circle border-white'></span>
								</a>
							</div>
						</div>
					</div>
					{/* <!-- Info sp --> */}
					<div className='product-description'>
						<div className='product-summary-container'>
							<h5 className='product-model'>
								{product?.product.category}
							</h5>
							<h1 className='product-type'>
								{product?.product.title}
							</h1>
							<p className='product-text-description'>
								{product?.product.description}.
								<a href='#'> View More</a>
							</p>
						</div>
						<div className='product-options d-flex align-items-center'>
							<a
								href='#'
								className='option-btn d-flex align-items-center border-light'
							>
								{/* <!-- Xe tải --> */}
								<img src={Truck.src} alt='' />
								Shipping
							</a>
							<a
								href='#'
								className='option-btn d-flex align-items-center border-light'
							>
								{/* <!-- Stock --> */}
								<img src={Stock.src} alt='' />
								Stock
							</a>
							<a
								href='#'
								className='option-btn d-flex align-items-center border-light'
							>
								{/* <!-- Kich thuoc --> */}
								<img src={Dimensions.src} alt='' />
								Dimensions
							</a>
						</div>

						<div className='product-price d-flex align-items-center'>
							<h1 className='price'>${product?.product.price}</h1>
							<button className='add-cart-btn rounded-pill d-flex align-items-center justify-content-between'>
								BUY NOW
								<span className='features-btn rounded-circle d-flex align-items-center justify-content-center'>
									<svg
										className='rounded-circle'
										xmlns='http://www.w3.org/2000/svg'
										height='16'
										viewBox='0 0 24 24'
										width='16'
									>
										<path d='M0 0h24v24H0z' fill='none' />
										<path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' />
									</svg>
								</span>
							</button>
						</div>
					</div>
				</section>
			))}
		</Layout>
	)
}

export default Cart
