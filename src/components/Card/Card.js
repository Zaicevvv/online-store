import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCartItems, setIsCartOpen } from '../../features/cart/cart'
import { CSSTransition } from 'react-transition-group'
import Button from '../reusable/Button/Button'
import { addToCartSuccess } from '../../helpers/notyf'
import information from '../../assets/info.png'
import addToCart from '../../assets/addToCart.svg'
import CardTransition from './Card2Transition.module.css'
import css from './Card.module.css'

const Card = ({ product, i }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { items, isCartOpen } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

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
      <a className={css.link} href={`product/${product.product_id}`}>
        <img className={css.img} alt="Product" src={product.thumb} />
      </a>
      <div>
        <a className={css.link} href={`product/${product.product_id}`}>
          <p className={css.name}>{product.name}</p>
          <p className={css.price}>{product.price}</p>
        </a>
      </div>
      {!items.find((item) => +item.product_id === +product.product_id) && (
        <Button rippled onClick={handleAddToCart} style={{ margin: '0 10px' }}>
          Купити
        </Button>
      )}
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
        <div className={css.bigWrapper}>
          <a className={css.link} href={`product/${product.product_id}`}>
            <p className={css.bigName}>{product.name}</p>
            <p className={css.description}>{product.meta_description}</p>
          </a>
        </div>
      </CSSTransition>
    </article>
  )
}

export default Card
