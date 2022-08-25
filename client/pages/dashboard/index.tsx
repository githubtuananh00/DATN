// import ProtectedRoute from "../../component/routing/ProtectedRoute"

import { useRouter } from 'next/router'

import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useAuth } from '../../hooks'

const DashBoard = () => {
	// ProtectedRoute(<h1>Dashboard</h1>)
	const router = useRouter()
	// context
	const {
		authInfo: { isAuthenticated },
	} = useAuth()
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		isAuthenticated ? router.push('/dashboard') : router.push('/login')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (!isAuthenticated) {
		return <Spinner animation='border' variant='info' />
	}
	return <h1>DashBoard</h1>
}

export default DashBoard
