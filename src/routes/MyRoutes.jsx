import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import Home from './Home/Home'
import SignIn from './Authentication/SignIn'
import SingUp from './Authentication/SingUp'
import Shop from './Shop/Shop'
import Checkout from './Checkout/Checkout'

const MyRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/shop/*' element={<Shop />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SingUp />} />
          <Route path='/checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </>
  )
}

export default MyRoutes