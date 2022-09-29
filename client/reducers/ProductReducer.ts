import { ProductActionType } from '../constants'
import { IProduct, IProductQty } from '../type'

const { GET_PRODUCTS } = ProductActionType

type ProductAction = {
	type: typeof GET_PRODUCTS
	payload: IProduct[]
}

export interface IProductPayload {
	products: IProductQty[]
	isAddCart: boolean
}

export const productReducer = (state: IProduct[], action: ProductAction) => {
	switch (action.type) {
		case GET_PRODUCTS:
			return action.payload

		default:
			return state
	}
}
