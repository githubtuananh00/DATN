import { useContext } from 'react'
import { AuthContext, AuthStateDefault } from '../context/AuthContext'
import { CartContext, ICartStateDefault } from '../context/CartContext'
import {
	CategoryContext,
	ICategoryStateDefault,
} from '../context/CategoryContext'
import { IPaymentStateDefault, PaymentContext } from '../context/PaymentContext'
import { ProductContext, ProductStateDefault } from '../context/ProductContext'

export const useProduct = (): ProductStateDefault => {
	return useContext(ProductContext)
}

export const useAuth = (): AuthStateDefault => {
	return useContext(AuthContext)
}
export const useCart = (): ICartStateDefault => {
	return useContext(CartContext)
}

export const usePayment = (): IPaymentStateDefault => {
	return useContext(PaymentContext)
}
export const useCategory = (): ICategoryStateDefault => {
	return useContext(CategoryContext)
}
