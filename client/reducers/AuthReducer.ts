import { AuthActionType } from '../constants'
import { IUser } from '../type'

const { SET_AUTH } = AuthActionType

export interface IPayloadAuth {
	user: IUser | null
	isAuthenticated: boolean
	isAdmin: boolean
}

export interface AuthState extends IPayloadAuth {
	authLoading: boolean
}

type AuthAction = {
	type: typeof SET_AUTH
	payload: IPayloadAuth
}

/**
 * Auth Reducer
 * @param state AuthState
 * @param action AuthAction
 * @returns  AuthState
 */
export const authReducer = (
	state: AuthState,
	action: AuthAction
): AuthState => {
	switch (action.type) {
		case SET_AUTH:
			return {
				...state,
				isAuthenticated: action.payload.isAuthenticated,
				user: action.payload.user,
				authLoading: false,
				isAdmin: action.payload.isAdmin,
			}

		default:
			return state
	}
}
