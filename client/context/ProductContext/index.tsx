import { createContext, useReducer, useState } from 'react'
import { getProductsInfo } from '../../pages/api/ProductAPI'
import { IProduct } from '../../type'
import { ContextStateProps, ProductActionType } from '../../constants'
import { productReducer } from '../../reducers/ProductReducer'

const { GET_PRODUCTS } = ProductActionType

export interface ProductStateDefault {
	token: boolean
	setToken: (action: boolean) => void
	products: IProduct[]
	getProducts: () => Promise<void>
}
// console.log(ProductAPI())

const ProductDefault: ProductStateDefault = {
	token: false,
	setToken: () => null,
	products: [],
	getProducts: () => Promise.resolve(void 0),
}

export const ProductState = createContext<ProductStateDefault>(ProductDefault)

const productDefault: IProduct[] = []
const DataProvider = ({ children }: ContextStateProps) => {
	// Token
	const [token, setToken] = useState<boolean>(false)

	// ProductAPI()
	// Reducer Product
	const [products, dispatch] = useReducer(productReducer, productDefault)

	const getProducts = async () => {
		try {
			const products: IProduct[] =
				(await getProductsInfo()) as unknown as IProduct[]
			// console.log(products)

			dispatch({
				type: GET_PRODUCTS,
				payload: products,
			})
		} catch (error) {
			console.log(error)
		}
	}

	// getProductsInfo()
	// 	.then((products) => products as IProduct[])
	// 	.then((products) => console.log(products))

	const context: ProductStateDefault = {
		token,
		setToken,
		products,
		getProducts,
	}
	return (
		<ProductState.Provider value={context}>
			{children}
		</ProductState.Provider>
	)
}

export default DataProvider
