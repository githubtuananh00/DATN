import Link from 'next/link'
import { useRouter } from 'next/router'
import {
	ChangeEvent,
	FormEvent,
	MutableRefObject,
	useEffect,
	useRef,
	useState,
} from 'react'
import { Button, Form } from 'react-bootstrap'
import Layout from '../../component/Layout'
import { useAuth, useCart } from '../../hooks'
import { IResponseRefreshToken, IResponseToken, IUserLogin } from '../../type'
import AlertMessage, { AlertInfo } from '../layout/AlertMessage'

const Login = () => {
	const router = useRouter()

	// context
	const {
		authInfo: { isAuthenticated, authLoading, isAdmin },
		loginUser,
	} = useAuth()

	const { loginCart } = useCart()

	useEffect(() => {
		if (authLoading) {
			router.push('/dashboard/SpinnerInfo')
		} else if (isAuthenticated) {
			if (isAdmin) router.push('/admin')
			else router.push('/dashboard')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, authLoading, isAdmin])

	const usernameRef = useRef() as MutableRefObject<HTMLInputElement>

	const loginFormDefault: IUserLogin = {
		username: '',
		password: '',
	}
	const [alert, setAlert] = useState<AlertInfo>({ type: null, message: '' })
	const [loginForm, setLoginForm] = useState<IUserLogin>(loginFormDefault)
	const { username, password }: IUserLogin = loginForm

	const onChangeLoginForm = (event: ChangeEvent<HTMLInputElement>) =>
		setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

	const loginSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		try {
			const loginData: IResponseRefreshToken = (await loginUser(
				loginForm
			)) as IResponseRefreshToken

			loginCart()
			if (loginData.success) router.back()
			else {
				setLoginForm(loginFormDefault)
				usernameRef.current.focus()
				setAlert({
					type: 'danger',
					message: (loginData as unknown as IResponseToken).message
						.response.data.message,
				})
				setTimeout(() => setAlert({ type: null, message: '' }), 2000)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Layout>
			<Form className='my-4' onSubmit={loginSubmit}>
				<AlertMessage type={alert.type} message={alert.message} />
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Control
						type='text'
						placeholder='User Name'
						name='username'
						value={username}
						onChange={onChangeLoginForm}
						ref={usernameRef}
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Control
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>

				<Button variant='primary' type='submit'>
					Login
				</Button>
			</Form>
			<Link href='/auth/Register'>
				<Button variant='primary' type='submit'>
					Register
				</Button>
			</Link>
		</Layout>
	)
}

export default Login
