import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { setCartItems, setFormData, setRadio } from './features/cart/cart'
import Header from './components/Header/Header'
import ProductsPage from './pages/ProductsPage'
import ProductPage from './pages/ProductPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ArticlesPage from './pages/ArticlesPage'
import Cart from './components/Cart/Cart'
import Loader from './components/Loader/Loader'
import Footer from './components/Footer/Footer'
import top from './assets/top.svg'
import CardTransition from '../src/components/Card/CardTransition.module.css'

const App = () => {
  const { isCartOpen, isLoading } = useSelector((state) => state.cart)

  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('items'))
      dispatch(setCartItems(JSON.parse(localStorage.getItem('items'))))
    if (localStorage.getItem('formData'))
      dispatch(setFormData(JSON.parse(localStorage.getItem('formData'))))
    if (localStorage.getItem('radio'))
      dispatch(setRadio(JSON.parse(localStorage.getItem('radio'))))
  }, [dispatch])

  return (
    <>
      {location.pathname !== '/' && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/articles" element={<ArticlesPage />} />

        <Route path="*" element={<Navigate replace to="/products" />} />
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
      {!isLoading && location.pathname !== '/' && <Footer />}
      {location.pathname !== '/' && (
        <a className={CardTransition.anchor} href="#top">
          <img alt="To top" src={top} />
        </a>
      )}
    </>
  )
}

export default App
