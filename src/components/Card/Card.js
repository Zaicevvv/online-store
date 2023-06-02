import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCartItems, setIsCartOpen } from '../../features/cart/cart'
import { CSSTransition } from 'react-transition-group'
import Button from '../reusable/Button/Button'
import { addToCartSuccess } from '../../helpers/notyf'
import CardTransition from './CardTransition.module.css'
import css from './Card.module.css'

const Card = ({ product, i }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const items = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()

  let w = window.innerWidth

  const isRight = () => {
    if (w < 515) {
      if (i % 2) return css.right
    } else if (w < 680) {
      if (i % 3 === 2) return css.right
    } else if (w < 925) {
      if (i % 4 === 3) return css.right
    } else if (w < 1170) {
      if (i % 5 === 4) return css.right
    } else if (w < 1335) {
      if (i % 6 === 5) return css.right
    } else if (w < 1500) {
      if (i % 7 === 6) return css.right
    } else if (w < 1665) {
      if (i % 8 === 7) return css.right
    } else if (w < 1830) {
      if (i % 9 === 8) return css.right
    } else {
      if (i % 10 === 9) return css.right
    }
  }

  const handleHover = (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'SPAN') return
    setIsModalOpen(!isModalOpen)
  }

  const handleAddToCart = () => {
    if (items.find((item) => item.id === product.product_id)) {
      setTimeout(() => {
        setIsModalOpen(!isModalOpen)
        dispatch(setIsCartOpen(true))
      }, 300)

      return
    }

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
        items.find((item) => item.product_id === product.product_id)
          ? css.green
          : ''
      }`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onClick={handleHover}
    >
      <div
        className={css.img}
        style={{ backgroundImage: `url(${product.thumb})` }}
      ></div>
      <p className={css.name}>{product.name}</p>
      <p className={css.price}>{product.price}</p>
      <CSSTransition
        in={
          isModalOpen &&
          !items.find((item) => item.product_id === product.product_id)
        }
        timeout={200}
        classNames={CardTransition}
        unmountOnExit
      >
        <div className={`${css.bigWrapper} ${isRight()}`}>
          <div className={css.container}>
            <div
              className={`${css.img} ${css.bigImg}`}
              style={{ backgroundImage: `url(${product.thumb})` }}
            ></div>
            <p className={css.description}>{product.description}</p>
          </div>
          <div className={css.jcsb_aic}>
            <div>
              <p className={css.bigName}>{product.name}</p>
              <p className={css.bigPrice}>{product.price}</p>
            </div>
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
