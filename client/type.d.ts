import { IResponse, IResponseProduct } from './type.d'
import { Document } from 'mongoose'
import { Payer } from '@paypal/paypal-js/types/apis/orders'
import { ReactNode } from 'react'

export interface ContextStateProps {
	children: ReactNode
}
export interface IProduct extends Document {
	product_id: string
	title: string
	price: number
	description: string
	image: IResponseFile
	category: string
	sold: number
	checked: boolean
	content: string
}

export interface ICart {
	quantity: number
	product_id: string[]
}
export interface IResProduct {
	result: number
	products: IProduct[]
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

export interface IFile {
	path: string
	name: string
	size: number
	type: string
}

export interface IResponseFile {
	url: string
	public_id: string
}

export interface IUpLoadProduct {
	product_id: string
	title: string
	price: number
	description: string
	content: string
	category: string
	image: IResponseFile
}
export interface IPayLoad<T> {
	result: number
	products: T
}
