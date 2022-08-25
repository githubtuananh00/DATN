import Link from 'next/link'
import { useRouter } from 'next/router'
import {
	ChangeEvent,
	FormEvent,
	MutableRefObject,
	useRef,
	useState,
} from 'react'
import { Button, Form } from 'react-bootstrap'
import Layout from '../../component/Layout'
import { useAuth } from '../../hooks'
import { IResponseRefreshToken, IResponseToken, IUserLogin } from '../../type'
import AlertMessage, { AlertInfo } from '../layout/AlertMessage'

const Login = () => {
	const usernameRef = useRef() as MutableRefObject<HTMLInputElement>
	const router = useRouter()

	// context
	const { loginUser } = useAuth()

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
			console.log(loginData)

			if (loginData.success) router.push('/dashboard')
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

	// console.log(alert.type, alert.message)
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
