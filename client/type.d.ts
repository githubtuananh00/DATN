import { Document } from 'mongoose'
import { Payer } from '@paypal/paypal-js/types/apis/orders'

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

export interface ICart {
	quantity: number
	product_id: string[]
}

export interface IProductQty {
	quantity: number
	product: IProduct
}

export interface IResponse<T> {
	data: {
		success: boolean
		message: string
		payload: T
	}
}
export interface IResponseProduct<T> {
	data: {
		success: boolean
		message: string
		product: T
		users: T
	}
}

export interface IRes<T> {
	data: {
		success: boolean
		message: string
		product: T | null
		payload: T | null
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
	role: boolean
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

export interface IPayment {
	paymentID: string
	// address: {
	// 	address: {
	// 		country_code: string
	// 	}
	// 	email_address: string
	// 	name: {
	// 		given_name: string
	// 		surname: string
	// 	}
	// 	payer_id: string
	// }
	address: Partial<Payer>
	cart: Array<IProductQty>
	status: boolean
}
export interface IPaymentResponse extends IPayment, Document {
	user_id: string
	name: string
	email: string
	createdAt: string
}
export interface ICategory extends Document {
	nameCategory: string
}

export interface IReqCategory {
	nameCategory: string
}
