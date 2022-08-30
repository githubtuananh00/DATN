import { ProductActionType } from '../constants'
import { IProduct, IProductQty } from '../type'

const { GET_PRODUCTS } = ProductActionType

type ProductAction = {
	type: typeof GET_PRODUCTS
	payload: IProduct[]
}
// | {
// 		type: typeof SET_ADD_CART
// 		payload: IProductPayload
//   }

export interface IProductPayload {
	products: IProductQty[]
	isAddCart: boolean
}

export const productReducer = (state: IProduct[], action: ProductAction) => {
	switch (action.type) {
		case GET_PRODUCTS:
			return action.payload
		// case SET_ADD_CART:
		// 	return action.payload

		default:
			return state
	}
}
