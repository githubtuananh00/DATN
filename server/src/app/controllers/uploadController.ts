import { Request, Response } from 'express'
import cloudinary, { UploadApiResponse } from 'cloudinary'
import fs from 'fs'
import { IFile, IGetUserAuthInfoRequest } from '../type'

class UploadController {
	// [POST] /upload
	uploadFile(req: IGetUserAuthInfoRequest<IFile>, res: Response) {
		try {
			if (!req.body)
				return res
					.status(400)
					.json({ success: false, message: 'No files were uploaded' })
			const file: IFile = req.body as IFile

			if (file.size > 1024 * 1024) {
				removeTmp(file.path)
				return res
					.status(400)
					.json({ success: false, message: 'Size too large' })
			}

			if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
				removeTmp(file.path)
				return res.status(400).json({
					success: false,
					message: 'File format is incorrect',
				})
			}

			cloudinary.v2.uploader.upload(
				file.path,
				{ folder: 'test' },
				async (err, result) => {
					if (err)
						return res.status(400).json({
							success: false,
							error: err.message,
						})
					removeTmp(file.path)
					return res.json({
						success: true,
						payload: {
							url: (result as UploadApiResponse).secure_url,
							public_id: (result as UploadApiResponse).public_id,
						},
					})
				}
			)
		} catch (error) {
			return res
				.status(500)
				.json({ success: false, message: error.message })
		}
	}

	// [POST] /delete
	deleteFile(req: Request, res: Response) {
		try {
			const { public_id }: UploadApiResponse = req.body
			if (!public_id)
				return res
					.status(400)
					.json({ status: false, message: 'No Image Selected' })
			cloudinary.v2.uploader
				.destroy(public_id)
				.then(() =>
					res.json({ success: true, message: 'Deleted Image' })
				)
				.catch((err) =>
					res
						.status(400)
						.json({ success: false, message: err.message })
				)
		} catch (error) {
			return res
				.status(500)
				.json({ status: false, message: error.message })
		}
	}
}

const removeTmp = (path: string): void => {
	fs.unlink(path, (err) => {
		if (err) throw err
	})
}

export default new UploadController()
