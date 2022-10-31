import { ParsedUrlQuery } from 'querystring'

import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { IProduct, IProductQty } from '../../../type'
import { getProductById, getProductIds } from '../lib/product'

import Plus from './icon/Plus.svg'
import Stock from './icon/Stock.svg'
import Truck from './icon/Truck.svg'
import Dimensions from './icon/Dimensions.svg'

import Clock from './icon/Clock.svg'
import Gird from './icon/Gird.svg'
import Gift from './icon/Gift.svg'
import Shield from './icon/Shield.svg'
import Left from './icon/Left.svg'
import Right from './icon/Right.svg'

import Layout from '../../../component/Layout'
import { useAuth, useCart, useProduct } from '../../../hooks'
import { useState } from 'react'
import ProductCategory from './ProductCategory'
import { Col, Row } from 'react-bootstrap'
import { ProductStateDefault } from '../../../context/ProductContext'
import AlertMessage, { AlertInfo } from '../../layout/AlertMessage'
import { useRouter } from 'next/router'

export interface IParams extends ParsedUrlQuery {
	id: string
}

interface IProps {
	product: IProduct
}
const DetailProduct = ({
	product,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const router = useRouter()
	const { productsHandle }: ProductStateDefault = useProduct()
	const {
		authInfo: { isAuthenticated },
	} = useAuth()
	const { addCart, cart } = useCart()

	const [alert, setAlert] = useState<AlertInfo>({ type: null, message: '' })

	console.log(productsHandle)
	const handleBuy = () => {
		if (isAuthenticated) {
			const productQty: IProductQty = {
				product: product!,
				quantity: 1,
			}
			cart.filter(
				(productInfo) =>
					(productInfo.product._id as string) ===
					(product!._id as string)
			).map(() => {
				setAlert({
					type: 'danger',
					message: 'This product has been added to Cart',
				})
				setTimeout(() => {
					setAlert({ type: null, message: '' })
				}, 3000)
			})
			// console.log(productCart)

			return addCart(productQty)
		} else {
			router.push('/auth/Login')
			return
		}
	}

	return (
		<Layout>
			<AlertMessage type={alert.type} message={alert.message} />
			<section className='product-selected w-100 d-flex'>
				<div className='product-preview'>
					<div className='product-presentation d-flex'>
						<div className='product-display d-flex align-items-center position-relative'>
							<div className='product-height d-flex align-items-center'></div>
							<img
								src={product.image.url}
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
				<div className='w-100'>
					<div className='product-summary-container'>
						<h1 className='product-type'>{product.title}</h1>
						<p className='product-text-description'>
							{product.description}.<a href='#'> View More</a>
						</p>
					</div>
					<div>Sold: {product.sold}</div>
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
						<h1 className='price'>$ {product!.price}</h1>
						<button
							className='add-cart-btn rounded-pill d-flex align-items-center justify-content-between'
							onClick={handleBuy}
						>
							Add to cart
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

				<div className='vertical-container d-flex justify-content-between position-relative'>
					<div className='feature-icons'>
						<img
							src={Gift.src}
							style={{ marginBottom: '5px' }}
							alt=''
						/>
						<br></br>
						<img
							src={Clock.src}
							style={{ marginBottom: '5px' }}
							alt=''
						/>
						<br></br>
						<img
							src={Shield.src}
							style={{ marginBottom: '5px' }}
							alt=''
						/>
						<br></br>
						<img
							src={Gird.src}
							style={{ marginBottom: '5px' }}
							alt=''
						/>
					</div>
					<h5 className='vertical-container-title d-flex align-items-center position-absolute'>
						<div className='line'></div>
						Features
					</h5>
				</div>
			</section>
			<div>
				<div className='product-detail-header'>
					<div className='product-details'>PRODUCT DETAILS</div>
					<h5 className='product-model'>{product.category}</h5>
				</div>
				<div className='product-detail-header'>
					<div className='product-details'>PRODUCT DESCRIPTION</div>
					<p className='product-text'>{product.description}</p>
				</div>
			</div>

			<section className='product-family w-100 position-relative'>
				<div className='product-family__full-price position-absolute bg-light d-flex column justify-content-between'>
					<h5>Buy all products (4)</h5>
					<h1 className='price'>$1,481</h1>
					<button className='add-cart-btn rounded-pill d-flex align-items-center justify-content-between'>
						Add to cart
						<span
							className='features-btn rounded-circle d-flex align-items-center justify-content-center'
							onClick={handleBuy}
						>
							<img src={Plus.src} alt='' />
						</span>
					</button>
				</div>
				<a
					href='#'
					className='features-btn rounded-circle d-flex align-items-center justify-content-center position-absolute'
				>
					<img src={Plus.src} alt='' />
					<span className='ripple rounded-circle border-white'></span>
					<span className='ripple rounded-circle border-white'></span>
				</a>
				<a
					href='#'
					className='features-btn rounded-circle d-flex align-items-center justify-content-center position-absolute'
				>
					<img src={Plus.src} alt='' />
					<span className='ripple rounded-circle border-white'></span>
					<span className='ripple rounded-circle border-white'></span>
				</a>
				<a
					href='#'
					className='features-btn rounded-circle d-flex align-items-center justify-content-center position-absolute'
				>
					<img src={Plus.src} alt='' />
					<span className='ripple rounded-circle border-white'></span>
					<span className='ripple rounded-circle border-white'></span>
				</a>
				<div className='small-preview-container d-flex align-items-center position-absolute'>
					<a href='#' className='preview-btn position-relative'>
						<img
							src='https://i.ibb.co/KhpJmHt/preview1.jpg'
							alt=''
						/>
					</a>
					<a href='#' className='preview-btn position-relative'>
						<img
							src='https://i.ibb.co/fd5wdSw/preview2.jpg'
							alt=''
						/>
					</a>
					<a href='#' className='preview-btn position-relative'>
						<img
							src='https://i.ibb.co/G5XvqBb/preview3.jpg'
							alt=''
						/>
					</a>
				</div>
			</section>
			{/* <!-- Product Suggestions Section--> */}
			<Row
				className='row-cols-1 row-cols-md-4 g-4 mx-auto mt-3 product-suggestion w-100'
				id='product-suggestion'
			>
				<Col>
					<div className='container-full d-flex justify-content-between mx-auto w-100'>
						<div className='section-title h-100'>
							<h1>You Might Like</h1>
							<h5>1 of 3</h5>
							<div className='d-flex align-items-center'>
								{/* <!-- Left Right --> */}
								<button className='arrow-btn d-flex align-items-center justify-content-center bg-light border-medium rounded-circle'>
									<img src={Left.src} alt='' />
								</button>
								<button className='arrow-btn d-flex align-items-center justify-content-center bg-light border-medium rounded-circle'>
									<img src={Right.src} alt='' />
								</button>
							</div>
						</div>

						{productsHandle.products
							.filter(
								(DBproduct) => DBproduct._id !== product!._id
							)
							.slice(1, 4)
							.map((DBproduct) => {
								return DBproduct.category ===
									product!.category ? (
									<ProductCategory
										key={DBproduct._id}
										product={DBproduct}
									/>
								) : null
							})}
					</div>
				</Col>
			</Row>
		</Layout>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = await getProductIds(5)
	return {
		paths,
		// fallback: false, // bất kì path nào k return bởi getStaticPaths sẽ tới trang 404
		fallback: true, // path nào k return ngay lập tức sẽ show trang "tạm thời" => doi getStaticProps chạy
		// => Khi nào getStaticPaths chạy xong => return trang hoàn chỉnh
	}
}

export const getStaticProps: GetStaticProps<IProps, IParams> = async (
	context
) => {
	// const { id } = context.params
	const params: IParams = context.params!
	console.log({ params })

	const product: IProduct = (await getProductById(params.id)) as IProduct
	return {
		props: {
			product,
		},
		revalidate: 1, // khi phía db thay đổi dữ liệu thì bên phía font-end cũng dc rerender lại
		// props
	}
}

export default DetailProduct
