import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from './components/Header/Header'
import ProductsPage from './pages/ProductsPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CartButton from './components/CartButton/CartButton'
import Cart from './components/Cart/Cart'

const App = () => {
  const isCartOpen = useSelector((state) => state.cart.isCartOpen)
  const location = useLocation()

  return (
    <>
      <Header />
      {/*{location.pathname !== '/login' && <Sidebar />} */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about-us" element={<AboutPage />} />

        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      {isCartOpen && <Cart />}
      {/* <CartButton /> */}
    </>
  )
}

export default App
