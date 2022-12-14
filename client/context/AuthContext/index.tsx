import axios from 'axios'
import { createContext, useEffect, useReducer } from 'react'
import {
	apiUrl,
	AuthActionType,
	LOCAL_STORAGE_TOKEN_NAME,
} from '../../constants'
import { ContextStateProps, IRes, IToken, IUser, IUserLogin } from '../../type'
import { authReducer, AuthState } from '../../reducers/AuthReducer'
import setAuthToken from '../../utils/setAuthToken'
import { refreshToken } from '../../api/AuthAPI'

const { SET_AUTH } = AuthActionType

// Auth Default Value
const authDefault: AuthState = {
	isAuthenticated: false,
	user: null,
	authLoading: false,
	isAdmin: false,
}

export interface AuthStateDefault {
	loginUser: (userFrom: IUserLogin) => Promise<
		| IRes<IToken>
		| {
				success: boolean
				message: unknown
		  }
	>
	authInfo: AuthState
	logoutUser: () => void
	register: (userFrom: IUser) => void
	// tokens: (refreshToken: string) => Promise<IResponseRefreshToken>
}

export const AuthContext = createContext<AuthStateDefault>({
	authInfo: authDefault,
	loginUser: () =>
		Promise.resolve<IRes<IToken>>({
			data: {
				success: false,
				message: '',
				product: null,
				tokens: null,
				payload: null,
			},
		}),

	logoutUser: () => null,
	register: () => null,
})

const AuthContextProvider = ({ children }: ContextStateProps) => {
	const [authInfo, dispatch] = useReducer(authReducer, authDefault)

	const loadUser = async () => {
		if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
			setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
		}

		try {
			const response: IRes<IUser> = await axios.get(`${apiUrl}/auth`)

			if (response.data.success) {
				dispatch({
					type: SET_AUTH,
					payload: {
						user: response.data.payload,
						isAuthenticated: true,
						isAdmin: response.data.payload!.role,
					},
				})
			}
		} catch (error) {
			localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
			setAuthToken(null)
			dispatch({
				type: SET_AUTH,
				payload: { isAuthenticated: false, user: null, isAdmin: false },
			})
		}
	}
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		loadUser()
		const timerId = setInterval(() => {
			loadUser()
			;(refreshToken() as Promise<IToken>).then((tokens: IToken) => {
				console.log(tokens.accessToken)

				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					tokens.accessToken
				)
			})
		}, 9.5 * 60 * 1000)

		return () => clearInterval(timerId)
	}, [])

	// Login
	const loginUser = async (
		userForm: IUserLogin
	): Promise<
		| IRes<IToken>
		| {
				success: boolean
				message: unknown
		  }
	> => {
		const config = {
			data: {
				userForm,
			},
		}
		try {
			const response: IRes<IToken> = await axios.post(
				`${apiUrl}/auth/login`,
				config.data.userForm
			)

			if (response.data.success)
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					response.data.tokens!.accessToken
				)

			await loadUser()
			return response.data
		} catch (error) {
			return {
				success: false,
				message: error,
			}
		}
	}

	// Register
	const register = async (userForm: IUser) => {
		const config = {
			data: {
				userForm,
			},
		}
		try {
			const response: IRes<IToken> = await axios.post(
				`${apiUrl}/auth/register`,
				config.data.userForm
			)
			if (response.data.success)
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					response.data.tokens!.accessToken
				)
			await loadUser()
			return response.data
		} catch (error) {
			return {
				success: false,
				message: error,
			}
		}
	}

	// Logout
	const logoutUser = () => {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)

		return dispatch({
			type: SET_AUTH,
			payload: {
				isAuthenticated: false,
				user: null,
				isAdmin: false,
			},
		})
	}

	const authContextData = {
		authInfo,
		loginUser,
		logoutUser,
		register,
	}
	return (
		<AuthContext.Provider value={authContextData}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
