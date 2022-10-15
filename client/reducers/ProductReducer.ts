import { ProductActionType } from '../constants'
import { IPayLoad, IProduct, IProductQty } from '../type'

const { GET_PRODUCTS } = ProductActionType

type ProductAction = {
	type: typeof GET_PRODUCTS
	payload:  IPayLoad<IProduct[]>
}

export interface IProductPayload {
	products: IProductQty[]
	isAddCart: boolean
}

export const productReducer = (
	state: IPayLoad<IProduct[]>,
	action: ProductAction
) => {
	switch (action.type) {
		case GET_PRODUCTS:
			return action.payload

		default:
			return state
	}
}
