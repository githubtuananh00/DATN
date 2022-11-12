import Payments, { ICart, IPayPal } from '../modules/paypalModule'
import Product from '../modules/ProductModule'
import { IGetUserAuthInfoRequest } from '../type'
import { Response } from 'express'
import User, { IUser } from '../modules/User'

/**
 * PayPal Controller
 */
class PayPalController {
	// [GET] /payment
	getPayments(req: IGetUserAuthInfoRequest<null>, res: Response) {
		req.off
		Payments.find({})
			.then((payments) =>
				res.status(200).json({
					success: true,
					message: process.env.MSG_GET_ALL_PAYPAL,
					payload: payments,
				})
			)
			.catch((err) =>
				res.status(500).json({ success: false, err: err.message })
			)
	}
	// [POST] /payment/createPayment
	async createPayment(req: IGetUserAuthInfoRequest<IPayPal>, res: Response) {
		try {
			const user: IUser | null = await User.findById(req.userId).select(
				'name email'
			)
			if (!user)
				return res.status(400).json({
					success: false,
					message: process.env.MSG_USER_NOT_FOUND,
				})
			const { _id, name, email } = user
			const newPayment = new Payments({
				...req.body,
				user_id: _id,
				name,
				email,
			})
			const { cart } = req.body
			const cartPayment: ICart[] = cart as ICart[]
			cartPayment.map((item) =>
				updateSoldProduct(
					item.product._id as string,
					item.quantity,
					item.product.sold
				)
			)

			await newPayment.save()
			return res.status(200).json({
				success: true,
				message: process.env.MSG_CREATE_PAYMENT_SUCCESS,
				payload: newPayment,
			})
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: process.env.MSG_INTERNAL_SERVER_ERROR,
			})
		}
	}
	// [GET] /payment/history
	history(req: IGetUserAuthInfoRequest<IPayPal>, res: Response) {
		Payments.find({ user_id: req.userId })
			.then((payments) =>
				res.status(200).json({
					success: true,
					message: process.env.MSG_GET_PAYMENT_HISTORY_SUCCESS,
					payload: payments,
				})
			)
			.catch((err) =>
				res.status(500).json({ success: false, err: err.message })
			)
	}
}

/**
 * UpdateSoldProduct
 * @param id Id Product
 * @param quantity Quantity Product
 * @param oldSold OldSold
 */
const updateSoldProduct = async (
	id: string,
	quantity: number,
	oldSold: number
) => {
	await Product.findOneAndUpdate(
		{ _id: id },
		{
			sold: quantity + oldSold,
		}
	)
}

export default new PayPalController()
