// import ProtectedRoute from "../../component/routing/ProtectedRoute"

import { useRouter } from 'next/router'
// import { Spinner } from 'react-bootstrap'

import { useEffect } from 'react'
import Layout from '../../component/Layout'

import { useAuth } from '../../hooks'

const DashBoard = () => {
	const router = useRouter()
	// context
	const {
		authInfo: { isAuthenticated, authLoading },
	} = useAuth()

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		if (authLoading) {
			router.push('/dashboard/SpinnerInfo')
		} else if (!isAuthenticated) {
			router.push('/auth/Login')
		} 
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated])

	return <Layout>DashBoard</Layout>
}

export default DashBoard
