// API connect backend
export const apiUrl: string = 'http://localhost:5000'
// Type useReducer
export enum ProductActionType {
	GET_PRODUCTS = 'GET_PRODUCTS',
	SET_ADD_CART = 'SET_ADD_CART',
}

// Type user login
export enum AuthActionType {
	LOGIN_USER = 'LOGIN_USER',
	SET_AUTH = 'SET_AUTH',
}

// PaypalClient
export const paypalClient: string =
	'Af2xI8Ot8JxdczngtBqQkiHOAMU36G2tbHbN_Yg1xuCes5gXJ-bWK3eL11385Lw7hD4DbMovGrtjqqDj'

// Local storage token name
export const LOCAL_STORAGE_TOKEN_NAME: string = 'shopDGD'

// File path img import cloudinary
export enum FILE_PATH {
	FILE_IMG_PATH = 'D:\\BaiTap\\DATN\\DoAn\\img',
	FILE_IMG_FAKE = 'C:\\fakepath',
}
