import { useRouter } from 'next/router'
import React, {
	ChangeEvent,
	FormEvent,
	MutableRefObject,
	useEffect,
	useRef,
	useState,
} from 'react'
import { Button, Form } from 'react-bootstrap'
import Layout from '../../component/Layout'
import { useAuth } from '../../hooks'
import { IPayLoad, IReqCategory } from '../../type'
import { editCategoryAPI, getCategoryByIdAPI } from '../../api/CategoryAPI'
import AlertMessage, { AlertInfo } from '../layout/AlertMessage'

const EditCategory = () => {
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
	const router = useRouter()
	const { id } = router.query
	const [nameCategory, setNameCategory] = useState<string>('')
	const [alert, setAlert] = useState<AlertInfo>({ type: null, message: '' })
	const nameCategoryRef = useRef() as MutableRefObject<HTMLInputElement>
	const onChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
		setNameCategory(event.target.value)
	}
	const onSubmitCategory = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		try {
			const response = await editCategoryAPI(id as string, {
				nameCategory,
			})
			response!.success &&
				defaultForm('success', response!.message as string)
		} catch (error) {
			defaultForm('danger', error as string)
		}
	}
	useEffect(() => {
		;(
			getCategoryByIdAPI(id as string) as Promise<IPayLoad<IReqCategory>>
		).then((response) => {
			setNameCategory(response.products.nameCategory)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const defaultForm = (typeAlert: string, message: string) => {
		setNameCategory('')
		nameCategoryRef.current.focus()
		setAlert({
			type: typeAlert,
			message,
		})
		typeAlert === 'success' && setTimeout(() => router.back(), 1000)
		setTimeout(() => setAlert({ type: null, message: '' }), 2000)
	}
	return (
		<Layout>
			<Form onSubmit={onSubmitCategory}>
				<AlertMessage type={alert.type} message={alert.message} />
				<Form.Label style={{ fontWeight: '900', fontSize: '22px' }}>
					EDIT CATEGORY
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
		</Layout>
	)
}

export default EditCategory
