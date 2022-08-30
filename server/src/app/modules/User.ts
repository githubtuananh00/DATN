import { Schema, model, Document } from 'mongoose'


// 1. Create an interface representing a document in MongoDB.
export interface IUser extends Document {
	username: string
	password: string
	name: string
	email: string
	phone: string
	address: string
	gt: string
	dateOfBirth: string
	role: boolean
	refreshToken: string
	cart: Array<string>
}

// 2. Create a Schema corresponding to the document interface.
const userSchema: Schema = new Schema<IUser>(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		phone: {
			type: String,
			required: true,
			unique: true,
		},
		address: {
			type: String,
			required: true,
			trim: true,
		},
		gt: {
			type: String,
			required: true,
			enum: ['Nam', 'Nữ', 'Khác'],
		},
		dateOfBirth: {
			type: String,
			required: true,
			trim: true,
			default: '01/01/1990',
		},
		role: {
			type: Boolean,
			required: true,
			default: false,
		},
		refreshToken: {
			type: String,
			required: false,
			default: null,
		},
		cart: [{ type: String, default: [] }],
	},
	{
		timestamps: true,
	}
)

export default model<IUser>('users', userSchema)
