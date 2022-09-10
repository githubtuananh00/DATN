import { Response } from 'express'
import Cart, { ICart } from '../modules/CartModule'
import { IProduct } from '../modules/ProductModule'
import User, { IUser } from '../modules/User'
import { IGetUserAuthInfoRequest, IProductQty } from '../type'

class CartController {
	// GET /cart
	getCarts(req: IGetUserAuthInfoRequest<null>, res: Response) {
		req.off
		User.findById(req.userId)
			.then((user: IUser | null) =>
				res.status(200).json({
					success: true,
					payload: user!.cart,
					message: 'Get all cart successfully',
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

			if (!req.body)
				return res
					.status(400)
					.json({ success: false, message: 'Product not found' })
			if (!user) {
				return res.status(400).json({
					success: false,
					message: 'Please login before purchasing',
				})
			}

			await user.updateOne({
				cart: req.body,
			})
			return res
				.status(200)
				.json({ success: true, message: 'added to cart successfully' })
		} catch (error) {
			console.log(error)
			res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			})
		}
	}

	// [PUT] /cart/:id/update
	updateCart(req: IGetUserAuthInfoRequest<ICart>, res: Response) {
		Cart.updateOne({ _id: req.params.id }, req.body)
			.then(() =>
				res.json({
					success: true,
					message: 'Update a Cart successfully',
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
				res.json({
					success: true,
					message: 'Delete a Cart successfully',
				})
			)
			.catch((err) =>
				res.status(500).json({ success: false, message: err.message })
			)
	}
}

export default new CartController()
