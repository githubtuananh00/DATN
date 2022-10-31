import { Request, Response } from 'express'

import Product, { IProduct } from '../modules/ProductModule'
import { IGetUserAuthInfoRequest, Sort } from '../type'

class ProductController {
	// [GET] /product
	async getProducts(req: Request<{}, {}, {}, Sort>, res: Response) {
		try {
			// Filtering
			const queryObj = { ...req.query }
			const excludedFields: string[] = ['page', 'sort', 'limit']
			excludedFields.forEach((el) => delete queryObj[el])

			let queryStr: string = JSON.stringify(queryObj) // Convert obj to string
			queryStr = queryStr.replace(
				/\b(gte|gt|lt|lte|regex)\b/g,
				(match) => '$' + match
			)
			// gte = greater than equals
			// lte = least than equals
			// lt = least equals
			// gt = greater equals

			let products: IProduct[] = []

			// Paginating
			const page: number = parseInt(req.query.page as string) * 1 || 1
			const limit: number = parseInt(req.query.limit as any) * 1 || 9
			const skip: number = (page - 1) * limit

			// Sorting
			if (req.query.sort) {
				const sortBy: string = req.query.sort.split(',').join(' ')
				products = await Product.find(JSON.parse(queryStr))
					.sort(sortBy)
					.skip(skip)
					.limit(limit)
			} else {
				products = await Product.find(JSON.parse(queryStr))
					.sort('-createdAt')
					.skip(skip)
					.limit(limit)
			}
			return res.status(200).json({
				success: true,
				payload: { result: products.length, products },
			})
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}
	// [GET] /product/detail/:id
	async getProductId(req: IGetUserAuthInfoRequest<IProduct>, res: Response) {
		try {
			const product: IProduct | null = await Product.findOne({
				_id: req.params.id,
			})
			return res.status(200).json({ success: true, payload: product })
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}

	// [POST] /product/createProduct
	async createProduct(req: IGetUserAuthInfoRequest<IProduct>, res: Response) {
		const {
			product_id,
			title,
			price,
			description,
			content,
			image,
			category,
		}: IProduct = req.body
		if (!image)
			return res
				.status(400)
				.json({ success: false, message: 'No image upload' })
		try {
			const product: IProduct | null = await Product.findOne({
				product_id,
			})
			if (product)
				return res.status(400).json({
					success: false,
					message: 'This product already exists',
				})

			const newProduct: IProduct = new Product({
				product_id,
				title: title.toLowerCase(),
				price,
				description,
				content,
				image,
				category,
			})
			await newProduct.save()
			return res.json({
				success: true,
				message: 'Create a Product successfully',
			})
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}

	// [DELETE] /product/:id/delete
	deleteProduct(req: IGetUserAuthInfoRequest<null>, res: Response) {
		Product.deleteOne({ _id: req.params.id })
			.then(() =>
				res.json({
					success: true,
					message: 'Delete a Product successfully',
				})
			)
			.catch((err) =>
				res.status(500).json({ success: false, message: err.message })
			)
	}
	// [PUT] /product/:id/update
	updateProduct(req: IGetUserAuthInfoRequest<IProduct>, res: Response) {
		const { image, title }: IProduct = req.body
		if (!image)
			return res
				.status(400)
				.json({ success: false, message: 'No image upload' })
		Product.updateOne(
			{ _id: req.params.id },
			{ ...req.body, title: title.toLowerCase() }
		)
			.then(() =>
				res.json({
					success: true,
					message: 'Update a Product successfully',
				})
			)
			.catch((err) =>
				res.status(500).json({ success: false, message: err.message })
			)
	}
}

export default new ProductController()
