import { useEffect } from 'react'
import { Row, Spinner } from 'react-bootstrap'
import Layout from '../../component/Layout'
import { ProductStateDefault } from '../../context/ProductContext'
import { useProduct } from '../../hooks'
import { IProduct } from '../../type'

import ProductItem from './ProductItem'

const Products = () => {
	const { getProducts, products }: ProductStateDefault = useProduct()

	useEffect(() => {
		getProducts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Layout>
			<Row className='row-cols-1 row-cols-md-4 g-4 mx-auto mt-3'>
				{products.map((product: IProduct) => (
					<ProductItem
						key={product._id as string}
						product={product}
					/>
				))}

				<div className='spinner-container'>
					<Spinner animation='border' role='status' />
				</div>
			</Row>
		</Layout>
	)
}

export default Products
