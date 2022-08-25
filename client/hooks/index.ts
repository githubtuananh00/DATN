import { useContext } from 'react'
import { AuthContext, AuthStateDefault } from '../context/AuthContext'
import { ProductState, ProductStateDefault } from '../context/ProductContext'

export const useProduct = (): ProductStateDefault => {
	return useContext(ProductState)
}

export const useAuth = (): AuthStateDefault => {
	return useContext(AuthContext)
}
