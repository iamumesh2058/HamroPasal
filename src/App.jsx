import React from 'react'

import './App.scss'
import MyRoutes from './routes/MyRoutes'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { UserProvider } from './context/UserContext'
import { CategoriesProvider } from './context/CategoriesContext'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <CategoriesProvider>
            <CartProvider>
              <MyRoutes />
            </CartProvider>
          </CategoriesProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default App