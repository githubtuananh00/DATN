import { Router } from 'express'
import { authAdmin } from '../app/middleware/authAdmin'
import { verifyToken } from '../app/middleware/verifyToken'
import cloudinary from 'cloudinary'
import uploadController from '../app/controllers/uploadController'

const router = Router()

// we will upload img an cloudinary
cloudinary.v2.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
})

// Upload file
router.post('upload', verifyToken, authAdmin, uploadController.uploadFile)

// Delete file
router.post('delete', verifyToken, authAdmin, uploadController.deleteFile)

export default router
