import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIsCartOpen } from '../../features/cart/cart'
import { NavLink, useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import logo from '../../assets/logo.jpg'
import miniCart from '../../assets/miniCart.svg'
import call from '../../assets/call.svg'
import HeaderTransition from './HeaderTransition.module.css'
import css from './Header.module.css'

const BasicHeader = () => {
  const { items, isCartOpen } = useSelector((state) => state.cart)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let w = window.screen.width

  const toggleMenu = () => {
    isCartOpen && toggleCart()
    setOpen(!open)
  }

  const toggleCart = () => {
    open && setOpen(!open)
    dispatch(setIsCartOpen(!isCartOpen))
  }

  const handleGoHome = () => {
    navigate('/')
    isCartOpen && toggleCart()
  }

  return (
    <header className={css.header}>
      <div className={css.content}>
        <nav className={css.nav}>
          <img
            alt="Main Logo"
            src={logo}
            className={css.logo}
            onClick={handleGoHome}
          />
          <ul className={css.linksList}>
            <li className={css.links}>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? css.active : css.link)}
              >
                Головна
              </NavLink>
            </li>
            <li className={css.links}>
              <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? css.active : css.link)}
              >
                Товари
              </NavLink>
            </li>
            <li className={css.links}>
              <NavLink
                to="/about-us"
                className={({ isActive }) => (isActive ? css.active : css.link)}
              >
                Про нас та контакти
              </NavLink>
            </li>
            <li className={css.links}>
              <NavLink
                to="/articles"
                className={({ isActive }) => (isActive ? css.active : css.link)}
              >
                Цікаві статті
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={css.cart}>
          {w > 1120 ? (
            <a
              className={css.link}
              style={{ opacity: 1, marginRight: '20px' }}
              href="tel:+380689811557"
            >
              +38(068)981-15-57 - Марія
            </a>
          ) : (
            <a href="tel:+380689811557">
              <img className={css.call} alt="call" src={call} />
            </a>
          )}
          <img
            className={css.cartImg}
            alt="cart"
            src={miniCart}
            onClick={toggleCart}
          />
          {!!items.length && (
            <div className={css.amountWrapper}>
              <span className={css.amount}>{items.length}</span>
            </div>
          )}
        </div>
      </div>
      <div className={css.burger}>
        <img
          alt="Main Logo"
          src={logo}
          className={css.mobLogo}
          onClick={handleGoHome}
        />
        <div className={css.cart} onClick={toggleCart}>
          <img className={css.cartImg} alt="cart" src={miniCart} />
          {!!items.length && (
            <div className={css.amountWrapper}>
              <span className={css.amount}>{items.length}</span>
            </div>
          )}
        </div>
        <div
          onClick={toggleMenu}
          className={`${css.toggle} 
            ${open ? css.toggleOpen : ''}
          `}
        >
          <span className={css.line}></span>
          <span className={css.line}></span>
          <span className={css.line}></span>
        </div>
      </div>
      <CSSTransition
        in={open}
        timeout={200}
        classNames={HeaderTransition}
        unmountOnExit
      >
        <div className={css.mobile_content}>
          <div className={css.mobLinks} onClick={toggleMenu}>
            <a
              className={css.link}
              style={{ opacity: 1 }}
              href="tel:+380689811557"
            >
              +38(068)981-15-57 - Марія
            </a>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? css.active : css.link)}
            >
              Головна
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) => (isActive ? css.active : css.link)}
            >
              Товари
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) => (isActive ? css.active : css.link)}
            >
              Про нас та контакти
            </NavLink>
            <NavLink
              to="/articles"
              className={({ isActive }) => (isActive ? css.active : css.link)}
            >
              Цікаві статті
            </NavLink>
          </div>
        </div>
      </CSSTransition>
    </header>
  )
}

export default BasicHeader
