import express, { Request } from 'express'
import routes from './routes'
import cors from 'cors'
import fileupload from 'express-fileupload'

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(
	cors<Request>({
		origin: 'http://localhost:3000',
		credentials: true,
		optionsSuccessStatus: 200,
	})
)

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
app.get('/', (req, res) => {
	res.send('Hello World!')
	req.off
})
// router app init
routes(app)
// Connect BD
import connect from './app/db'
connect()
app.listen(PORT, () => {
	return console.log(`Express is listening at http://localhost:${PORT}`)
})
