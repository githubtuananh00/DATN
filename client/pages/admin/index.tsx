import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../../component/Layout'
import { useAuth } from '../../hooks'

const Admin = () => {
	const router = useRouter()
	// context
	const {
		authInfo: { isAuthenticated, authLoading, isAdmin },
	} = useAuth()

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		if (authLoading) {
			router.push('/dashboard/SpinnerInfo')
		} else if (!isAuthenticated) {
			router.push('/auth/Login')
		} else if (!isAdmin) {
			router.push('/')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, authLoading, isAdmin])
	return <Layout>Admin</Layout>
}

export default Admin
