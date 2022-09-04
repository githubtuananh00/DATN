import Payments, { IPayPal } from '../modules/paypalModule'
import Product, { IProduct } from '../modules/ProductModule'
import { IGetUserAuthInfoRequest, IProductQty } from '../type'
import { Response } from 'express'
import User, { IUser } from '../modules/User'

class PayPalController {
	// [GET] /payment
	getPayments(req: IGetUserAuthInfoRequest<null>, res: Response) {
		req.off
		Payments.find({})
			.then((payments) =>
				res.status(200).json({
					success: true,
					message: 'Get all payments successfully',
					payments,
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
					message: 'Cannot find user',
				})
			const { _id, name, email } = user
			const newPayment = new Payments({
				...req.body,
				user_id: _id,
				name,
				email,
			})
			const { cart } = req.body
			const cartArr: IProductQty<IProduct>[] =
				cart as unknown as IProductQty<IProduct>[]
			cartArr.map((item) =>
				updateSoldProduct(
					item.product._id as string,
					item.quantity,
					item.product.sold
				)
			)
			await newPayment.save()
			return res.status(200).json({
				success: true,
				message: 'Created payment successfully',
				payment: newPayment,
			})
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}
}
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
