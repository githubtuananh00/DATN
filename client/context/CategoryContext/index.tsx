import { createContext, useState } from 'react'
import { ContextStateProps } from '../../constants'
import { ICategory } from '../../type'

export interface ICategoryStateDefault {
	categories: ICategory[]
	updateSetCategories: (data: ICategory[]) => void
}

const CategoryDefault: ICategoryStateDefault = {
	categories: [],
	updateSetCategories: () => {},
}
export const CategoryContext =
	createContext<ICategoryStateDefault>(CategoryDefault)

const CategoryContextProvider = ({ children }: ContextStateProps) => {
	const [categories, setCategories] = useState<ICategory[]>([])
	const updateSetCategories = (data: ICategory[]) => setCategories(data)

	const context: ICategoryStateDefault = {
		categories,
		updateSetCategories,
	}
	return (
		<CategoryContext.Provider value={context}>
			{children}
		</CategoryContext.Provider>
	)
}

export default CategoryContextProvider
