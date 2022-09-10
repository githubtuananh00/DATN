import axios from 'axios'
import { apiUrl } from '../../../constants'
import { IProduct, IResponse, IResponseProduct } from '../../../type'
// import { IProduct, IResponseProduct, IResProduct } from '../../../type'

export const getProductIds = async (limit: number) => {
	const response: IResponse<IProduct[]> = await axios.get(`${apiUrl}/product`)
	const products: IProduct[] = response.data.products!
	limit = products.length < limit ? products.length : limit
	return products.slice(0, limit).map((product: IProduct) => ({
		params: {
			id: `${product._id}`,
		},
	}))
}

// Trả về 1 value 1 slug cụ thể
export const getProductById = async (
	id: string
): Promise<
	| {
			success: boolean
			message: string
			product: IProduct
	  }
	| undefined
> => {
	try {
		const product: IResponseProduct<IProduct> = await axios.get(
			`${apiUrl}/product/detail/${id}`
		)
		return product.data
	} catch (error) {
		console.log(error)
		return
	}
}
