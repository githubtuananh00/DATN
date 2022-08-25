import Link from 'next/link'
import { Container, Nav, Navbar } from 'react-bootstrap'
import GoHome from './icon/GoHome.svg'
import Contacts from './icon/Contacts.svg'
import Mail from './icon/Mail.svg'
import Map from './icon/Map.svg'
import Phone from './icon/Phone.svg'

const Footer = () => {
	return (
		<Container>
			<Navbar bg='light' expand='lg'>
				<Container style={{ paddingLeft: '80px' }}>
					{/* <Navbar.Brand href='#home'></Navbar.Brand> */}
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse
						id='basic-navbar-nav'
						className='footer-content-main d-flex column align-items-center'
					>
						<h6>&copy; Inter IKEA Systems B.V. 1999-2020</h6>
						<Nav className='me-auto navbar-nav d-flex mr-auto'>
							<Link href='/' passHref className='nav-link'>
								<Nav.Link>Catalogues</Nav.Link>
							</Link>
							<Link href='/' passHref className='nav-link'>
								<Nav.Link>Services</Nav.Link>
							</Link>
							<Link href='/' passHref className='nav-link'>
								<Nav.Link>Planning tools</Nav.Link>
							</Link>
							<Link href='/' passHref className='nav-link'>
								<Nav.Link>Jobs</Nav.Link>
							</Link>
							<Link href='/' passHref className='nav-link'>
								<Nav.Link>Contact us</Nav.Link>
							</Link>
						</Nav>
						<button className='arrow-btn d-flex align-items-center justify-content-center bg-light border-medium rounded-circle'>
							<img src={GoHome.src} alt='' />
						</button>
					</Navbar.Collapse>

					<div className='footer-content-contacts'>
						<div className='product-features-small vertical-container d-flex justify-content-between position-relative w-100'>
							<div className='feature-icons'>
								<a href='#'>
									<img
										src={Phone.src}
										style={{ marginBottom: '5px' }}
										alt=''
									/>
								</a>
								<br></br>
								<a href='#'>
									<img
										src={Mail.src}
										style={{ marginBottom: '5px' }}
										alt=''
									/>
								</a>
								<br></br>
								<a href='#'>
									<img
										src={Contacts.src}
										style={{ marginBottom: '5px' }}
										alt=''
									/>
								</a>
								<br></br>
								<img
									src={Map.src}
									style={{ marginBottom: '5px' }}
									alt=''
								/>
							</div>
							<h5 className='vertical-container-title d-flex align-items-center position-absolute'>
								<div className='line'></div>
								Contacts
							</h5>
						</div>
					</div>
				</Container>
			</Navbar>
		</Container>
	)
}

export default Footer
