import { Router } from 'express'
import { authAdmin } from '../app/middleware/authAdmin'
import { verifyToken } from '../app/middleware/verifyToken'

import productController from '../app/controllers/productController'

const router = Router()
router.post(
	'/createProduct',
	verifyToken,
	authAdmin,
	productController.createProduct
)
router.delete(
	'/:id/delete',
	verifyToken,
	authAdmin,
	productController.deleteProduct
)
router.put(
	'/:id/update',
	verifyToken,
	authAdmin,
	productController.updateProduct
)
router.get('/detail/:id', productController.getProductId)
router.get('/', productController.getProducts)

export default router
