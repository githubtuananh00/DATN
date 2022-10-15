import Link from 'next/link'
import { Button, Card, Col, Spinner } from 'react-bootstrap'
import { useAuth, useCart, useProduct } from '../../hooks'
import { IProduct, IProductQty, IResponseRegister } from '../../type'
import Form from 'react-bootstrap/Form'
import { useRouter } from 'next/router'
import AlertMessage, { AlertInfo } from '../layout/AlertMessage'
import { useState } from 'react'
import { DestroyFileAPI } from '../api/UploadAPI'
import { deleteProductAPI } from '../api/ProductAPI'
import { ProductStateDefault } from '../../context/ProductContext'

export interface productItemProps {
	product: IProduct
	result: number
}
const ProductItem = ({ product, result }: productItemProps) => {
	const router = useRouter()
	const { reloadProduct, updateProduct }: ProductStateDefault = useProduct()
	const {
		authInfo: { isAdmin, isAuthenticated },
	} = useAuth()
	const { addCart, cart } = useCart()
	const [alert, setAlert] = useState<AlertInfo>({ type: null, message: '' })
	const [loading, setLoading] = useState<boolean>(false)

	const handleBuy = () => {
		if (isAuthenticated) {
			const productCart: IProductQty = {
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

			return addCart(productCart)
		} else {
			router.push('/auth/Login')
			return
		}
	}
	const onClickDeleteProduct = async (id: string) => {
		try {
			setLoading(true)
			await DestroyFileAPI(product.image.public_id)
			const deleteProduct: IResponseRegister = (await deleteProductAPI(
				id
			)) as IResponseRegister
			setLoading(false)
			reloadProduct()
			setAlert({
				type: 'info',
				message: deleteProduct.message,
			})
			setTimeout(() => {
				setAlert({ type: null, message: '' })
			}, 1000)
		} catch (error) {
			setAlert({
				type: 'danger',
				message: error as string,
			})
			setTimeout(() => {
				setAlert({ type: null, message: '' })
			}, 1000)
		}
	}

	// OnChange Checkbox
	const onChangeCheckBox = () => {
		product.checked = !product.checked
		updateProduct({
			products: { ...product } as unknown as IProduct,
			result,
		})
	}

	if (loading)
		return (
			<div className='spinner-container'>
				<Spinner animation='border' role='status' />
			</div>
		)

	return (
		<Col>
			<AlertMessage type={alert.type} message={alert.message} />

			<Card style={{ width: '17rem' }} className='md-4'>
				{isAdmin && (
					<Form.Check
						type='checkbox'
						id='checkbox-product'
						checked={product.checked}
						onChange={onChangeCheckBox}
					/>
				)}
				<Card.Img variant='top' src={product.image.url} />
				<Card.Body>
					<Card.Title>{product.title}</Card.Title>
					<span style={{ color: '#ee4d2d' }}>${product.price}</span>
					<Card.Text>{product.description}</Card.Text>
					<Card.Text>Sold: {product.sold}</Card.Text>
					{isAdmin ? (
						<>
							<Link href='#!' passHref>
								<Button
									className='add-cart-btn rounded-pill btn_buy align-items-center justify-content-between'
									style={{ width: '100px' }}
									onClick={() =>
										onClickDeleteProduct(
											product._id as string
										)
									}
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
