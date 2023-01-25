import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from './components/Header/Header'
import ProductsPage from './pages/ProductsPage'
import HomePage from './pages/HomePage'
import CartButton from './components/CartButton/CartButton'

const App = () => {
  const isCartOpen = useSelector((state) => state.cart.isCartOpen)
  const location = useLocation()
  console.log(location.pathname)

  return (
    <>
      <Header />
      {/*{location.pathname !== '/login' && <Sidebar />} */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />

        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      <CartButton />
    </>
  )
}

export default App
