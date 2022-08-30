import axios from 'axios'
import { useState } from 'react'
import { apiUrl } from '../../constants'
import { IProduct, IResponse } from '../../type'

export interface IProductApi {
	products: [products: IProduct[], setProducts: (product: IProduct[]) => void]
	getProducts: () => Promise<IProduct | undefined>
}

const ProductAPI = (): IProductApi => {
	const [products, setProducts] = useState<IProduct[]>([])
	const getProducts = async (): Promise<IProduct | undefined> => {
		try {
			const response: IResponse<IProduct> = await axios.get(
				`${apiUrl}/product`
			)
			if (response.data.success) {
				console.log(response)
			}
			return response.data.products
		} catch (error) {
			console.log(error)
			return
		}
	}
	// useEffect(() => {
	// 	getProducts()
	// }, [])

	return { products: [products, setProducts], getProducts }
}

export const getProductsInfo = async (): Promise<IProduct | undefined> => {
	try {
		const response: IResponse<IProduct> = await axios.get(
			`${apiUrl}/product`
		)
		if (response.data.success) {
			
			return response.data.products
		}
	} catch (error) {
		console.log(error)
		return
	}
}

export default ProductAPI
