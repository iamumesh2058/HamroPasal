import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	Home,
	Layout,
	SignIn,
	SignUp,
	Shop,
	EmailVerification,
	DashboardLayout,
	AdminRoutes,
	ResetPassword,
	Category,
	Users,
	Products,
	Orders,
	ProductDetails,
	AddCategory,
	UpdateCategory,
	AddProduct,
	UpdateProduct,
	UserRoutes,
} from './pages';
import Cart from './pages/Cart/Cart';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='sign-in' element={<SignIn />} />
					<Route path='sign-up' element={<SignUp />} />
					<Route path='email-verification/:token' element={<EmailVerification />} />
					<Route path='reset-password/:token' element={<ResetPassword />} />
					<Route path='shop' element={<Shop />} />
					<Route path='product-details/:id' element={<ProductDetails />} />

					<Route path='/' element={<AdminRoutes />}>
						<Route path='dashboard/' element={<DashboardLayout />}>
							<Route index element={<Users />} />
							<Route path='category' element={<Category />} />
							<Route path='add-category' element={<AddCategory />} />
							<Route path='update-category/:id' element={<UpdateCategory />} />
							<Route path='products' element={<Products />} />
							<Route path='add-product' element={<AddProduct />} />
							<Route path='update-product/:id' element={<UpdateProduct />} />
							<Route path='orders' element={<Orders />} />

						</Route>
					</Route>

					<Route path='/' element={<UserRoutes />}>
						<Route path='cart' element={<Cart />} />
					</Route>
				</Route>
				<Route />
			</Routes>
		</BrowserRouter>
	)
}

export default App;