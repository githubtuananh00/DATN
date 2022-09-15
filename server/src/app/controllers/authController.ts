import { NextFunction, Request, Response } from 'express'
import User, { IUser } from '../modules/User'
import { hash, verify } from 'argon2'
import jwt, { Secret, sign } from 'jsonwebtoken'
import { IGenerateTokens, IGetUserAuthInfoRequest } from '../type'

class AuthController {
	// [GET] /auth
	async loadUser(
		req: IGetUserAuthInfoRequest<IGenerateTokens>,
		res: Response
	) {
		try {
			const user = await User.findById(req.userId).select('-password')
			if (!user)
				return res
					.status(400)
					.json({ success: false, message: 'User not found' })
			return res.json({ success: true, payload: user })
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}

	// [POST] /auth/register
	async register(req: Request, res: Response) {
		const {
			username,
			password,
			name,
			email,
			phone,
			address,
			gt,
			dateOfBirth,
			role,
		}: IUser = req.body

		// Lôi nay ở FE
		if (!username || !password)
			return res.status(400).json({
				success: false,
				message: 'Mission username or password',
			})

		try {
			// Check for existing user
			const user: IUser | null = await User.findOne({ username })
			if (user)
				return res
					.status(400)
					.json({ success: false, message: 'User already exists' })

			// Check for existing phone
			const phone1: IUser | null = await User.findOne({ phone })
			if (phone1)
				return res.status(400).json({
					success: false,
					message: 'Phone number already exists',
				})

			// Check for existing email
			const email1: IUser | null = await User.findOne({ email })
			if (email1)
				return res.status(400).json({
					success: false,
					message: 'Email already exists',
				})

			// All good
			const hashPassword = await hash(password)
			const newUser: IUser = new User({
				username,
				password: hashPassword,
				name,
				email,
				phone,
				address,
				gt,
				dateOfBirth,
				role,
			})
			await newUser.save()

			// Return token
			// const tokens: IGenerateTokens = generateTokens(newUser)
			return res.status(200).json({
				success: true,
				message: 'User created successfully',
				// tokens,
			})
		} catch (error) {
			console.log(error)
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			})
		}
	}

	// [POST] /auth/login
	async login(req: Request, res: Response) {
		const { username, password }: IUser = req.body

		if (!username || !password)
			return res.status(400).json({
				success: false,
				message: 'Mission username or password',
				tokens: null,
			})

		try {
			// Check for existing user
			const user: IUser | null = await User.findOne({ username })
			if (!user)
				return res.status(400).json({
					success: false,
					message: 'Incorrect username or password',
					tokens: null,
				})

			// Username found
			const passwordValid = await verify(user.password, password)
			if (!passwordValid)
				return res.status(400).json({
					success: false,
					message: 'Incorrect username or password',
					tokens: null,
				})

			// All good

			// Create accessToken, refreshToken
			const tokens: IGenerateTokens = generateTokens(user)

			await User.updateOne(
				{ _id: user._id },
				{ refreshToken: tokens.refreshToken }
			)

			return res.status(200).json({
				success: true,
				message: 'User logged in successfully',
				tokens,
			})
		} catch (error) {
			console.log(error)
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error',
				tokens: null,
			})
		}
	}

	// [POST] /auth/token
	async token(req: IGetUserAuthInfoRequest<null>, res: Response) {
		// const refreshToken: string = req.body.refreshToken
		const userId: string = req.userId

		// if (!refreshToken)
		// 	return res
		// 		.status(401)
		// 		.json({ success: false, message: 'Refresh token not found' })
		try {
			const user: IUser | null = await User.findOne({ _id: userId })

			if (!user)
				return res
					.status(403)
					.json({ success: false, message: 'refreshToken not found' })
			const refreshToken: string = user.refreshToken
			// if (refToken !== refreshToken)
			// 	return res
			// 		.status(403)
			// 		.json({ success: false, message: 'refreshToken not found' })

			// Verify token
			jwt.verify(refreshToken, process.env.REFRESH_TOKEN as Secret)
			// Create new token, newRefreshToken
			const tokens: IGenerateTokens = generateTokens(user)

			await User.updateOne(
				{ _id: user._id },
				{ refreshToken: tokens.refreshToken }
			)
			return res.status(200).json({
				success: true,
				message: 'Refresh Token successfully',
				tokens,
			})
		} catch (error) {
			console.log(error)
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			})
		}
	}

	// [DELETE] /auth/deleteToken
	async deleteToken(req: IGetUserAuthInfoRequest<null>, res: Response) {
		const userId: string = req.userId
		try {
			await User.updateOne({ _id: userId }, { refreshToken: null })
			return res.status(204).json({
				success: true,
				message: 'Logout Successfully',
			})
		} catch (error) {
			console.log(error)
			return res
				.status(500)
				.json({ success: false, message: 'Internal Server Error' })
		}
	}

	// [POST] /auth/test
	test(
		req: IGetUserAuthInfoRequest<null>,
		res: Response,
		next: NextFunction
	) {
		// console.log(typeof req)
		res.send(req.userId)
		// res.send('ok')

		next()
		// (parameter) req: IGetUserAuthInfoRequest<IProduct>
	}
}
// Create Token
const generateTokens = (payload: IUser): IGenerateTokens => {
	const { _id, role }: IUser = payload
	const accessToken: string = sign(
		{ _id, role },
		process.env.ACCESS_TOKEN as Secret,
		{ expiresIn: '10m' }
	)
	// Refresh token
	const refreshToken: string = sign(
		{ _id, role },
		process.env.REFRESH_TOKEN as Secret,
		{ expiresIn: '1h' }
	)
	return { accessToken, refreshToken }
}

export default new AuthController()
