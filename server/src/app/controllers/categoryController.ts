import { Response } from 'express'
import Category, { ICategory } from '../modules/CategoryModule'
import { IGetUserAuthInfoRequest } from '../type'

class CategoryController {
	// [GET] /category
	getCategories(req: IGetUserAuthInfoRequest<null>, res: Response) {
		req.off
		Category.find({})
			.then((category) =>
				res.status(200).json({ success: true, category })
			)
			.catch((err) =>
				res.status(500).json({ success: false, err: err.message })
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
					message: 'This category already exists',
				})

			const newCategory: ICategory = new Category({ nameCategory })
			await newCategory.save()
			res.json({ success: true, message: 'Create a Category' })
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}

	// [DELETE] /category/:id/delete
	deleteCategory(req: IGetUserAuthInfoRequest<null>, res: Response) {
		Category.deleteOne({ _id: req.params.id })
			.then(() =>
				res.json({ success: true, message: 'Delete a category' })
			)
			.catch((err) =>
				res.status(500).json({ success: false, message: err.message })
			)
	}

	// [PUT] /category/:id/update
	updateCategory(req: IGetUserAuthInfoRequest<ICategory>, res: Response) {
		Category.updateOne({ _id: req.params.id }, req.body)
			.then(() =>
				res.json({ success: true, message: 'Update a Category' })
			)
			.catch((err) =>
				res.status(500).json({ success: false, message: err.message })
			)
	}
}

export default new CategoryController()
