import { useRouter } from 'next/router'
import {
	ChangeEvent,
	FormEvent,
	MutableRefObject,
	useEffect,
	useRef,
	useState,
} from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import Layout from '../../../component/Layout'
import { useAuth, useCategory } from '../../../hooks'
import {
	ICategory,
	IFile,
	IResponseFile,
	IResponseRegister,
	IUpLoadProduct,
} from '../../../type'
import { getCategoriesAPI } from '../../api/CategoryAPI'
import { getProductById, updateProductAPI } from '../../api/ProductAPI'
import { DestroyFileAPI, UploadedFileAPI } from '../../api/UploadAPI'
import AlertMessage, { AlertInfo } from '../../layout/AlertMessage'
import Upload from '../lib/svg/upload.svg'

const EditProduct = () => {
	const router = useRouter()
	const {
		authInfo: { isAuthenticated, authLoading, isAdmin },
	} = useAuth()
	useEffect(() => {
		if (authLoading) {
			router.push('/SpinnerInfo')
		} else if (!isAuthenticated) {
			router.push('/auth/Login')
		} else if (!isAdmin) router.back()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, isAdmin])

	const { id } = router.query

	useEffect(() => {
		if (id) {
			;(getProductById(id as string) as Promise<IUpLoadProduct>).then(
				(product: IUpLoadProduct) => {
					setUpLoadForm(product)
					setDisplayImg(true)
					setImage(product.image)
				}
			)
		}
	}, [id])

	const { categories, updateSetCategories } = useCategory()
	useEffect(() => {
		const getCategories = async () => {
			const response: ICategory[] =
				(await getCategoriesAPI()) as ICategory[]
			updateSetCategories(response)
		}
		getCategories()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const upLoadFormDefault: IUpLoadProduct = {
		product_id: '',
		title: '',
		price: 0,
		description: '',
		content: '',
		category: '',
		image: { url: '', public_id: '' },
	}

	const [displayImg, setDisplayImg] = useState<boolean>(false)
	const [image, setImage] = useState<IResponseFile>()

	const inputFileRef = useRef() as MutableRefObject<HTMLInputElement>
	const productIdRef = useRef() as MutableRefObject<HTMLInputElement>
	const [alert, setAlert] = useState<AlertInfo>({ type: null, message: '' })

	const [upLoadForm, setUpLoadForm] =
		useState<IUpLoadProduct>(upLoadFormDefault)
	const { product_id, title, price, description, content, category } =
		upLoadForm

	const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault()
		try {
			if (!isAdmin) {
				setAlert({
					type: 'danger',
					message: 'You are not authorized',
				})
				handleCloseAlert()
				return
			}

			const file =
				event.currentTarget.files && event.currentTarget.files[0]
			if (!file) {
				setAlert({
					type: 'danger',
					message: 'File not exists',
				})
				handleCloseAlert()
				return
			}
			if (file.size > 1024 * 1024) {
				setAlert({
					type: 'danger',
					message: 'Size too large',
				})
				handleCloseAlert()
				return
			}
			if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
				setAlert({
					type: 'danger',
					message: 'File format is incorrect',
				})
				handleCloseAlert()
				return
			}
			const pathFake: string = event.currentTarget.value

			const pathReal: string = pathFake.replace(
				'C:\\fakepath',
				'D:\\BaiTap\\DATN\\img'
			)

			const data: IFile = {
				path: pathReal,
				name: file.name,
				size: file.size,
				type: file.type,
			}

			const response = (await UploadedFileAPI(data)) as IResponseFile
			setImage(response)
			setDisplayImg(true)
		} catch (error) {
			setAlert({
				type: 'danger',
				message: error as string,
			})
			handleCloseAlert()
			return
		}
	}

	const onClickUploadFile = () => {
		inputFileRef.current.click()
	}
	const onClickDestroy = async () => {
		try {
			if (!isAdmin) {
				setAlert({
					type: 'danger',
					message: 'You are not authorized',
				})
				handleCloseAlert()
				return
			}
			setDisplayImg(true)

			await DestroyFileAPI(image!.public_id)

			setDisplayImg(false)
		} catch (error) {
			setAlert({
				type: 'danger',
				message: error as string,
			})
			handleCloseAlert()
			return
		}
	}
	const handleCloseAlert = () => {
		setTimeout(() => setAlert({ type: null, message: '' }), 2000)
	}
	// OnChange Input Form
	const onChangeInputForm = (event: ChangeEvent<HTMLInputElement>) =>
		setUpLoadForm({
			...upLoadForm,
			[event.target.name]: event.target.value,
		})
	// OnChange Category
	const onChangeCategory = (event: ChangeEvent<HTMLSelectElement>) =>
		setUpLoadForm({
			...upLoadForm,
			[event.target.name]: event.target.value,
		})
	// OnSubmit Form
	const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		try {
			if (!isAdmin) {
				setAlert({
					type: 'danger',
					message: 'You are not authorized',
				})
				handleCloseAlert()
				return
			}
			if (!image) {
				setAlert({
					type: 'danger',
					message: 'No Image Upload',
				})
				handleCloseAlert()
				return
			}
			const response: IResponseRegister = (await updateProductAPI(
				id as string,
				{
					...upLoadForm,
					image,
				}
			)) as IResponseRegister
			setAlert({
				type: 'info',
				message: response.message,
			})
			handleCloseAlert()

			setDisplayImg(false)
			setUpLoadForm(upLoadFormDefault)
			productIdRef.current.focus()
			setTimeout(() => {
				router.back()
			}, 1000)
		} catch (error) {
			setAlert({
				type: 'danger',
				message: error as string,
			})
			handleCloseAlert()
			return
		}
	}

	return (
		<Layout>
			<div className='upLoadProduct'>
				<div className='container tm-mt-big tm-mb-big'>
					<AlertMessage type={alert.type} message={alert.message} />
					<Row>
						<div className='col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto'>
							<div className='tm-bg-primary-dark tm-block tm-block-h-auto'>
								<Row>
									<div className='col-12'></div>

									<h2 className='tm-block-title d-inline-block'>
										Add Product
									</h2>
								</Row>
								<Row className='tm-edit-product-row'>
									<Form
										className='tm-edit-product-form d-flex'
										style={{ color: '#fff' }}
										onSubmit={onSubmitForm}
									>
										<Row>
											<Col
												style={{ marginRight: '30px' }}
											>
												<Form.Group className='mb-3'>
													<Form.Label>
														Product ID
													</Form.Label>
													<Form.Control
														type='text'
														required
														value={product_id}
														onChange={
															onChangeInputForm
														}
														name='product_id'
														ref={productIdRef}
														disabled
														readOnly
													/>
												</Form.Group>
												<Form.Group className='mb-3'>
													<Form.Label>
														Title
													</Form.Label>
													<Form.Control
														type='text'
														required
														value={title}
														onChange={
															onChangeInputForm
														}
														name='title'
													/>
												</Form.Group>
												<Form.Group className='mb-3'>
													<Form.Label>
														Price
													</Form.Label>
													<Form.Control
														type='text'
														required
														value={price}
														onChange={
															onChangeInputForm
														}
														name='price'
													/>
												</Form.Group>

												<Form.Group className='mb-3'>
													<Form.Label>
														Description
													</Form.Label>
													<Form.Control
														as='textarea'
														required
														style={{
															height: '90px',
														}}
														value={description}
														onChange={
															onChangeInputForm
														}
														name='description'
													/>
												</Form.Group>
												<Form.Group className='mb-3'>
													<Form.Label>
														Content
													</Form.Label>
													<Form.Control
														as='textarea'
														required
														style={{
															height: '90px',
														}}
														value={content}
														onChange={
															onChangeInputForm
														}
														name='content'
													/>
												</Form.Group>
											</Col>
											<Col>
												<Form.Group className='mb-3'>
													<Form.Label>
														Category
													</Form.Label>
													<Form.Select
														className='custom-select'
														value={category}
														name='category'
														onChange={
															onChangeCategory
														}
														required
													>
														<option value=''>
															Please select
															category
														</option>

														{categories.map(
															(category) => (
																<option
																	key={
																		category._id as string
																	}
																	value={
																		category.nameCategory
																	}
																>
																	{
																		category.nameCategory
																	}
																</option>
															)
														)}
													</Form.Select>
												</Form.Group>
												<div className='tm-product-img-dummy mx-auto'>
													{!displayImg && (
														<img
															src={Upload.src}
															alt='Upload'
															width={40}
														/>
													)}

													{displayImg && (
														<>
															{image ? (
																<>
																	<img
																		src={
																			image.url
																		}
																		alt=''
																		style={{
																			maxWidth:
																				'100%',
																			maxHeight:
																				'100%',
																		}}
																	/>
																	<span
																		onClick={
																			onClickDestroy
																		}
																	>
																		X
																	</span>
																</>
															) : (
																<Spinner
																	animation='border'
																	variant='warning'
																/>
															)}
														</>
													)}
												</div>

												<div className='custom-file mt-3 mb-3'>
													<input
														id='fileInput'
														type='file'
														onChange={onChangeFile}
														style={{
															display: 'none',
														}}
														ref={inputFileRef}
													/>

													<input
														type='button'
														className='btn btn-primary btn-block mx-auto'
														value='UPLOAD PRODUCT IMAGE'
														style={{
															width: '100%',
														}}
														onClick={
															onClickUploadFile
														}
													/>
												</div>
											</Col>
											<Row
												style={{
													width: '100%',
													display: 'block',
													marginLeft: '10px',
													paddingRight: '150px',
												}}
											>
												<Button
													type='submit'
													className='text-uppercase'
													style={{
														width: '100%',
														marginLeft: '80px',
													}}
												>
													Edit Product
												</Button>
											</Row>
										</Row>
									</Form>
								</Row>
							</div>
						</div>
					</Row>
				</div>
			</div>
		</Layout>
	)
}

export default EditProduct
