import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setIsCartOpen } from '../../features/cart/cart'
import Button from '../reusable/Button/Button'
import css from './CartButton.module.css'

const CartButton = () => {
  const items = useSelector((state) => state.cart.items)
  const isCartOpen = useSelector((state) => state.cart.isCartOpen)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = () => dispatch(setIsCartOpen(!isCartOpen))

  const handleGoToProducts = () => {
    navigate('/products')
    handleClick()
  }

  return items.length ? (
    <div className={css.wrapper}>
      <Button
        styled="footer"
        rippled
        onClick={isCartOpen ? handleGoToProducts : handleClick}
      >
        {isCartOpen ? 'До товарів' : 'До кошика'}
      </Button>
    </div>
  ) : null
}

export default CartButton
