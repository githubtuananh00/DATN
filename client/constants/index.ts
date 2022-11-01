const apiUrl: string = 'http://localhost:5000'
export enum ProductActionType {
	GET_PRODUCTS = 'GET_PRODUCTS',
	SET_ADD_CART = 'SET_ADD_CART',
}
export { apiUrl }

export enum AuthActionType {
	LOGIN_USER = 'LOGIN_USER',
	SET_AUTH = 'SET_AUTH',
}

export const paypalClient: string =
	'Af2xI8Ot8JxdczngtBqQkiHOAMU36G2tbHbN_Yg1xuCes5gXJ-bWK3eL11385Lw7hD4DbMovGrtjqqDj'

export const LOCAL_STORAGE_TOKEN_NAME = 'shopDGD'
