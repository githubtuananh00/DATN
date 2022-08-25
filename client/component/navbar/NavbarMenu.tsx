import Link from 'next/link'
// import Image from 'next/image'
// // import { useContext } from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
// // import { GlobalState } from '../../pages/GlobalState'

// // Svg
import Shop from './icon/shop.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import Search from './icon/search.svg'

const NavbarMenu = () => {
	// const value = useContext(GlobalState)
	// console.log(Search)

	return (
		<Navbar
			bg='light'
			expand='lg'
			className='navbar container-full d-flex align-items-center mx-auto'
		>
			<Container>
				<Navbar.Collapse aria-controls='basic-navbar-nav'>
					<Link href='/' passHref>
						<div className='logo'>
							<img src={Shop.src} width='30' alt='' />
							<h5 style={{ color: '#ffc240' }}>House ware</h5>
						</div>
					</Link>
				</Navbar.Collapse>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse
					id='basic-navbar-nav'
					className='d-flex mr-auto'
				>
					<Nav className='nav-item'>
						<Link href='/products' passHref className='nav-link'>
							<Nav.Link>Product</Nav.Link>
						</Link>
					</Nav>
					<Nav className='nav-item'>
						<Link href='/dashboard' passHref className='nav-link'>
							<Nav.Link>Dashboard</Nav.Link>
						</Link>
					</Nav>
				</Navbar.Collapse>
				<Form className='search-form d-flex align-items-center'>
					<Button
						variant='light'
						className='search-btn nav-icon'
						type='submit'
					>
						<img src={Search.src} alt='' />
					</Button>
					<Form.Control
						type='search'
						placeholder='Search products...'
						className='search-input'
					/>
				</Form>
				<Navbar.Collapse aria-controls='basic-navbar-nav'>
					<Link href='/auth/Login' passHref>
						<Nav.Link>Login/Logout</Nav.Link>
					</Link>
					<Link href='#' passHref className='nav-icon subtotal-price'>
						$0
					</Link>
					<img src={Close.src} width='30' className='close' alt='' />
				</Navbar.Collapse>
				<Link
					href='/cart'
					passHref
					className='nav-icon d-flex align-items-center position-relative'
				>
					<>
						<img src={Cart.src} width='30' alt='' />
						<span className='item-quantity badge position-absolute rounded-circle d-flex align-items-center justify-content-center'>
							2
						</span>
					</>
				</Link>
			</Container>
		</Navbar>
	)
}

export default NavbarMenu
