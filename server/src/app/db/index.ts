import mongoose from 'mongoose'

const connectDb = () => {
	mongoose
		.connect(`mongodb://localhost:27017/shopbanhang`)
		.then(() => console.log('Connect successful!'))
		.catch(() => console.log('Connect failed'))
}
export default connectDb
