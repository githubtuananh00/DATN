import { Schema, model, Document } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
export interface ICategory extends Document {
	nameCategory: string
}

// 2. Create a Schema corresponding to the document interface.
const categorySchema: Schema = new Schema<ICategory>(
	{
		nameCategory: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
)

export default model<ICategory>('catagories', categorySchema)
