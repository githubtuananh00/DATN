import { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import cloudinary, { UploadApiResponse } from 'cloudinary'
import fs from 'fs'

class UploadController {
	// [POST] /upload
	uploadFile(req: Request, res: Response) {
		try {
			if (!req.files || Object.keys(req.files).length === 0)
				return res
					.status(400)
					.json({ success: false, message: 'No files were uploaded' })
			const file: UploadedFile = req.files.file as UploadedFile
			if (file.size > 1024 * 1024) {
				removeTmp(file.tempFilePath)
				return res
					.status(400)
					.json({ success: false, message: 'Size too large' })
			}

			if (
				file.mimetype !== 'image/jpeg' &&
				file.mimetype !== 'image/png'
			) {
				removeTmp(file.tempFilePath)
				return res.status(400).json({
					success: false,
					message: 'File format is incorrect',
				})
			}

			cloudinary.v2.uploader
				.upload(file.tempFilePath, { folder: 'test' })
				.then((result) =>
					res.json({
						success: true,
						public_id: result.public_id,
						url: result.secure_url,
					})
				)
				.catch((err) =>
					res.status(400).json({ success: false, error: err.message })
				)
			removeTmp(file.tempFilePath)
			res.json('test upload')
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
