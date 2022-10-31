import { getProductByIdAPI, getProductsInfoAPI } from '../../../api/ProductAPI'
import { IPayLoad, IProduct } from '../../../type'

export const getProductIds = async (limit: number) => {
	const response: IPayLoad<IProduct[]> =
		(await getProductsInfoAPI()) as unknown as IPayLoad<IProduct[]>

	const products: IProduct[] = response.products
	limit = products.length < limit ? products.length : limit
	return products.slice(0, limit).map((product: IProduct) => ({
		params: {
			id: `${product._id}`,
		},
	}))
}

// Trả về 1 value 1 slug cụ thể
export const getProductById = async (id: string) => {
	try {
		const product: IProduct = (await getProductByIdAPI(
			id
		)) as unknown as IProduct

		return product
	} catch (error) {
		console.log(error)
		return
	}
}
