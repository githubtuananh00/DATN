import { Document } from 'mongoose'

export interface IProduct extends Document {
	// success: boolean
	// message: string

	product_id: string
	title: string
	price: number
	description: string
	image: { url: string }
	category: string
	sold: number
	checked: boolean
	content: string
}

export interface IResponse<T> {
	data: {
		success: boolean
		message: string
		products: T
		users: T
	}
}

export interface IRes<T> {
	data: {
		success: boolean
		message: string
		product: T | null
		user: T | null
		tokens: T | null
	}
}

export interface IResponseToken {
	message: {
		response: IRes<IToken>
	}
}

export interface IUserLogin {
	username: string
	password: string
}
export interface IToken {
	accessToken: string
	refreshToken: string
}

export interface IUser extends IUserLogin {
	name: string
	email: string
	phone: string
	address: string
	gt: string
	dateOfBirth: string
	role: string
	refreshToken: string | null
}
export interface IResponseRegister {
	message: string
	success: boolean
}
export interface IResponseRefreshToken extends IResponseRegister {
	tokens: IToken | null
}

// export interface IUserRegister extends IUser {
// 	confirmPassword: string
// }

// export interface IResponseUser<T> {
// 	data: {
// 		success: boolean
// 		message: string
// 		users: T
// 	}
// }
