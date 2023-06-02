import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import Header from './components/Header/Header'
import ProductsPage from './pages/ProductsPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import Cart from './components/Cart/Cart'
import Loader from './components/Loader/Loader'
import Footer from './components/Footer/Footer'
import top from './assets/top.svg'
import CardTransition from '../src/components/Card/CardTransition.module.css'

const App = () => {
  const { isCartOpen, isLoading } = useSelector((state) => state.cart)
  const location = useLocation()

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about-us" element={<AboutPage />} />

        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      <CSSTransition
        in={isCartOpen}
        timeout={200}
        classNames={CardTransition}
        unmountOnExit
      >
        <Cart />
      </CSSTransition>
      {isLoading && <Loader />}
      {!isLoading && <Footer />}
      <a className={CardTransition.anchor} href="#top">
        <img alt="To top" src={top} />
      </a>
    </>
  )
}

export default App
