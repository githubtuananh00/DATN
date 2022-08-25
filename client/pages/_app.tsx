import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/sass/index.css'
import type { AppProps } from 'next/app'
import DataProvider from '../context/ProductContext'
import AuthContextProvider from '../context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthContextProvider>
			<DataProvider>
				<Component {...pageProps} />
			</DataProvider>
		</AuthContextProvider>
	)
}

export default MyApp
