import { useContext } from 'react'
import { AuthContext, AuthStateDefault } from '../context/AuthContext'
import { CartContext, ICartStateDefault } from '../context/CartContext'
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
