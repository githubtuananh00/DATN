import Link from 'next/link'
import { Button, Card, Col } from 'react-bootstrap'
import { IProduct } from '../../type'
interface productItemProps {
	product: IProduct
}
const ProductItem = ({ product }: productItemProps) => {
	// console.log(product.image.url)

	return (
		<Col>
			<Card style={{ width: '17rem' }} className='md-4'>
				<Card.Img variant='top' src={product.image.url} />
				<Card.Body>
					<Card.Title>{product.title}</Card.Title>
					<span style={{ color: '#ee4d2d' }}>{product.price}</span>
					<Card.Text>{product.description}</Card.Text>
					<Link href='#!' passHref>
						{/* <Card.Link id='btn_buy'>Buy</Card.Link> */}
						<Button
							className='add-cart-btn rounded-pill btn_buy align-items-center justify-content-between'
							style={{ width: '100px' }}
						>
							Buy
						</Button>
					</Link>

					<Link href={`/products/detail/${product._id}`} passHref>
						<Button
							className='add-cart-btn rounded-pill btn_view align-items-center justify-content-between'
							style={{ width: '100px' }}
						>
							View
						</Button>
					</Link>
				</Card.Body>
			</Card>
		</Col>
	)
}

export default ProductItem
