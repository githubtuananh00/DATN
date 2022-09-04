import { Router } from 'express'
import { verifyToken } from '../app/middleware/verifyToken'
// import { role } from '../app/resources/role'

const router = Router()

import cartController from '../app/controllers/cartController'

router.patch('/addCart', verifyToken, cartController.addCart)
router.put('/:id/update', verifyToken, cartController.updateCart)
router.delete('/:id/delete', verifyToken, cartController.deleteCart)
router.get('/', verifyToken, cartController.getCarts)

export default router
