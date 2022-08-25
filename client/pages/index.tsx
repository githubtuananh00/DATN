import type { NextPage } from 'next'

import Products from './products'
// import ProductAPI from './api/ProductAPI'

const Home: NextPage = () => {
	// ProductAPI()

	return (
		<div>
			<Products />
		</div>
	)
}

export default Home
