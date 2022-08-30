import Link from 'next/link'
import { Button, Card, Col } from 'react-bootstrap'
import { useAuth, useProduct } from '../../hooks'
import { IProduct, IProductQty } from '../../type'
import Form from 'react-bootstrap/Form'
import { useRouter } from 'next/router'
import AlertMessage, { AlertInfo } from '../layout/AlertMessage'
import { useState } from 'react'

export interface productItemProps {
	product: IProduct
}
const ProductItem = ({ product }: productItemProps) => {
	const router = useRouter()
	const {
		authInfo: { isAdmin, isAuthenticated },
	} = useAuth()
	const { addCart, cart } = useProduct()
	const [alert, setAlert] = useState<AlertInfo>({ type: null, message: '' })

	const handleBuy = () => {
		if (isAuthenticated) {
			const productQty: IProductQty = {
				product,
				quantity: 1,
			}
			cart.filter(
				(productInfo) =>
					(productInfo.product._id as string) ===
					(product._id as string)
			).map(() => {
				setAlert({
					type: 'danger',
					message: 'This product has been added to Cart',
				})
				setTimeout(() => {
					setAlert({ type: null, message: '' })
				}, 1000)
			})

			return addCart(productQty)
		} else {
			router.push('/auth/Login')
			return
		}
	}
	console.log(cart)

	return (
		<Col>
			<AlertMessage type={alert.type} message={alert.message} />
			<Card style={{ width: '17rem' }} className='md-4'>
				{isAdmin && (
					<Form.Check type='checkbox' id='checkbox-product' />
				)}
				<Card.Img variant='top' src={product.image.url} />
				<Card.Body>
					<Card.Title>{product.title}</Card.Title>
					<span style={{ color: '#ee4d2d' }}>{product.price}</span>
					<Card.Text>{product.description}</Card.Text>
					{isAdmin ? (
						<>
							<Link href='#!' passHref>
								<Button
									className='add-cart-btn rounded-pill btn_buy align-items-center justify-content-between'
									style={{ width: '100px' }}
								>
									Delete
								</Button>
							</Link>

							<Link
								href={`/products/edit/${product._id}`}
								passHref
							>
								<Button
									className='add-cart-btn rounded-pill btn_view align-items-center justify-content-between'
									style={{ width: '100px' }}
								>
									Edit
								</Button>
							</Link>
						</>
					) : (
						<>
							<Link href='' passHref>
								<Button
									className='add-cart-btn rounded-pill btn_buy align-items-center justify-content-between'
									style={{ width: '100px' }}
									onClick={handleBuy}
								>
									BUY
								</Button>
							</Link>

							<Link
								href={`/products/detail/${product._id}`}
								passHref
							>
								<Button
									className='add-cart-btn rounded-pill btn_view align-items-center justify-content-between'
									style={{ width: '100px' }}
								>
									View
								</Button>
							</Link>
						</>
					)}
				</Card.Body>
			</Card>
		</Col>
	)
}

export default ProductItem
