import React, { useState } from 'react'
import Button from '../reusable/Button/Button'
import Form from '../Form/Form'
import { useSelector, useDispatch } from 'react-redux'
import { setCartItems, setIsCartOpen } from '../../features/cart/cart'
import { useNavigate } from 'react-router-dom'
import cancel from '../../assets/cancel.svg'
import cart from '../../assets/cart.svg'
import css from './Cart.module.css'

const Cart = () => {
  const { items, formData, isToSent } = useSelector((state) => state.cart)
  const [stage, setStage] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleIncrement = (id, e) => {
    let newItems = [...items]
    newItems = newItems.map((item) => {
      if (item.product_id === id) {
        return { ...item, amount: +item.amount + 1 }
      } else return item
    })
    dispatch(setCartItems(newItems))
  }

  const handleDecrement = (id, e) => {
    if (items.find((item) => item.product_id === id).amount < 2) return

    let newItems = [...items]
    newItems = newItems.map((item) => {
      if (item.product_id === id) {
        return { ...item, amount: +item.amount - 1 }
      } else return item
    })
    dispatch(setCartItems(newItems))
  }

  const handleCheckout = () =>
    setTimeout(
      () =>
        stage === 1
          ? setStage(2)
          : isToSent &&
            console.log(items, {
              ...formData,
              city: formData.city.label,
              spot: formData.spot.label,
            }),
      300,
    )

  const handleClose = () => dispatch(setIsCartOpen(false))

  const handleBack = () => setStage(stage - 1)

  const handleGoToProducts = () => {
    navigate('products')
    handleClose()
  }

  const handleDelete = (id, e) => {
    let newItems = [...items]
    newItems = newItems.filter((item) => item.product_id !== id)
    dispatch(setCartItems(newItems))
  }

  return (
    <div className={css.overlay}>
      <div className={css.wrapper}>
        <div className={css.header}>
          <h1 className={css.mainTitle}>
            {stage === 1 ? 'Кошик' : 'Оформлення замовлення'}
          </h1>
          <img
            className={css.close}
            alt="close"
            src={cancel}
            onClick={handleClose}
          />
        </div>
        {stage === 1 && (
          <>
            {items.length > 0 ? (
              <ul className={css.list}>
                {items.map((item) => (
                  <li key={item.product_id} className={css.listItem}>
                    <img
                      className={css.delete}
                      alt="delete"
                      src={cancel}
                      onClick={handleDelete.bind(this, item.product_id)}
                    />
                    <div className={css.product}>
                      <img className={css.img} alt="product" src={item.thumb} />
                      <h2>{item.name}</h2>
                      <h2>{item.price}</h2>
                    </div>
                    <div className={css.btnsContainer}>
                      <Button
                        styled="amount"
                        onClick={handleDecrement.bind(this, item.product_id)}
                      >
                        -
                      </Button>
                      <span className={css.amount}>{item.amount}</span>
                      <Button
                        styled="amount"
                        onClick={handleIncrement.bind(this, item.product_id)}
                      >
                        +
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <img className={css.cartImg} alt="cart" src={cart} />
                <h2 className={css.empty}>В кошику немає товарів</h2>
              </>
            )}
          </>
        )}
        {stage === 2 && <Form />}
        {stage === 1 && items.length > 0 && (
          <p className={css.total}>
            До оплаты без доставки: $
            {items.reduce(
              (acc, item) =>
                (acc = acc + +item.price.substring(1) * item.amount),
              0,
            )}
          </p>
        )}
        {items.length > 0 ? (
          <div className={css.footerBtns}>
            <Button
              styled={!isToSent && stage === 2 ? 'disabled' : 'checkout'}
              disabled={!isToSent && stage === 2}
              rippled
              onClick={handleCheckout}
            >
              Оформити замовлення
            </Button>
            <Button
              styled="back"
              rippled
              onClick={stage === 1 ? handleGoToProducts : handleBack}
            >
              {stage === 1 ? 'До товарів' : 'До кошика'}
            </Button>
          </div>
        ) : (
          <Button
            styled="back"
            style={{ margin: '0 auto' }}
            rippled
            onClick={handleGoToProducts}
          >
            До товарів
          </Button>
        )}
      </div>
    </div>
  )
}

export default Cart
