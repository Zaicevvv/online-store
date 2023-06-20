import React, { useEffect, useState, useRef } from 'react'
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
  const [pages, setPages] = useState('')
  const [category, setCategory] = useState('')

  const pageTopRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if ((pages && +page > +pages) || !page) return

    dispatch(setIsLoading(true))
    api
      .GET_PRODUCTS(page)
      .then(({ results, products }) => {
        setProducts(
          products.map((el) => ({ ...el, price: el.price.slice(0, -3) })),
        )
        setPages(results.slice(-2).slice(0, 1))
      })
      .finally(() => {
        dispatch(setIsLoading(false))
        pageTopRef.current.scrollIntoView()
      })
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

  const handlePagination = (e) => {
    if (!e.target.value) {
      setPage(e.target.value)
      return
    }
    ;+e.target.value <= +pages &&
      +e.target.value !== 0 &&
      setPage(e.target.value)
  }

  const handlePrev = () => page !== 1 && setPage(+page - 1)

  const handleNext = () => +page < +pages && setPage(+page + 1)

  return (
    <main className={css.main} ref={pageTopRef}>
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
      </div>
      <section className={css.cardList}>
        {products.length > 0 &&
          products.map((product, i) => (
            <Card key={product.product_id} i={i} product={product} />
          ))}
      </section>
      {products.length > 0 ? (
        <div className={css.navFooter}>
          <p className={css.productsPage}>Всього сторінок: {pages}</p>
          <Button onClick={handlePrev}>{'<'}</Button>
          <div className={css.productsPage}>
            Сторінка{' '}
            <Input
              styled="pagination"
              value={page}
              onChange={handlePagination}
            />
          </div>
          <Button onClick={handleNext}>{'>'}</Button>
        </div>
      ) : (
        <h1 className={css.productsEmpty}>Нічого не знайдено</h1>
      )}
    </main>
  )
}

export default ProductsPage
