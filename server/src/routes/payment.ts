import { Router } from 'express'
import { verifyToken } from '../app/middleware/verifyToken'
import { authAdmin } from '../app/middleware/authAdmin'

import paypalController from '../app/controllers/payPalController'

const router = Router()
router.post('/createPayment', verifyToken, paypalController.createPayment)
router.get('/', verifyToken, authAdmin, paypalController.getPayments)

export default router
