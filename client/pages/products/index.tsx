import { useEffect } from 'react'
import { Row, Spinner } from 'react-bootstrap'
import Layout from '../../component/Layout'
import { ProductStateDefault } from '../../context/ProductContext'
import { useProduct } from '../../hooks'
import { IProduct } from '../../type'
import ProductItem from './ProductItem'

const Products = () => {
	const { getProducts, products }: ProductStateDefault = useProduct()
	// const [products] = state.productApi.products
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
				<Spinner animation='border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</Spinner>
			</Row>
		</Layout>
	)
}

export default Products
