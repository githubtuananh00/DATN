import { ProductActionType } from '../constants'
import { IPayLoad, IProduct, IProductQty } from '../type'

const { GET_PRODUCTS } = ProductActionType

type ProductAction = {
	type: typeof GET_PRODUCTS
	payload: IPayLoad<IProduct[]>
}

export interface IProductPayload {
	products: IProductQty[]
	isAddCart: boolean
}

/**
 * Product Reducer
 * @param state IPayLoad<IProduct[]>
 * @param action ProductAction
 * @returns IPayLoad<IProduct[]>
 */
export const productReducer = (
	state: IPayLoad<IProduct[]>,
	action: ProductAction
): IPayLoad<IProduct[]> => {
	switch (action.type) {
		case GET_PRODUCTS:
			return action.payload
		default:
			return state
	}
}
