import { Router } from 'express'
import { verifyToken } from '../app/middleware/verifyToken'
// import { role } from '../app/resources/role'

const router = Router()

import authController from '../app/controllers/authController'

router.post('/register', authController.register)
router.post('/login', authController.login)
// Update token
router.get('/token', verifyToken, authController.token)

// Phan quyen admin
// router.post('/test', verifyToken, authRole(role.USER), authController.test)
// Logout
router.delete('/delete', verifyToken, authController.deleteToken)

router.get('/', verifyToken, authController.loadUser)

export default router
