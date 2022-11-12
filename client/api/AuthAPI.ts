import axios from 'axios'
import { apiUrl } from '../constants'
import { IRes, IToken } from '../type'

/**
 * RefreshToken
 * @returns Promise<IToken | {success: boolean;message: unknown;} | null | undefined>
 */
export const refreshToken = async () => {
	try {
		// Call API get Token
		const response: IRes<IToken> = await axios.get(`${apiUrl}/auth/token`)

		// Return token if there is a token
		if (response.data.success) return response.data.tokens
	} catch (error) {
		// Return success = false if the token is not found
		return {
			success: false,
			message: error,
		}
	}
}
