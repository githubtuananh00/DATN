import { ParsedQs } from 'qs'
import { NextFunction, Response, Request } from 'express'

// userReq
export interface IGetUserAuthInfoRequest<T> extends Request {
	userId: string
	userRole: boolean
	body: T
	params: {
		id: string
	}
}

export interface Sort extends ParsedQs {
	sort: string
	limit: number
}

// IGenerateTokens
export interface IGenerateTokens {
	accessToken: string
	refreshToken: string
}

export interface IApi<T> {
	req: IGetUserAuthInfoRequest<T>
	res: Response
	next: NextFunction
}

export interface IProductQty<T> {
	quantity: number
	product: T
}
