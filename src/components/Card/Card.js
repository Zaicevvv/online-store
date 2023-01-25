import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCartItems } from '../../features/cart/cart'
import { CSSTransition } from 'react-transition-group'
import Button from '../reusable/Button/Button'
import { addToCartSuccess } from '../../helpers/notyf'
import CardTransition from './CardTransition.module.css'
import css from './Card.module.css'

const Card = ({ product, i }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  let [amount, setAmount] = useState(1)
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

  const handleIncrement = () => setAmount((amount += 1))

  const handleDecrement = () => {
    if (amount < 2) return
    setAmount((amount -= 1))
  }

  const handleAddToCart = () => {
    dispatch(setCartItems([...items, product]))
    addToCartSuccess(product.name)
    if (w < 768)
      setTimeout(() => {
        setIsModalOpen(!isModalOpen)
      }, 300)
    // setTimeout приводит к тому, что несколько модалок открываются за раз,
    // если кликнуть и увести мышь на другую карточку
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
            {/* <Button styled="amount" onClick={handleDecrement}>
                -
              </Button>
              <span className={css.amount}>{amount}</span>
              <Button styled="amount" onClick={handleIncrement}>
                +
              </Button> */}
            <Button styled="addToCart" rippled onClick={handleAddToCart}>
              Add to cart
            </Button>
          </div>
        </div>
      </CSSTransition>
    </article>
  )
}

export default Card
