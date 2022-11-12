import { Request, Response } from 'express'
import User, { IUser } from '../modules/User'
import { hash, verify } from 'argon2'
import jwt, { Secret, sign } from 'jsonwebtoken'
import { IGenerateTokens, IGetUserAuthInfoRequest } from '../type'

/**
 * Auth Controller
 */
class AuthController {
	// [GET] /auth
	async loadUser(
		req: IGetUserAuthInfoRequest<IGenerateTokens>,
		res: Response
	) {
		try {
			const user = await User.findById(req.userId).select('-password')
			if (!user)
				return res.status(400).json({
					success: false,
					message: process.env.MSG_USER_NOT_FOUND,
				})
			return res.status(200).json({ success: true, payload: user })
		} catch (error) {
			return res
				.status(500)
				.json({
					success: false,
					message: process.env.MSG_INTERNAL_SERVER_ERROR,
				})
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

		if (!username || !password)
			return res.status(400).json({
				success: false,
				message: process.env.MSG_MISS_USER_OR_PASS,
			})

		try {
			// Check for existing user
			const user: IUser | null = await User.findOne({ username })
			if (user)
				return res.status(400).json({
					success: false,
					message: process.env.MSG_USER_EXISTS,
				})

			// Check for existing phone
			const phone1: IUser | null = await User.findOne({ phone })
			if (phone1)
				return res.status(400).json({
					success: false,
					message: process.env.MSG_PHONE_EXISTS,
				})

			// Check for existing email
			const email1: IUser | null = await User.findOne({ email })
			if (email1)
				return res.status(400).json({
					success: false,
					message: process.env.MSG_EMAIL_EXISTS,
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
			return res.status(200).json({
				success: true,
				message: process.env.MSG_REGISTER_SUCCESS,
			})
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: process.env.MSG_INTERNAL_SERVER_ERROR,
			})
		}
	}

	// [POST] /auth/login
	async login(req: Request, res: Response) {
		const { username, password }: IUser = req.body

		if (!username || !password)
			return res.status(400).json({
				success: false,
				message: process.env.MSG_MISS_USER_OR_PASS,
				tokens: null,
			})

		try {
			// Check for existing user
			const user: IUser | null = await User.findOne({ username })
			if (!user)
				return res.status(400).json({
					success: false,
					message: process.env.MSG_INCORRECT_USER_PASS,
					tokens: null,
				})

			// Username found
			const passwordValid = await verify(user.password, password)
			if (!passwordValid)
				return res.status(400).json({
					success: false,
					message: process.env.MSG_INCORRECT_USER_PASS,
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
				message: process.env.MSG_LOGIN_SUCCESS,
				tokens,
			})
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: process.env.MSG_INTERNAL_SERVER_ERROR,
				tokens: null,
			})
		}
	}

	// [POST] /auth/token
	async token(req: IGetUserAuthInfoRequest<IGenerateTokens>, res: Response) {
		const userId: string = req.userId

		try {
			const user: IUser | null = await User.findOne({ _id: userId })

			// Check token
			if (!user)
				return res.status(403).json({
					success: false,
					message: process.env.MSG_REFRESH_TOKEN_NOT_FOUND,
				})

			// Get refreshToken form db
			const refreshToken: string = user.refreshToken

			// Verify token
			jwt.verify(refreshToken, process.env.REFRESH_TOKEN as Secret)
			// Create new token, newRefreshToken
			const newTokens: IGenerateTokens = generateTokens(user)

			// Update refreshToken
			await User.updateOne(
				{ _id: user._id },
				{ refreshToken: newTokens.refreshToken }
			)
			return res.status(200).json({
				success: true,
				message: process.env.MSG_REFRESH_TOKEN_SUCCESS,
				tokens: newTokens,
			})
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: process.env.MSG_INTERNAL_SERVER_ERROR,
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
				message: process.env.MSG_LOGGED_SUCCESS,
			})
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: process.env.MSG_INTERNAL_SERVER_ERROR,
			})
		}
	}
}
// Create Token
const generateTokens = (payload: IUser): IGenerateTokens => {
	const { _id, role }: IUser = payload
	const accessToken: string = sign(
		{ _id, role },
		process.env.ACCESS_TOKEN as Secret,
		{ expiresIn: process.env.TIME_TOKEN as string }
	)
	// Refresh token
	const refreshToken: string = sign(
		{ _id, role },
		process.env.REFRESH_TOKEN as Secret,
		{ expiresIn: process.env.TIME_REFRESH_TOKEN as string }
	)
	return { accessToken, refreshToken }
}

export default new AuthController()
