import { Response } from 'express'
import Cart, { ICart } from '../modules/CartModule'
import { IProduct } from '../modules/ProductModule'
import User, { IUser } from '../modules/User'
import { IGetUserAuthInfoRequest, IProductQty } from '../type'

/**
 * Cart Controller
 */
class CartController {
	// GET /cart
	getCarts(req: IGetUserAuthInfoRequest<null>, res: Response) {
		req.off
		User.findById(req.userId)
			.then((user: IUser | null) =>
				res.status(200).json({
					success: true,
					payload: user!.cart,
					message: process.env.MSG_GET_ALL_CART_SUCCESS,
				})
			)
			.catch((err) =>
				res.status(500).json({ success: false, err: err.message })
			)
	}

	// PATCH /cart/addCart
	async addCart(
		req: IGetUserAuthInfoRequest<IProductQty<IProduct>>,
		res: Response
	) {
		try {
			const user: IUser | null = await User.findById(req.userId)

			// if can't find request body return 400
			if (!req.body)
				return res.status(400).json({
					success: false,
					message: process.env.MSG_PRODUCT_NOT_FOUND,
				})
			// If can't find user return 400
			if (!user) {
				return res.status(400).json({
					success: false,
					message: process.env.MSG_LOGIN_BEFORE_PURCHASING,
				})
			}

			// Update user
			await user.updateOne({
				cart: req.body,
			})

			// Return HTTP status
			return res.status(200).json({
				success: true,
				message: process.env.MSG_ADD_CART_SUCCESS,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: process.env.MSG_INTERNAL_SERVER_ERROR,
			})
		}
	}

	// [PUT] /cart/:id/update
	updateCart(req: IGetUserAuthInfoRequest<ICart>, res: Response) {
		Cart.updateOne({ _id: req.params.id }, req.body)
			.then(() =>
				res.status(200).json({
					success: true,
					message: process.env.MSG_UPDATE_CART_SUCCESS,
				})
			)
			.catch((err) =>
				res.status(500).json({ success: false, message: err.message })
			)
	}

	// [DELETE] /cart/:id/delete
	deleteCart(req: IGetUserAuthInfoRequest<null>, res: Response) {
		Cart.deleteOne({ _id: req.params.id })
			.then(() =>
				res.status(200).json({
					success: true,
					message: process.env.MSG_DELETE_CART_SUCCESS,
				})
			)
			.catch((err) =>
				res.status(500).json({ success: false, message: err.message })
			)
	}
}

export default new CartController()
