import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIsCartOpen } from '../../features/cart/cart'
import Button from '../reusable/Button/Button'
import css from './CartButton.module.css'

const CartButton = () => {
  const items = useSelector((state) => state.cart.items)
  const isCartOpen = useSelector((state) => state.cart.isCartOpen)
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(setIsCartOpen(!isCartOpen))
  }

  return items.length ? (
    <div className={css.wrapper}>
      <Button styled="footer" rippled onClick={handleClick}>
        {isCartOpen ? 'Back to the products' : 'Go to the cart'}
      </Button>
    </div>
  ) : null
}

export default CartButton
