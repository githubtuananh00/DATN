import { AuthActionType } from '../constants'
import { IUser } from '../type'

const { SET_AUTH } = AuthActionType

export interface IPayloadAuth {
	user: IUser | null
	isAuthenticated: boolean
}

export interface AuthState extends IPayloadAuth {
	authLoading: boolean
}

type AuthAction = {
	type: typeof SET_AUTH
	payload: IPayloadAuth
}

export const authReducer = (state: AuthState, action: AuthAction) => {
	switch (action.type) {
		case SET_AUTH:
			return {
				...state,
				isAuthenticated: action.payload.isAuthenticated,
				user: action.payload.user,
				authLoading: !action.payload.isAuthenticated,
			}

		default:
			return state
	}
}
