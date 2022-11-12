import express, { Request } from 'express'
import routes from './routes'
import cors from 'cors'
import fileupload from 'express-fileupload'
import cloudinary from 'cloudinary'

import connect from './app/db'

require('dotenv').config()

const app = express()

// Config express
app.use(express.json())
app.use(
	cors<Request>({
		origin: process.env.URL_BACKEND as string,
		credentials: true,
		optionsSuccessStatus: 200,
	})
)
cloudinary.v2.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
})

// add middleware fileupload
app.use(fileupload())

// Custom middleware req.userId
declare global {
	namespace Express {
		interface Request {
			userId: string
			userRole: boolean
		}
	}
}

const PORT = process.env.PORT || 5000

// router app init
routes(app)

// Connect BD
connect()
app.listen(PORT, () => {
	return console.log(`${process.env.MSG_LISTEN}${PORT}`)
})
