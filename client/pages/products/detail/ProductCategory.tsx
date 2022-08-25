import Link from 'next/link'
import { IProduct } from '../../../type'

interface productItemProps {
	product: IProduct
}

const ProductCategory = ({ product }: productItemProps) => {
	return (
		<Link href={`/products/detail/${product._id}`}>
			<div className='product-suggestion-showcase d-flex align-items-center'>
				<div className='suggestion-card h-100 bg-light d-flex column border-light position-relative'>
					<img src={product.image.url} alt='' />
					<h2>{product.title}</h2>
					<h5>{product.content}</h5>
					<h3 className='price'>${product.price}</h3>

					<button className='add-cart-btn rounded-pill d-flex align-items-center justify-content-between'>
						Add to cart
						<span className='features-btn rounded-circle d-flex align-items-center justify-content-center'>
							{/* <!-- Dấu + --> */}
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
		</Link>
	)
}

export default ProductCategory
