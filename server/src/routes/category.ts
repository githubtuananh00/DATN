import { Router } from 'express'
import { authAdmin } from '../app/middleware/authAdmin'
import { verifyToken } from '../app/middleware/verifyToken'

const router = Router()

import categoryController from '../app/controllers/categoryController'

router.post(
	'/createCategory',
	verifyToken,
	authAdmin,
	categoryController.createCategory
)

router.delete(
	'/:id/delete',
	verifyToken,
	authAdmin,
	categoryController.deleteCategory
)

router.put(
	'/:id/update',
	verifyToken,
	authAdmin,
	categoryController.updateCategory
)

router.get('/', categoryController.getCategories)
export default router
