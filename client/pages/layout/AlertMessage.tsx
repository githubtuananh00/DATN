import { Alert } from 'react-bootstrap'

export interface AlertInfo {
	type: string | null
	message: string
}

/**
 *
 * @param { type, message }: AlertInfo
 * @returns JSX.Element | null
 */
const AlertMessage = ({ type, message }: AlertInfo) => {
	return type === null ? null : <Alert variant={type}>{message}</Alert>
}

export default AlertMessage
