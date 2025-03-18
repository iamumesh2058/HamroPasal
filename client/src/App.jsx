import React from 'react'
import { 
	BrowserRouter, 
	Route, 
	Routes 
} from 'react-router-dom'

import { 
	Home, 
	Layout, 
	ProductDetails, 
	Shop, 
	SignIn,
	SignUp
} from './pages'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					
					<Route path='sign-in' element={<SignIn />} />
					<Route path='sign-up' element={<SignUp />} />

					<Route path='shop' element={<Shop />} />
					<Route path='product-details/:productId' element={<ProductDetails />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App