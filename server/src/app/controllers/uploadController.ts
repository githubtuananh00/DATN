import { Request, Response } from 'express'
import cloudinary, { UploadApiResponse } from 'cloudinary'
import fs from 'fs'
import { IFile, IGetUserAuthInfoRequest } from '../type'

/**
 * Upload Controller
 */
class UploadController {
	// [POST] /upload
	uploadFile(req: IGetUserAuthInfoRequest<IFile>, res: Response) {
		try {
			if (!req.body)
				return res.status(400).json({
					success: false,
					message: process.env.MSG_NO_FILES_UPLOADED,
				})
			const file: IFile = req.body as IFile

			if (file.size > 1024 * 1024) {
				removeTmp(file.path)
				return res.status(400).json({
					success: false,
					message: process.env.MSG_SIZE_TO_LARGE,
				})
			}

			if (
				file.type !== (process.env.FILE_IMG_JPEG as string) &&
				file.type !== (process.env.FILE_IMG_PNG as string)
			) {
				removeTmp(file.path)
				return res.status(400).json({
					success: false,
					message: process.env.MSG_FILE_FORMAT_INCORRECT,
				})
			}

			cloudinary.v2.uploader.upload(
				file.path,
				{ folder: 'HouseWare' },
				async (err, result) => {
					if (err)
						return res.status(400).json({
							success: false,
							error: err.message,
						})

					removeTmp(file.path)
					return res.status(200).json({
						success: true,
						payload: {
							url: (result as UploadApiResponse).secure_url,
							public_id: (result as UploadApiResponse).public_id,
						},
					})
				}
			)
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: process.env.MSG_INTERNAL_SERVER_ERROR,
			})
		}
	}

	// [POST] /delete
	deleteFile(req: Request, res: Response) {
		try {
			const { public_id }: UploadApiResponse = req.body
			if (!public_id)
				return res.status(400).json({
					status: false,
					message: process.env.MSG_NO_IMG_SELECTED,
				})
			cloudinary.v2.uploader
				.destroy(public_id)
				.then(() =>
					res.status(200).json({
						success: true,
						message: process.env.MSG_DELETE_IMG_SUCCESS,
					})
				)
				.catch((err) =>
					res
						.status(400)
						.json({ success: false, message: err.message })
				)
		} catch (error) {
			return res.status(500).json({
				status: false,
				message: process.env.MSG_INTERNAL_SERVER_ERROR,
			})
		}
	}
}

/**
 * Remove Path File Upload
 * @param path Path File Upload
 */
const removeTmp = (path: string): void => {
	fs.unlink(path, (err) => {
		if (err) throw err
	})
}

export default new UploadController()
