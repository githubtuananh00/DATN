import axios from 'axios'
import { apiUrl } from '../constants'
import { IRes, IToken } from '../type'

export const refreshToken = async () => {
	try {
		const response: IRes<IToken> = await axios.get(`${apiUrl}/auth/token`)
		if (response.data.success) return response.data.tokens
	} catch (error) {
		console.log(error)
		return {
			success: false,
			message: error,
		}
	}
}
