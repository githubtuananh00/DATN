import { createContext, useReducer, useState } from 'react'
import { getProductsInfo } from '../../pages/api/ProductAPI'
import { IProduct, IProductQty } from '../../type'
import { ContextStateProps, ProductActionType } from '../../constants'
import { productReducer } from '../../reducers/ProductReducer'

const { GET_PRODUCTS } = ProductActionType

export interface ProductStateDefault {
	token: boolean
	setToken: (action: boolean) => void
	addCart: (product: IProductQty) => void
	products: IProduct[]

	getProducts: () => Promise<void>
	cart: IProductQty[]
}
// console.log(ProductAPI())

const ProductDefault: ProductStateDefault = {
	token: false,
	setToken: () => null,
	products: [],
	getProducts: () => Promise.resolve(void 0),
	addCart: () => Promise.resolve(void 0),
	cart: [],
}

export const ProductState = createContext<ProductStateDefault>(ProductDefault)

// const productDefault: IProductSate = {
// 	products: [],
// 	isAddCart: false,
// }
const productDefault: IProduct[] = []

const DataProvider = ({ children }: ContextStateProps) => {
	// Token
	const [token, setToken] = useState<boolean>(false)

	// ProductAPI()
	// Reducer Product
	const [products, dispatch] = useReducer(productReducer, productDefault)

	const [cart, setCart] = useState<IProductQty[]>([])

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

	const addCart = async (product: IProductQty) => {
		const check = cart.every(
			(item) =>
				(item.product._id as string) !== (product.product._id as string)
		)
		// Mai lam nha
		if (check) {
			setCart([...cart, product])
			// dispatch({
			// 	type: SET_ADD_CART,
			// 	payload: {

			// 	}
			// })
		}
	}

	const context: ProductStateDefault = {
		token,
		setToken,
		products,
		getProducts,
		cart,
		addCart,
	}
	return (
		<ProductState.Provider value={context}>
			{children}
		</ProductState.Provider>
	)
}

export default DataProvider
