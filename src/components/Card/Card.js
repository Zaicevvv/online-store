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

  let w = window.screen.width

  const isRight = () => {
    if (w < 768) {
      if (i % 2) return css.right
    } else if (w < 1024) {
      if (i % 3 === 2) return css.right
    } else if (w < 1280) {
      if (i % 4 === 3) return css.right
    } else {
      if (i % 5 === 4) return css.right
    }
  }

  const handleHover = (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'SPAN') return
    setIsModalOpen(!isModalOpen)
  }

  const handleAddToCart = () => {
    if (items.find((item) => item.id === product.id)) {
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
      className={css.wrapper}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onClick={handleHover}
    >
      <div
        className={css.img}
        style={{ backgroundImage: `url(${product.img})` }}
      ></div>
      <p className={css.name}>{product.name}</p>
      <p className={css.price}>{product.price}</p>
      <CSSTransition
        in={isModalOpen}
        timeout={200}
        classNames={CardTransition}
        unmountOnExit
      >
        <div className={`${css.bigWrapper} ${isRight()}`}>
          <div className={css.container}>
            <div
              className={`${css.img} ${css.bigImg}`}
              style={{ backgroundImage: `url(${product.img})` }}
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