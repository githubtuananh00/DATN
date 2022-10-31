import Link from 'next/link'
import { useRouter } from 'next/router'
import React, {
	ChangeEvent,
	FormEvent,
	MutableRefObject,
	useEffect,
	useRef,
	useState,
} from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import Layout from '../../component/Layout'
import { useAuth, useCategory } from '../../hooks'
import { ICategory, IResponseRegister } from '../../type'
import {
	addCategoryAPI,
	deletedCategoryAPI,
	getCategoriesAPI,
} from '../../api/CategoryAPI'
import AlertMessage, { AlertInfo } from '../layout/AlertMessage'

const Category = () => {
	const router = useRouter()
	// context
	const {
		authInfo: { isAuthenticated, authLoading, isAdmin },
	} = useAuth()
	const { categories, updateSetCategories } = useCategory()

	const [reload, setReload] = useState<boolean>(false)

	useEffect(() => {
		if (authLoading) {
			router.push('/SpinnerInfo')
		} else if (!isAuthenticated) {
			router.push('/auth/Login')
		} else if (!isAdmin) router.back()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, isAdmin])
	useEffect(() => {
		const getCategories = async () => {
			const response: ICategory[] =
				(await getCategoriesAPI()) as ICategory[]
			updateSetCategories(response)
		}
		getCategories()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reload])

	const [nameCategory, setNameCategory] = useState<string>('')
	const [alert, setAlert] = useState<AlertInfo>({ type: null, message: '' })

	const onChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
		setNameCategory(event.target.value)
	}
	const onSubmitCategory = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		try {
			const response: IResponseRegister = (await addCategoryAPI({
				nameCategory,
			})) as IResponseRegister

			defaultForm('success', response.message)
			setReload(!reload)
		} catch (error) {
			defaultForm('danger', error as string)
		}
	}
	const nameCategoryRef = useRef() as MutableRefObject<HTMLInputElement>
	const defaultForm = (typeAlert: string, message: string) => {
		setNameCategory('')
		nameCategoryRef.current.focus()
		setAlert({
			type: typeAlert,
			message,
		})
		setTimeout(() => setAlert({ type: null, message: '' }), 3000)
	}

	const onClickDelete = async (id: string) => {
		try {
			const response = await deletedCategoryAPI(id as string)
			if (response!.success) {
				defaultForm('success', response!.message as string)
				setReload(!reload)
			}
		} catch (error) {
			defaultForm('danger', error as string)
		}
	}

	return (
		<Layout>
			<Row>
				<Col>
					<Form onSubmit={onSubmitCategory}>
						<AlertMessage
							type={alert.type}
							message={alert.message}
						/>
						<Form.Label
							style={{ fontWeight: '900', fontSize: '22px' }}
						>
							CATEGORY
						</Form.Label>
						<br />
						<Form.Control
							ref={nameCategoryRef}
							type='text'
							style={{
								width: '80%',
								display: 'inline',
								marginRight: '20px',
							}}
							required
							value={nameCategory}
							onChange={onChangeForm}
						/>
						<Button variant='secondary' type='submit'>
							Save
						</Button>
					</Form>
				</Col>
				<Col>
					<br />
					{categories.map((category) => (
						<div key={category._id as string}>
							<Row>
								<Card>
									<Card.Body>
										<Card.Text
											style={{
												display: 'inline',
												marginRight: '15px',
											}}
										>
											{category.nameCategory}
										</Card.Text>
										<>
											<Link
												href={`/category/${
													category._id as string
												}`}
											>
												<Button
													variant='secondary'
													style={{
														marginRight: '10px',
													}}
												>
													Edit
												</Button>
											</Link>
											<Button
												variant='secondary'
												onClick={() =>
													onClickDelete(
														category._id as string
													)
												}
											>
												Delete
											</Button>
										</>
									</Card.Body>
								</Card>
							</Row>
							<br />
						</div>
					))}
				</Col>
			</Row>
		</Layout>
	)
}

export default Category
