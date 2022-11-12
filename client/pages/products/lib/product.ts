import { getProductByIdAPI, getProductsInfoAPI } from '../../../api/ProductAPI'
import { IPayLoad, IProduct } from '../../../type'

/**
 * Get Product Ids
 * @param limit number
 * @returns Promise<{
    params: {
        id: string;
    };
}[]>
 */
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

/**
 * Get Product By Id
 * @param id Id Product
 * @returns Promise<IProduct | undefined>
 */
// Trả về 1 value 1 slug cụ thể
export const getProductById = async (id: string) => {
	try {
		const product: IProduct = (await getProductByIdAPI(
			id
		)) as unknown as IProduct

		return product
	} catch (error) {
		return {
			success: false,
			message: error,
		}
	}
}
