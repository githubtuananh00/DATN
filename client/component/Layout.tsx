import Head from 'next/head'
import { Container } from 'react-bootstrap'
import { ContextStateProps } from '../type'
import Footer from './footer/Footer'
import NavbarMenu from './navbar/NavbarMenu'

/**
 * Layout
 * @param children ContextStateProps
 * @returns JSX.Element
 */
const Layout = ({ children }: ContextStateProps) => {
	return (
		<>
			<Container>
				<Head>
					<title>House ware</title>
				</Head>
				<NavbarMenu />

				<main className='w-100 mx-auto'>{children}</main>

				<br></br>

				<Footer />
			</Container>
		</>
	)
}

export default Layout
