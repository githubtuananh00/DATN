import { Schema, model, Document } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
export interface ICart extends Document {
	quantity: number
	product_id: string[]
	user_id: string
}

// 2. Create a Schema corresponding to the document interface.
const cartSchema: Schema = new Schema<ICart>(
	{
		product_id: [
			{
				type: String,
				required: true,
				trim: true,
				unique: true,
			},
		],
		user_id: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},

		quantity: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
)

export default model<ICart>('carts', cartSchema)
