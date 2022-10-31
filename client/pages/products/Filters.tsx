import React, { ChangeEvent, useEffect } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { ProductStateDefault } from '../../context/ProductContext'
import { useCategory, useProduct } from '../../hooks'
import { ICategory } from '../../type'
import { getCategoriesAPI } from '../../api/CategoryAPI'

const Filters = () => {
	const {
		category,
		sort,
		updateCategory,
		updateSort,
		updateSearch,
	}: ProductStateDefault = useProduct()
	const { categories, updateSetCategories } = useCategory()
	const onHandleCategory = (event: ChangeEvent<HTMLSelectElement>) => {
		updateCategory(event.target.value)
		updateSearch('')
	}
	const onHandleSortBy = (event: ChangeEvent<HTMLSelectElement>) => {
		updateSort(event.target.value)
	}

	useEffect(() => {
		const getCategories = async () => {
			const response: ICategory[] =
				(await getCategoriesAPI()) as ICategory[]
			updateSetCategories(response)
		}
		getCategories()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Row>
				<Col xs={12} md={8}>
					<span>Filters:</span>
					<Form.Select
						aria-label='Default select example'
						value={category}
						onChange={onHandleCategory}
						style={{ marginTop: '10px' }}
					>
						<option>All Product</option>
						{categories.map((category) => (
							<option
								key={category._id as string}
								value={'category=' + category.nameCategory}
							>
								{category.nameCategory}
							</option>
						))}
					</Form.Select>
				</Col>
				<Col xs={6} md={4}>
					<span>Sort By:</span>
					<Form.Select
						aria-label='Default select example'
						value={sort}
						onChange={onHandleSortBy}
						style={{ marginTop: '10px' }}
					>
						<option>All Product</option>
						<option value=''>Newest</option>
						<option value='sort=oldest'>Oldest</option>
						<option value='sort=-sold'>Best sales</option>
						<option value='sort=-price'>Price: Hight-Low</option>
						<option value='sort=price'>Price: Low-Hight</option>
					</Form.Select>
				</Col>
			</Row>
		</>
	)
}

export default Filters
