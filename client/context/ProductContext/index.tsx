import { createContext, useEffect, useReducer, useState } from 'react'
import { ContextStateProps, IPayLoad, IProduct, IResProduct } from '../../type'
import { ProductActionType } from '../../constants'
import { productReducer } from '../../reducers/ProductReducer'
import { getProductsInfoAPI } from '../../api/ProductAPI'

const { GET_PRODUCTS } = ProductActionType

export interface ProductStateDefault {
	token: boolean
	setToken: (action: boolean) => void
	productsHandle: IPayLoad<IProduct[]>
	getProducts: () => Promise<void>
	reloadProduct: () => void
	reload: boolean
	updateProducts: (data: IPayLoad<IProduct[]>) => void
	updateProduct: (data: IPayLoad<IProduct>) => void
	category: string
	updateCategory: (data: string) => void
	sort: string
	updateSort: (data: string) => void
	search: string
	updateSearch: (data: string) => void
	page: number
	updatePage: (data: number) => void
	result: number
	updateResult: (data: number) => void
}

const ProductDefault: ProductStateDefault = {
	token: false,
	setToken: () => null,
	productsHandle: { result: 0, products: [] },
	getProducts: () => Promise.resolve(void 0),
	reloadProduct: () => {},
	reload: false,
	updateProducts: () => {},
	updateProduct: () => {},
	category: '',
	updateCategory: () => {},
	sort: '',
	updateSort: () => {},
	search: '',
	updateSearch: () => {},
	page: 1,
	updatePage: () => {},
	result: 0,
	updateResult: () => {},
}

export const ProductContext = createContext<ProductStateDefault>(ProductDefault)

const productDefault: IPayLoad<IProduct[]> = {
	result: 0,
	products: [],
}

const ProductContextProvider = ({ children }: ContextStateProps) => {
	// Token
	const [token, setToken] = useState<boolean>(false)

	// ProductAPI()
	// Reducer Product
	const [products, dispatch] = useReducer(productReducer, productDefault)

	const [reload1, setReload1] = useState<boolean>(false)

	const [productsHandle, setProductsHandle] =
		useState<IPayLoad<IProduct[]>>(products)
	// Category
	const [category, setCategory] = useState<string>('')
	const updateCategory = (category: string) => setCategory(category)
	// Sort
	const [sort, setSort] = useState<string>('')
	const updateSort = (sort: string) => setSort(sort)
	// Search
	const [search, setSearch] = useState<string>('')
	const updateSearch = (search: string) => setSearch(search)
	// Page
	const [page, setPage] = useState<number>(1)
	const updatePage = (page: number) => setPage(page)
	// Result
	const [result, setResult] = useState<number>(0)
	const updateResult = (result: number) => setResult(result)

	useEffect(() => {
		setProductsHandle(products)
	}, [products, reload1])
	const updateProducts = (data: IPayLoad<IProduct[]>) =>
		setProductsHandle(data)
	const updateProduct = (data: IPayLoad<IProduct>) => {
		products.products.map((product: IProduct) =>
			product._id === data.products._id
				? setProductsHandle({
						...data,
						products: [...products.products, data.products],
				  })
				: setProductsHandle(products)
		)
		setReload1(!reload1)
	}

	// Reload Product
	const [reload, setReload] = useState<boolean>(false)
	const reloadProduct = () => setReload(!reload)

	const getProducts = async () => {
		try {
			const response: IResProduct = (await getProductsInfoAPI(
				page,
				category,
				sort,
				search
			)) as unknown as IResProduct

			dispatch({
				type: GET_PRODUCTS,
				payload: {
					result: response.result,
					products: response.products,
				},
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
		category,
		updateCategory,
		sort,
		updateSort,
		search,
		updateSearch,
		page,
		updatePage,
		result,
		updateResult,
	}
	return (
		<ProductContext.Provider value={context}>
			{children}
		</ProductContext.Provider>
	)
}

export default ProductContextProvider
