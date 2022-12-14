import { Express } from 'express'
import authRouter from './auth'
import category from './category'
import product from './product'
import cart from './cart'
import payment from './payment'
import upload from './upload'


const routes = (app: Express) => {
	app.use('/auth', authRouter)
	app.use('/category', category)
	app.use('/product', product)
	app.use('/cart', cart)
	app.use('/payment', payment)
	app.use('/', upload)
}

export default routes
