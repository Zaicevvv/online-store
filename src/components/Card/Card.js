import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCartItems, setIsCartOpen } from '../../features/cart/cart'
import { CSSTransition } from 'react-transition-group'
import Button from '../reusable/Button/Button'
import { addToCartSuccess } from '../../helpers/notyf'
import information from '../../assets/info.png'
import CardTransition from './CardTransition.module.css'
import css from './Card.module.css'

const Card = ({ product, i }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { items, isCartOpen } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  let w = window.innerWidth

  const isRight = () => {
    if (w < 680) {
      if (i % 2) return css.right
    } else if (w < 980 || (w > 1023 && w < 1060)) {
      if (i % 3) return css.right
    } else if (w < 1280 || (w > 979 && w < 1024)) {
      if (i % 4) return css.right
    } else if (w < 1500) {
      if (i % 5) return css.right
    } else if (w < 1720) {
      if (i % 6) return css.right
    } else if (w < 1940) {
      if (i % 7) return css.right
    } else if (w < 2160) {
      if (i % 8) return css.right
    } else if (w < 2380) {
      if (i % 9) return css.right
    } else if (w < 2600) {
      if (i % 10) return css.right
    } else if (w < 2820) {
      if (i % 11) return css.right
    } else if (w < 3040) {
      if (i % 12) return css.right
    } else {
      if (i % 13) return css.right
    }
  }

  const handleHover = (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'SPAN') return
    setIsModalOpen(!isModalOpen)
  }

  const handleHoverOn = (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'SPAN') return
    setIsModalOpen(true)
  }

  const handleHoverOff = (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'SPAN') return
    setIsModalOpen(false)
  }

  const handleAddToCart = () => {
    localStorage.setItem(
      'items',
      JSON.stringify([...items, { ...product, amount: 1 }]),
    )
    dispatch(setCartItems([...items, { ...product, amount: 1 }]))
    addToCartSuccess(product.name)

    setTimeout(() => {
      setIsModalOpen(!isModalOpen)
      dispatch(setIsCartOpen(true))
    }, 300)
  }

  return (
    <article
      className={`${css.wrapper} ${
        items.find((item) => +item.product_id === +product.product_id)
          ? css.green
          : ''
      }`}
      onMouseEnter={handleHoverOn}
      onMouseLeave={handleHoverOff}
      onClick={handleHover}
    >
      {items.find((item) => +item.product_id === +product.product_id) && (
        <a className={css.info} href={`product/${product.product_id}`}>
          <img alt="Information" src={information} />
        </a>
      )}
      <div
        className={css.img}
        style={{ backgroundImage: `url(${product.thumb})` }}
      ></div>
      <div>
        <p className={css.name}>{product.name}</p>
        <p className={css.price}>{product.price}</p>
      </div>
      <CSSTransition
        in={
          !isCartOpen &&
          isModalOpen &&
          !items.find((item) => +item.product_id === +product.product_id)
        }
        timeout={200}
        classNames={CardTransition}
        unmountOnExit
      >
        <div className={`${css.bigWrapper} ${isRight()}`}>
          <div className={css.container}>
            <a className={css.info} href={`product/${product.product_id}`}>
              <img alt="Information" src={information} />
            </a>
            <div className={css.descriptionWrapper}>
              <p className={css.bigName}>{product.name}</p>
              <p className={css.description}>{product.meta_description}</p>
            </div>
            <div
              className={`${css.img} ${css.bigImg}`}
              style={{ backgroundImage: `url(${product.thumb})` }}
            ></div>
          </div>
          <div className={css.jcsb_aic}>
            <p className={css.bigPrice}>{product.price}</p>
            <Button styled="addToCart" rippled onClick={handleAddToCart}>
              Додати у кошик
            </Button>
          </div>
        </div>
      </CSSTransition>
    </article>
  )
}

export default Card
