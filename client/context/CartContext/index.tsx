import { createContext, useState } from 'react'
import { addCartAPI, getCarts } from '../../api/CartAPI'
import { ContextStateProps, IProductQty } from '../../type'

export interface ICartStateDefault {
	addCart: (product: IProductQty) => void
	cart: IProductQty[]
	logoutCart: () => void
	loginCart: () => void
	updateSetCart: (data: IProductQty[]) => void
}

const CartDefault: ICartStateDefault = {
	addCart: () => Promise.resolve(void 0),
	logoutCart: () => Promise.resolve(void 0),
	loginCart: () => Promise.resolve(void 0),
	cart: [],
	updateSetCart: () => {},
}
export const CartContext = createContext<ICartStateDefault>(CartDefault)
const CartContextProvider = ({ children }: ContextStateProps) => {
	const [cart, setCart] = useState<IProductQty[]>([])
	const addCart = async (product: IProductQty) => {
		const check = cart.every(
			(item) =>
				(item.product._id as string) !== (product.product._id as string)
		)

		if (check) {
			setCart([...cart, product])
			await addCartAPI([...cart, product])
		}
	}
	const logoutCart = () => {
		setCart([])
	}
	const loginCart = async () => {
		const carts: IProductQty[] =
			(await getCarts()) as unknown as IProductQty[]
		setCart(carts)
	}
	const updateSetCart = (data: IProductQty[]) => setCart(data)

	const context: ICartStateDefault = {
		cart,
		addCart,
		logoutCart,
		loginCart,
		updateSetCart,
	}
	return (
		<CartContext.Provider value={context}>{children}</CartContext.Provider>
	)
}

export default CartContextProvider
