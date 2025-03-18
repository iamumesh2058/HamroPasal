import React from 'react'
import { 
	BrowserRouter, 
	Route, 
	Routes 
} from 'react-router-dom'

import { 
	Home, 
	Layout 
} from './pages'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App