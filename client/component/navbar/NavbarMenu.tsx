import Link from 'next/link'
// import Image from 'next/image'
// // import { useContext } from 'react'
import {
	Button,
	Container,
	Form,
	Nav,
	Navbar,
	NavDropdown,
} from 'react-bootstrap'
// // import { GlobalState } from '../../pages/GlobalState'

// // Svg
import Shop from './icon/shop.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import Search from './icon/search.svg'
import { useAuth, useCart, useProduct } from '../../hooks'
import { ChangeEvent } from 'react'
import { ProductStateDefault } from '../../context/ProductContext'

const NavbarMenu = () => {
	const { search, updateSearch }: ProductStateDefault = useProduct()
	const onCHangeSearchForm = (event: ChangeEvent<HTMLInputElement>) =>
		updateSearch(event.target.value.toLowerCase())

	const {
		authInfo: { isAuthenticated, isAdmin, user },
		logoutUser,
	} = useAuth()
	const { cart, logoutCart } = useCart()

	const logout = () => {
		logoutCart()
		return logoutUser()
	}

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
							{isAdmin ? (
								<h4
									style={{
										color: '#ffc240',
										marginLeft: '17px',
									}}
								>
									Admin
								</h4>
							) : (
								<h5 style={{ color: '#ffc240' }}>House ware</h5>
							)}
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
							<Nav.Link>SHOP</Nav.Link>
						</Link>
					</Nav>
					{isAuthenticated && (
						<Nav className='nav-item'>
							<Link
								href='/orderHistory'
								passHref
								className='nav-link'
							>
								<Nav.Link>HISTORY</Nav.Link>
							</Link>
						</Nav>
					)}
					{isAdmin && (
						<>
							<Nav className='nav-item'>
								<Link
									href='/products/createProduct'
									passHref
									className='nav-link'
								>
									<Nav.Link>CREATE PRODUCT</Nav.Link>
								</Link>
							</Nav>
							<Nav className='nav-item'>
								<Link
									href='/category'
									passHref
									className='nav-link'
								>
									<Nav.Link>CATEGORY</Nav.Link>
								</Link>
							</Nav>
						</>
					)}
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
						style={{ marginRight: '5px' }}
						value={search}
						onChange={onCHangeSearchForm}
						type='search'
						placeholder='Search products...'
						className='search-input'
					/>
				</Form>
				<Navbar.Collapse aria-controls='basic-navbar-nav'>
					{isAuthenticated ? (
						<>
							<NavDropdown
								title={`Welcome ${user!.name}`}
								id='basic-nav-dropdown'
							>
								<NavDropdown.Item onClick={logout}>
									<Link href='/'>Logout</Link>
								</NavDropdown.Item>
							</NavDropdown>

							{isAdmin ? (
								<></>
							) : (
								<>
									<Link
										href='#'
										passHref
										className='nav-icon subtotal-price'
									>
										$0
									</Link>
									<img
										src={Close.src}
										width='30'
										className='close'
										alt=''
									/>
								</>
							)}
						</>
					) : (
						<Link href='/auth/Login' passHref>
							<Nav.Link>Login</Nav.Link>
						</Link>
					)}
				</Navbar.Collapse>
				{isAuthenticated && !isAdmin ? (
					<Link
						href='/cart'
						className='nav-icon d-flex align-items-center position-relative'
						passHref
					>
						<a>
							<img src={Cart.src} width='30' alt='' />
							<span className='item-quantity badge position-absolute rounded-circle d-flex align-items-center justify-content-center'>
								{cart.length}
							</span>
						</a>
					</Link>
				) : (
					<></>
				)}
			</Container>
		</Navbar>
	)
}

export default NavbarMenu
