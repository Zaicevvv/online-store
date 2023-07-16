import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setIsLoading } from '../features/cart/cart'
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
  const [pages, setPages] = useState([])
  const [category, setCategory] = useState('')

  const pageTopRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(setIsLoading(true))
    api
      .GET_PRODUCTS(page)
      .then(({ results, products }) => {
        setProducts(
          products.map((el) => ({ ...el, price: el.price.slice(0, -3) })),
        )
        let pagesArr = []
        for (let i = 1; i <= +results.slice(-2).slice(0, 1); i++) {
          pagesArr.push(i)
        }
        setPages(pagesArr)
        document.title = 'Vitaline'
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

  const handlePagination = (page, e) => setPage(page)

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
          {pages.map((el) => (
            <Button
              key={el}
              styled={+page === +el ? 'green' : null}
              onClick={handlePagination.bind(this, el)}
              rippled
            >
              {el}
            </Button>
          ))}
        </div>
      ) : (
        <h1 className={css.productsEmpty}>Нічого не знайдено</h1>
      )}
    </main>
  )
}

export default ProductsPage
