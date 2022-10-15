import React from 'react'
import { Spinner } from 'react-bootstrap'

const SpinnerInfo = () => {
	return (
		<div className='spinner-container'>
			<Spinner animation='border' role='status' />
		</div>
	)
}

export default SpinnerInfo
