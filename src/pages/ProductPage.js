import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  setIsCartOpen,
  setCartItems,
  setIsLoading,
} from '../features/cart/cart'
import AnimatedComponent from '../components/AnimatedComponent/AnimatedComponent'
import Button from '../components/reusable/Button/Button'
import api from '../config/api'
import { addToCartSuccess } from '../helpers/notyf'
import css from './pages.module.css'

const ProductPage = () => {
  const [data, setData] = useState({})
  const items = useSelector((state) => state.cart.items)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const myRef = useRef(null)
  const pageTopRef = useRef(null)

  useEffect(() => {
    dispatch(setIsLoading(true))
    api
      .GET_PRODUCT(params.id)
      .then((res) => {
        !res && navigate('/products')
        setData({ ...res, price: res.price.slice(0, -3) })
        myRef.current.innerHTML = `<h1>Опис</h1>  <p>${res.meta_description}</p>  ${res.description}`
        document.title = res.meta_title
      })
      .finally(() => {
        dispatch(setIsLoading(false))
        pageTopRef.current.scrollIntoView()
      })
  }, [params.id, navigate])

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

  const handleGoToProduct = (id, e) =>
    setTimeout(() => {
      navigate(`/product/${id}`)
    }, 300)

  return (
    <AnimatedComponent ref={pageTopRef}>
      <main className={css.main}>
        <div className={css.productMedia}>
          <div className={css.productWrapper}>
            <img className={css.productImg} alt="product" src={data.thumb} />
            <div className={css.productContent}>
              <p className={css.productName}>{data.meta_title}</p>
              <p className={css.productPrice}>{data.price}</p>
              <Button rippled onClick={handleAddToCart}>
                Купити
              </Button>
            </div>
          </div>
          <div className={css.productDescriptionWrapper}>
            <div className={css.productDescription} ref={myRef}></div>
            {Object.keys(data).length > 0 && data.products.length > 0 && (
              <div className={css.productProductsDescription}>
                <h2 className={css.productProductsDescriptionTitle}>
                  З цим товаром також замовляють
                </h2>
                <ul className={css.productProducts}>
                  {data.products.map((item) => (
                    <li
                      key={item.product_id}
                      className={css.productProductsItem}
                    >
                      <img className={css.img} alt="Product" src={item.thumb} />
                      <div className={css.productProductsFooter}>
                        <h2 className={css.productProductsName}>{item.name}</h2>
                        <Button
                          styled="invert"
                          style={{ display: 'block', margin: '0 auto' }}
                          onClick={handleGoToProduct.bind(
                            this,
                            item.product_id,
                          )}
                          rippled
                        >
                          До товару
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </AnimatedComponent>
  )
}

export default ProductPage
