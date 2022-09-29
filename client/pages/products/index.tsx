import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import Layout from '../../component/Layout'
import { ProductStateDefault } from '../../context/ProductContext'
import { useAuth, useProduct } from '../../hooks'
import { IProduct, IResponseRegister } from '../../type'
import { deleteProductAPI } from '../api/ProductAPI'
import { DestroyFileAPI } from '../api/UploadAPI'
import AlertMessage, { AlertInfo } from '../layout/AlertMessage'

import ProductItem from './ProductItem'

const Products = () => {
	const checkBoxRef = useRef() as MutableRefObject<HTMLInputElement>
	const [alert, setAlert] = useState<AlertInfo>({ type: null, message: '' })
	const {
		getProducts,
		productsHandle,
		reload,
		updateProducts,
		reloadProduct,
	}: ProductStateDefault = useProduct()
	const {
		authInfo: { isAdmin },
	} = useAuth()

	useEffect(() => {
		getProducts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reload])

	const onChangeCheckBox = () => {
		productsHandle.forEach((product) => {
			product.checked = checkBoxRef.current.checked
		})
		updateProducts([...productsHandle])
	}
	const isCheckedBox = () => {
		return (
			productsHandle.filter((product) => product.checked === true)
				.length === productsHandle.length
		)
	}

	const deleteAll = () => {
		productsHandle.forEach(async (product) => {
			if (product.checked) {
				try {
					await DestroyFileAPI(product.image.public_id)
					const deleteProduct: IResponseRegister =
						(await deleteProductAPI(
							product._id as string
						)) as IResponseRegister
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
		})
	}

	return (
		<Layout>
			<AlertMessage type={alert.type} message={alert.message} />
			{isAdmin && (
				<div>
					<span style={{ color: 'rgb(3, 165, 206)' }}>
						SELECT ALL
					</span>
					<Form.Check
						type='checkbox'
						id='checkbox-product'
						onChange={onChangeCheckBox}
						checked={isCheckedBox()}
						ref={checkBoxRef}
					/>
					<Button variant='danger' onClick={deleteAll}>
						Delete All
					</Button>
				</div>
			)}
			<Row className='row-cols-1 row-cols-md-4 g-4 mx-auto mt-3'>
				{productsHandle.map((product: IProduct) => (
					<ProductItem
						key={product._id as string}
						product={product}
					/>
				))}
			</Row>
		</Layout>
	)
}

export default Products
