import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setIsLoading } from '../features/cart/cart'
import Card from '../components/Card/Card'
import api from '../config/api'
import css from './pages.module.css'

const ProductsPage = () => {
  const [products, setProducts] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setIsLoading(true))
    api
      .GET_PRODUCTS()
      .then((res) =>
        setProducts(res.map((el) => ({ ...el, price: el.price.slice(0, -3) }))),
      )
      .finally(() => dispatch(setIsLoading(false)))
  }, [])

  return (
    <main className={css.main}>
      <section className={css.cardList}>
        {products.length > 0 &&
          products.map((product, i) => (
            <Card key={product.product_id} i={i} product={product} />
          ))}
      </section>
    </main>
  )
}

export default ProductsPage
