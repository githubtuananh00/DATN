import { Response } from 'express'
import Cart, { ICart } from '../modules/CartModule'
import Product, { IProduct } from '../modules/ProductModule'
import User, { IUser } from '../modules/User'
import { IGetUserAuthInfoRequest } from '../type'

class CartController {
	// GET /cart
	getCarts(req: IGetUserAuthInfoRequest<null>, res: Response) {
		req.off
		Cart.find({})
			.then((cart) =>
				res.status(200).json({
					success: true,
					cart,
				})
			)
			.catch((err) =>
				res.status(500).json({ success: false, err: err.message })
			)
	}

	// POST /cart/addCart
	async addCart(req: IGetUserAuthInfoRequest<ICart>, res: Response) {
		const { product_id }: ICart = req.body
		try {
			const product: IProduct[] = await Product.find({
				product_id,
			})
			const user: IUser | null = await User.findById(req.userId)
			console.log({ user, id: req.userId })

			if (product.length === 0)
				return res
					.status(400)
					.json({ success: false, message: 'Product not found' })
			if (!user) {
				return res.status(400).json({
					success: false,
					message: 'Please login before purchasing',
				})
			}
			const newCart: ICart = new Cart({ ...req.body, user_id: user._id })
			await newCart.save()
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
