import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import Layout from '../../component/Layout'
import { ProductStateDefault } from '../../context/ProductContext'
import { useAuth, useProduct } from '../../hooks'
import { IProduct, IResponseRegister } from '../../type'
import { deleteProductAPI } from '../../api/ProductAPI'
import { DestroyFileAPI } from '../../api/UploadAPI'
import AlertMessage, { AlertInfo } from '../layout/AlertMessage'
import SpinnerInfo from '../SpinnerInfo'
import Filters from './Filters'
import LoadMore from './LoadMore'

import ProductItem from './ProductItem'

/**
 * Page Product
 * @returns JSX.Element
 */
const Products = () => {
	const checkBoxRef = useRef() as MutableRefObject<HTMLInputElement>
	const [alert, setAlert] = useState<AlertInfo>({ type: null, message: '' })
	const {
		getProducts,
		productsHandle,
		reload,
		updateProducts,
		reloadProduct,
		updateResult,
		category,
		sort,
		search,
		page,
	}: ProductStateDefault = useProduct()
	const {
		authInfo: { isAdmin },
	} = useAuth()

	useEffect(() => {
		getProducts()
		updateResult(productsHandle.result)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reload, productsHandle.result, category, sort, search, page])

	const onChangeCheckBox = () => {
		productsHandle.products.forEach((product) => {
			product.checked = checkBoxRef.current.checked
		})
		updateProducts({
			result: productsHandle.result,
			products: [...productsHandle.products],
		})
	}
	const isCheckedBox = () => {
		return (
			productsHandle.products.filter(
				(product) => product.checked === true
			).length === productsHandle.products.length
		)
	}

	const deleteAll = () => {
		productsHandle.products.forEach(async (product) => {
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
			<Filters />
			{isAdmin && (
				<div style={{ paddingTop: '15px' }}>
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
				{productsHandle.products.map((payload: IProduct) => (
					<ProductItem
						key={payload._id as string}
						product={payload}
						result={productsHandle.result}
					/>
				))}
			</Row>
			<LoadMore />
			{productsHandle.products.length === 0 && <SpinnerInfo />}
		</Layout>
	)
}

export default Products
