import { model, Schema, Document } from 'mongoose'

export interface IPayPal extends Document {
	paymentID: string
	user_id: string
	name: string
	email: string
	address: Object
	cart: Array<Object>
	status: boolean
}

const paypalSchema: Schema = new Schema<IPayPal>(
	{
		paymentID: {
			type: String,
			required: true,
		},
		user_id: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		address: {
			type: Object,
			required: true,
		},
		cart: [
			{
				type: Array,
				default: [],
			},
		],
		status: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
)

export default model<IPayPal>('PayPals', paypalSchema)
