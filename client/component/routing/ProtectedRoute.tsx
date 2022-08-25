// import { ReactNode } from "react"
import { useRouter } from 'next/router'
import { FC } from 'react'
import { Spinner } from 'react-bootstrap'
import { useAuth } from '../../hooks'
// import Layout from "../Layout"

// interface IProps {
// 	Component: JSX.Element
// }

const ProtectedRoute = (Component: FC) => {
	const router = useRouter()
	// context
	const {
		authInfo: { authLoading, isAuthenticated },
	} = useAuth()
	if (authLoading) return <Spinner animation='border' variant='info' />
	if (!isAuthenticated) router.push('/auth/Login')
	return <Component />
}

export default ProtectedRoute
