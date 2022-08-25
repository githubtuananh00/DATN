import { ReactNode } from 'react'

const apiUrl: string = 'http://localhost:5000'
export enum ProductActionType {
	GET_PRODUCTS = 'GET_PRODUCTS',
}
export { apiUrl }

export interface ContextStateProps {
	children: ReactNode
}

export enum AuthActionType {
	LOGIN_USER = 'LOGIN_USER',
	SET_AUTH = 'SET_AUTH',
}

export const LOCAL_STORAGE_TOKEN_NAME = 'shopDGD'

