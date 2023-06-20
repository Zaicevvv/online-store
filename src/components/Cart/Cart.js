import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Button from '../reusable/Button/Button'
import Form from '../Form/Form'
import { setCartItems, setIsCartOpen } from '../../features/cart/cart'
import cancel from '../../assets/cancel.svg'
import cart from '../../assets/cart.svg'
import { checkoutSuccess } from '../../helpers/notyf'
import css from './Cart.module.css'

const Cart = () => {
  const { items, formData, isToSent } = useSelector((state) => state.cart)
  const [stage, setStage] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleIncrement = (id, e) => {
    let newItems = [...items]
    newItems = newItems.map((item) => {
      if (+item.product_id === +id) {
        return { ...item, amount: +item.amount + 1 }
      } else return item
    })
    dispatch(setCartItems(newItems))
    localStorage.setItem('items', JSON.stringify(newItems))
  }

  const handleDecrement = (id, e) => {
    if (items.find((item) => +item.product_id === +id).amount < 2) return

    let newItems = [...items]
    newItems = newItems.map((item) => {
      if (+item.product_id === +id) {
        return { ...item, amount: +item.amount - 1 }
      } else return item
    })
    dispatch(setCartItems(newItems))
    localStorage.setItem('items', JSON.stringify(newItems))
  }

  const handleCheckout = () =>
    setTimeout(() => {
      if (stage === 1) return setStage(2)
      if (isToSent) {
        checkoutSuccess()
        // console.log(items, {
        //   ...formData,
        //   city: formData.city.label,
        //   spot: formData.spot.label,
        // }) &&
        dispatch(setCartItems([]))
        localStorage.setItem('items', JSON.stringify([]))
        handleClose()
      }
    }, 300)

  const handleClose = () => dispatch(setIsCartOpen(false))

  const handleBack = () => setStage(stage - 1)

  const handleGoToProducts = () => {
    setTimeout(() => {
      if (location.pathname.slice(1, 9) === 'product/') {
        handleClose()
      } else {
        navigate('products')
        handleClose()
      }
    }, 300)
  }

  const handleDelete = (id, e) => {
    let newItems = [...items]
    newItems = newItems.filter((item) => +item.product_id !== +id)
    dispatch(setCartItems(newItems))
    localStorage.setItem('items', JSON.stringify(newItems))
  }

  const handleOverlay = (e) => e.target === e.currentTarget && handleClose()

  return (
    <div className={css.overlay} onClick={handleOverlay}>
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
                      <h2 className={css.productName}>{item.name}</h2>
                    </div>
                    <div className={css.productFooter}>
                      <h2 className={css.productPrice}>{item.price}</h2>
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
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <img className={css.cartImg} alt="cart" src={cart} />
                <h2 className={css.empty}>У кошику немає товарів</h2>
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
                (acc = acc + +item.price.substring(1) * +item.amount),
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
              {stage === 1
                ? location.pathname.slice(1, 9) === 'product/'
                  ? 'Закрити кошик'
                  : 'До товарів'
                : 'До кошика'}
            </Button>
          </div>
        ) : (
          <Button
            styled="back"
            style={{ margin: '0 auto' }}
            rippled
            onClick={handleGoToProducts}
          >
            {location.pathname.slice(1, 9) === 'product/'
              ? 'Закрити кошик'
              : 'До товарів'}
          </Button>
        )}
      </div>
    </div>
  )
}

export default Cart
