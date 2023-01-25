import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.jpg'
import css from './Header.module.css'

const BasicHeader = () => {
  const items = useSelector((state) => state.cart.items)
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <header className={css.header}>
      <div className={css.content}>
        <div className={css.nav}>
          <img alt="Main Logo" src={logo} className={css.logo} />
          <div className={css.links}>
            <Link to="/" className={css.link}>
              Home
            </Link>
            <Link to="/products" className={css.link}>
              Products
            </Link>
            <Link to="/about-us" className={css.link}>
              About us
            </Link>
            <Link to="/contacts" className={css.link}>
              Contacts
            </Link>
            <Link to="/articles" className={css.link}>
              Interesting to read
            </Link>
          </div>
        </div>
        <div className={css.right}>
          Cart
          <span className={css.amount}>
            {items.length ? items.length : null}
          </span>
        </div>
      </div>
      <div onClick={handleClick} className={css.burger}>
        <img alt="Main Logo" src={logo} className={css.mobLogo} />
        <div
          className={`${css.toggle} 
            ${open ? css.toggleOpen : ''}
          `}
        >
          <span className={css.line}></span>
          <span className={css.line}></span>
          <span className={css.line}></span>
        </div>
      </div>
      {open && (
        <div className={css.mobile_content}>
          <div className={css.mobLinks} onClick={handleClick}>
            <div>
              Cart
              <span className={css.amount}>
                {items.length ? items.length : null}
              </span>
            </div>
            <a className={css.link} href="tel:+380689811557">
              +38(068)981-15-57 - Мария
            </a>
            <Link to="/" className={css.link}>
              Home
            </Link>
            <Link to="/products" className={css.link}>
              Products
            </Link>
            <Link to="/" className={css.link}>
              About us
            </Link>
            <Link to="/" className={css.link}>
              Contacts
            </Link>
            <Link to="/" className={css.link}>
              Interesting to read
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default BasicHeader
