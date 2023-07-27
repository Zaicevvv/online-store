import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIsCartOpen } from '../../features/cart/cart'
import { NavLink, useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import Select from '../reusable/Select/Select'
import { setIsLoading } from '../../features/cart/cart'
import logo from '../../assets/logo.png'
import miniCart from '../../assets/miniCart.svg'
import call from '../../assets/call.svg'
import api from '../../config/api'
import HeaderTransition from './HeaderTransition.module.css'
import css from './Header.module.css'

const Header = () => {
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

  const handlePageChange = () => isCartOpen && dispatch(setIsCartOpen(false))

  const handleSearch = (value, callback) => {
    if (!value) {
      callback([])
      return
    }

    let options = []
    dispatch(setIsLoading(true))
    api
      .GET_SEARCHED_PRODUCTS(value)
      .then((res) => {
        options = res.map((el) => {
          return { label: el.name, value: el.product_id }
        })

        callback(options)
      })
      .finally(() => dispatch(setIsLoading(false)))
  }

  const goToProduct = (product) => {
    toggleMenu()
    navigate(`/product/${product.value}`)
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
          <ul className={css.linksList} onClick={handlePageChange}>
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
          <Select
            styled="headerSearch"
            defaultValue="Пошук..."
            async
            options={handleSearch}
            onChange={goToProduct}
          />
        </nav>
        <div className={css.cart}>
          {w > 1410 ? (
            <a
              className={css.link}
              style={{ color: '#F2F3F7', marginRight: '20px' }}
              href="tel:+380689811557"
            >
              +38(068) 981-15-57 - Марія
            </a>
          ) : (
            <a href="tel:+380689811557">
              <img className={css.call} alt="call" src={call} />
            </a>
          )}
          <div onClick={toggleCart}>
            <img className={css.cartImg} alt="cart" src={miniCart} />
            {!!items.length && (
              <div className={css.amountWrapper}>
                <span className={css.amount}>{items.length}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={css.mobHeader}>
        <img
          alt="Main Logo"
          src={logo}
          className={css.mobLogo}
          onClick={handleGoHome}
        />
        <div className={css.mobHeaderContainer}>
          <a
            className={css.link}
            style={{ opacity: 1 }}
            href="tel:+380689811557"
          >
            <img className={css.call} alt="call" src={call} />
          </a>
          <div className={css.cart} onClick={toggleCart}>
            <img className={css.cartImg} alt="cart" src={miniCart} />
            {!!items.length && (
              <div className={css.amountWrapper}>
                <span className={css.amount}>{items.length}</span>
              </div>
            )}
          </div>
        </div>
        <button onClick={toggleMenu} className={css.menuButton}>
          <svg
            stroke="var(--white)"
            fill="none"
            className={`${css.menuBurger} ${open && css.menuBurgerActive}`}
            viewBox="-5 -5 40 40"
            width="35"
          >
            <path
              className={`${css.menuLine} ${open && css.menuLineActive}`}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m 4.5 11 h 20 a 1 1 0 0 1 0 7 h -20 a 1 1 0 0 1 0 -12 h 10 v 22"
            ></path>
          </svg>
        </button>
      </div>
      <CSSTransition
        in={open}
        timeout={200}
        classNames={HeaderTransition}
        unmountOnExit
      >
        <div className={css.mobile_content}>
          <Select
            styled="search"
            style={{ width: '100%' }}
            defaultValue="Пошук..."
            async
            options={handleSearch}
            onChange={goToProduct}
          />
          <div className={css.mobLinks} onClick={toggleMenu}>
            <a
              className={css.link}
              style={{ color: '#F2F3F7' }}
              href="tel:+380689811557"
            >
              +38(068) 981-15-57 - Марія
            </a>
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

export default Header
