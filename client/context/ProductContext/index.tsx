import { createContext, useEffect, useReducer, useState } from 'react'
import { IProduct } from '../../type'
import { ContextStateProps, ProductActionType } from '../../constants'
import { productReducer } from '../../reducers/ProductReducer'
import { getProductsInfoAPI } from '../../pages/api/ProductAPI'

const { GET_PRODUCTS } = ProductActionType

export interface ProductStateDefault {
	token: boolean
	setToken: (action: boolean) => void
	productsHandle: IProduct[]
	getProducts: () => Promise<void>
	reloadProduct: () => void
	reload: boolean
	updateProducts: (data: IProduct[]) => void
	updateProduct: (data: IProduct) => void
}

const ProductDefault: ProductStateDefault = {
	token: false,
	setToken: () => null,
	productsHandle: [],
	getProducts: () => Promise.resolve(void 0),
	reloadProduct: () => {},
	reload: false,
	updateProducts: () => {},
	updateProduct: () => {},
}

export const ProductContext = createContext<ProductStateDefault>(ProductDefault)

const productDefault: IProduct[] = []

const ProductContextProvider = ({ children }: ContextStateProps) => {
	// Token
	const [token, setToken] = useState<boolean>(false)

	// ProductAPI()
	// Reducer Product
	const [products, dispatch] = useReducer(productReducer, productDefault)

	const [reload1, setReload1] = useState<boolean>(false)

	const [productsHandle, setProductsHandle] = useState<IProduct[]>(products)
	useEffect(() => {
		setProductsHandle(products)
	}, [products, reload1])
	const updateProducts = (data: IProduct[]) => setProductsHandle(data)
	const updateProduct = (data: IProduct) => {
		products.map((product: IProduct) =>
			product._id === data._id
				? setProductsHandle([...products, data])
				: setProductsHandle(products)
		)
		setReload1(!reload1)
	}

	// Reload Product
	const [reload, setReload] = useState<boolean>(false)
	const reloadProduct = () => setReload(!reload)

	const getProducts = async () => {
		try {
			const products: IProduct[] =
				(await getProductsInfoAPI()) as unknown as IProduct[]

			dispatch({
				type: GET_PRODUCTS,
				payload: products,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const context: ProductStateDefault = {
		token,
		setToken,
		productsHandle,
		getProducts,
		reloadProduct,
		reload,
		updateProducts,
		updateProduct,
	}
	return (
		<ProductContext.Provider value={context}>
			{children}
		</ProductContext.Provider>
	)
}

export default ProductContextProvider
