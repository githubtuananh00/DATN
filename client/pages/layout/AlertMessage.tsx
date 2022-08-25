import { Alert } from 'react-bootstrap'

export interface AlertInfo {
	type: string | null
	message: string
}

const AlertMessage = ({ type, message }: AlertInfo) => {
	return type === null ? null : <Alert variant={type}>{message}</Alert>
}

export default AlertMessage
