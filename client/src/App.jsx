import React from 'react'
import {
	BrowserRouter,
	Route,
	Routes
} from 'react-router-dom'

import {
	EmailVerification,
	ForgotPassword,
	Home,
	Layout,
	ProductDetails,
	ResetPassword,
	Shop,
	SignIn,
	SignUp,
} from './pages'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />

					<Route path='sign-in' element={<SignIn />} />
					<Route path='sign-up' element={<SignUp />} />
					<Route path='verify-email/:token' element={<EmailVerification />} />
					<Route path='forgot-password' element={<ForgotPassword />} />
					<Route path='reset-password/:token' element={<ResetPassword />} />

					<Route path='shop' element={<Shop />} />
					<Route path='product-details/:id' element={<ProductDetails />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App