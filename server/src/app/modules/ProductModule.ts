import { Schema, model, Document } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
export interface IProduct extends Document {
	product_id: string
	title: string
	price: number
	description: string
	content: string
	image: object
	category: string
	sold: number
	checked: boolean
}

// 2. Create a Schema corresponding to the document interface.
const ProdIProductSchema: Schema = new Schema<IProduct>(
	{
		product_id: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		title: {
			type: String,
			required: true,
			trim: true,
		},
		price: {
			type: Number,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		content: {
			type: String,
			required: true,
			trim: true,
		},
		category: {
			type: String,
			required: true,
			trim: true,
		},
		checked: {
			type: Boolean,
			default: false,
		},
		sold: {
			type: Number,
			default: 0,
		},
		image: {
			type: Object,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)
// (IProduct & { _id: ObjectId; })[]
// (ICategory & {
//     _id: Types.ObjectId;
// })[]

/**
 * 
 * Query<(IProduct & {
    _id: Types.ObjectId;
})[], IProduct & {
    _id: Types.ObjectId;
}, {}, IProduct>
 */

export default model<IProduct>('products', ProdIProductSchema)
