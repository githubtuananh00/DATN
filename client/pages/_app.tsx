import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/sass/index.css'
import type { AppProps } from 'next/app'
import ProductContextProvider from '../context/ProductContext'
import AuthContextProvider from '../context/AuthContext'
import CartContextProvider from '../context/CartContext'
import { paypalClient } from '../constants'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import PaymentContextProvider from '../context/PaymentContext'
import CategoryContextProvider from '../context/CategoryContext'

function MyApp({ Component, pageProps }: AppProps) {
	const initialOptions = {
		'client-id': paypalClient,
		currency: 'USD',
		intent: 'capture',
		// total: '1',
		// 'data-client-token': 'abc123xyz==',
	}
	return (
		<PayPalScriptProvider options={initialOptions}>
			<AuthContextProvider>
				<ProductContextProvider>
					<CartContextProvider>
						<PaymentContextProvider>
							<CategoryContextProvider>
								<Component {...pageProps} />
							</CategoryContextProvider>
						</PaymentContextProvider>
					</CartContextProvider>
				</ProductContextProvider>
			</AuthContextProvider>
		</PayPalScriptProvider>
	)
}

export default MyApp
