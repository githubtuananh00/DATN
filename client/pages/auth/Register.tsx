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
import { IResponseRegister, IResponseToken, IUser } from '../../type'
import AlertMessage, { AlertInfo } from '../layout/AlertMessage'

const Register = () => {
	const usernameRef = useRef() as MutableRefObject<HTMLInputElement>

	const router = useRouter()

	// context
	const { register } = useAuth()

	const registerFormDefault: IUser = {
		username: '',
		password: '',
		address: '',
		dateOfBirth: '',
		email: '',
		gt: 'gt',
		name: '',
		phone: '',
		role: 'User',
		refreshToken: null,
	}
	const [alert, setAlert] = useState<AlertInfo>({ type: null, message: '' })
	const [registerForm, setRegisterForm] = useState<IUser>(registerFormDefault)

	const {
		username,
		password,
		address,
		dateOfBirth,
		email,
		gt,
		name,
		phone,
	}: IUser = registerForm

	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const onChangeConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(event.target.value)
	}

	const onChangeRegisterForm = (event: ChangeEvent<HTMLInputElement>) => {
		setRegisterForm({
			...registerForm,
			[event.target.name]: event.target.value,
		})
	}

	const onChangeGt = (event: ChangeEvent<HTMLSelectElement>) =>
		setRegisterForm({
			...registerForm,
			[event.target.name]: event.target.value,
		})

	const loginSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		try {
			if (password !== confirmPassword) {
				setDefault('Those passwords didn’t match. Try again')
				return
			}
			const registerData: IResponseRegister = (await register(
				registerForm
			)) as unknown as IResponseRegister
			console.log(registerData)

			if (registerData.success) {
				router.push('/auth/Login')
				return
			} else {
				setDefault(
					(registerData as unknown as IResponseToken).message.response
						.data.message
				)
			}
		} catch (error: unknown) {
			console.log(error)
		}
	}
	const setDefault = (message: string) => {
		setRegisterForm(registerFormDefault)
		setConfirmPassword('')
		usernameRef.current.focus()
		setAlert({
			type: 'danger',
			message,
		})
		setTimeout(() => setAlert({ type: null, message: '' }), 3000)
	}

	// console.log(alert.type, alert.message)
	return (
		<Layout>
			<Form className='my-4' onSubmit={loginSubmit}>
				<AlertMessage type={alert.type} message={alert.message} />
				<Form.Group className='mb-3'>
					<Form.Control
						type='text'
						placeholder='User Name'
						name='username'
						value={username}
						onChange={onChangeRegisterForm}
						ref={usernameRef}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						onChange={onChangeRegisterForm}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='password'
						placeholder='Confirm Password'
						name='confirmPassword'
						value={confirmPassword}
						onChange={onChangeConfirmPassword}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='text'
						placeholder='Your Name'
						name='name'
						value={name}
						onChange={onChangeRegisterForm}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='text'
						placeholder='Your Address'
						name='address'
						value={address}
						onChange={onChangeRegisterForm}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='email'
						placeholder='Email'
						name='email'
						value={email}
						onChange={onChangeRegisterForm}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Control
						type='text'
						placeholder='Phone'
						name='phone'
						value={phone}
						onChange={onChangeRegisterForm}
						required
					/>
				</Form.Group>

				<Form.Group className='mb-3'>
					<Form.Control
						type='text'
						placeholder='Birth Day'
						name='dateOfBirth'
						value={dateOfBirth}
						onChange={onChangeRegisterForm}
						required
					/>
				</Form.Group>
				<Form.Select
					value={gt}
					name='gt'
					onChange={onChangeGt}
					required
				>
					<option value='gt'>Giới tính</option>
					<option value='Nam'>Nam</option>
					<option value='Nữ'>Nữ</option>
					<option value=''>Khác</option>
				</Form.Select>
				<br></br>
				<Link href='/auth/Login'>
					<Button variant='primary' type='submit'>
						Back
					</Button>
				</Link>
				<Button variant='primary' type='submit'>
					Register
				</Button>
			</Form>
		</Layout>
	)
}

export default Register
