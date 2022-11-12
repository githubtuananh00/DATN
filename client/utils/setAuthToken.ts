import axios from 'axios'

/**
 * Set Auth Token Header API
 * @param token string | null
 */
const setAuthToken = (token: string | null) => {
	if (token)
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
	else delete axios.defaults.headers.common['Authorization']
}
export default setAuthToken
