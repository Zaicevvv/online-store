import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setIsCartOpen, setCartItems } from '../features/cart/cart'
import Button from '../components/reusable/Button/Button'
import api from '../config/api'
import { addToCartSuccess } from '../helpers/notyf'
import css from './pages.module.css'

const ProductPage = () => {
  const [data, setData] = useState({})
  const items = useSelector((state) => state.cart.items)
  const params = useParams()
  const myRef = useRef(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    api.GET_PRODUCT(params.id).then((res) => {
      setData({ ...res, price: res.price.slice(0, -3) })
      myRef.current.innerHTML = `<h1>Опис</h1>  <p>${res.meta_description}</p>  ${res.description}`
    })
  }, [params.id])

  const handleAddToCart = () => {
    if (items.find((item) => +item.product_id === +data.product_id)) {
      setTimeout(() => dispatch(setIsCartOpen(true)), 300)

      return
    }

    localStorage.setItem(
      'items',
      JSON.stringify([...items, { ...data, amount: 1, name: data.meta_title }]),
    )
    dispatch(
      setCartItems([...items, { ...data, amount: 1, name: data.meta_title }]),
    )
    addToCartSuccess(data.meta_title)

    setTimeout(() => dispatch(setIsCartOpen(true)), 300)
  }

  const handleGoToProducts = () =>
    setTimeout(() => {
      navigate('/products')
    }, 300)

  return (
    <main className={css.main}>
      <div className={css.productMedia}>
        <div className={css.productWrapper}>
          <img className={css.productImg} alt="product" src={data.thumb} />
          <div className={css.productContent}>
            <p className={css.productName}>{data.meta_title}</p>
            <p className={css.productPrice}>{data.price}</p>
            <Button styled="addToCart" rippled onClick={handleAddToCart}>
              Додати у кошик
            </Button>
            <Button styled="addToCart" rippled onClick={handleGoToProducts}>
              До товарів
            </Button>
            <a className={css.productLink} href="tel:+380689811557">
              +38(068) 981-15-57
            </a>
            <p className={css.productLink}>Марія</p>
          </div>
        </div>
        <div className={css.productDescription} ref={myRef}></div>
      </div>
    </main>
  )
}

export default ProductPage
