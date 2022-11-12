import mongoose from 'mongoose'

/**
 * Connect to database
 */
const connectDb = () => {
	mongoose
		.connect(process.env.PATH_CONFIG_DB as string)
		.then(() => console.log(process.env.MSG_DB_SUCCESS))
		.catch(() => console.log(process.env.MSG_BD_FAILED))
}
export default connectDb
