import { Response } from 'express'
import Category, { ICategory } from '../modules/CategoryModule'
import { IGetUserAuthInfoRequest } from '../type'

/**
 * Category Controller
 */
class CategoryController {
	// [GET] /category
	getCategories(req: IGetUserAuthInfoRequest<null>, res: Response) {
		req.off
		Category.find({})
			.then((category) =>
				res.status(200).json({ success: true, payload: category })
			)
			.catch((err) =>
				res.status(500).json({ success: false, err: err.message })
			)
	}

	// [GET] /category/:id
	getCategoryById(req: IGetUserAuthInfoRequest<null>, res: Response) {
		Category.findById(req.params.id)
			.then((category) =>
				res.status(200).json({
					success: true,
					payload: category,
				})
			)
			.catch((error) =>
				res.status(500).json({ success: false, err: error.message })
			)
	}

	// [POST] /category/createCategory
	async createCategory(
		req: IGetUserAuthInfoRequest<ICategory>,
		res: Response
	) {
		const { nameCategory }: ICategory = req.body
		try {
			const category: ICategory | null = await Category.findOne({
				nameCategory,
			})
			if (category)
				return res.status(400).json({
					success: false,
					message: process.env.MSG_CATEGORY_EXISTS,
				})

			const newCategory: ICategory = new Category({ nameCategory })
			await newCategory.save()
			return res.status(200).json({
				success: true,
				message: process.env.MSG_CREATE_CATEGORY_SUCCESS,
			})
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: process.env.MSG_INTERNAL_SERVER_ERROR,
			})
		}
	}

	// [DELETE] /category/:id/delete
	deleteCategory(req: IGetUserAuthInfoRequest<null>, res: Response) {
		Category.deleteOne({ _id: req.params.id })
			.then(() =>
				res.status(200).json({
					success: true,
					message: process.env.MSG_DELETE_CATEGORY_SUCCESS,
				})
			)
			.catch((err) =>
				res.status(500).json({ success: false, message: err.message })
			)
	}

	// [PUT] /category/:id/update
	updateCategory(req: IGetUserAuthInfoRequest<ICategory>, res: Response) {
		Category.updateOne({ _id: req.params.id }, req.body)
			.then(() =>
				res.status(200).json({
					success: true,
					message: process.env.MSG_UPDATE_CATEGORY_SUCCESS,
				})
			)
			.catch((err) =>
				res.status(500).json({ success: false, message: err.message })
			)
	}
}

export default new CategoryController()
