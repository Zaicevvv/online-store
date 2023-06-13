import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setIsLoading } from '../features/cart/cart'
import Input from '../components/reusable/Input/Input'
import Button from '../components/reusable/Button/Button'
import Select from '../components/reusable/Select/Select'
import Card from '../components/Card/Card'
import api from '../config/api'
import css from './pages.module.css'

const options = [
  { label: 'Усі товари', value: 59 },
  { label: 'Протизапальне', value: 11 },
  { label: 'Противірусне', value: 12 },
  { label: 'Протипаразитарне', value: 13 },
]

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(setIsLoading(true))
    api
      .GET_PRODUCTS(page)
      .then((res) =>
        setProducts(res.map((el) => ({ ...el, price: el.price.slice(0, -3) }))),
      )
      .finally(() => dispatch(setIsLoading(false)))
  }, [page])

  const handleSearch = (value, callback) => {
    if (!value) {
      callback([])
      return
    }

    let options = []
    dispatch(setIsLoading(true))
    api
      .GET_SEARCHED_PRODUCTS(value)
      .then((res) => {
        options = res.map((el) => {
          return { label: el.name, value: el.product_id }
        })

        callback(options)
      })
      .finally(() => dispatch(setIsLoading(false)))
  }

  const handleCategory = (value) => {
    if (+value.value === 59) {
      setCategory('')
      // getProducts()

      return
    }

    setCategory(value)
    console.log(value.value)
  }

  const goToProduct = (product) => navigate(`/product/${product.value}`)

  const handlePagination = (e) => setPage(e.target.value)

  return (
    <main className={css.main}>
      <div className={css.nav}>
        <Select
          styled
          defaultValue="Пошук..."
          async
          options={handleSearch}
          onChange={goToProduct}
        />
        {/* <Select
          styled="categories"
          defaultValue="Категорії..."
          onChange={handleCategory}
          options={options}
          value={category}
        /> */}
        <Input value={page} onChange={handlePagination} />
      </div>
      <section className={css.cardList}>
        {products.length > 0 ? (
          products.map((product, i) => (
            <Card key={product.product_id} i={i} product={product} />
          ))
        ) : (
          <h1 className={css.productsEmpty}>Нічого не знайдено</h1>
        )}
      </section>
    </main>
  )
}

export default ProductsPage
