import Head from 'next/head'
import { Container } from 'react-bootstrap'
import Footer from './footer/Footer'
import NavbarMenu from './navbar/NavbarMenu'
import { TChildren } from './type/ChildrenType'

const Layout = ({ children }: TChildren) => {
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
