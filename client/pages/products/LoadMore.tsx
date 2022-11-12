import React from 'react'
import { Button } from 'react-bootstrap'
import { ProductStateDefault } from '../../context/ProductContext'
import { useProduct } from '../../hooks'

/**
 * Components Load More
 * @returns JSX.Element
 */
const LoadMore = () => {
	const { result, page, updatePage }: ProductStateDefault = useProduct()
	return (
		<div className='load_more'>
			{result < page * 9 ? null : (
				<Button variant='light' onClick={() => updatePage(page + 1)}>
					Load more
				</Button>
			)}
		</div>
	)
}

export default LoadMore
