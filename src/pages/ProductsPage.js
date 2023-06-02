import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setIsLoading } from '../features/cart/cart'
import Input from '../components/reusable/Input/Input'
import Button from '../components/reusable/Button/Button'
import Card from '../components/Card/Card'
import api from '../config/api'
import css from './pages.module.css'

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    if (search) {
      if (search.length < 3) return

      dispatch(setIsLoading(true))
      api
        .GET_SEARCHED_PRODUCTS(search)
        .then((res) =>
          setProducts(
            res.map((el) => ({ ...el, price: el.price.slice(0, -3) })),
          ),
        )
        .finally(() => dispatch(setIsLoading(false)))

      return
    }

    dispatch(setIsLoading(true))
    api
      .GET_PRODUCTS()
      .then((res) =>
        setProducts(res.map((el) => ({ ...el, price: el.price.slice(0, -3) }))),
      )
      .finally(() => dispatch(setIsLoading(false)))
  }, [search])

  const handleSearch = (e) => setSearch(e.target.value)

  const handleCategory = (e) => console.dir(e.target.name)

  return (
    <main className={css.main}>
      <div className={css.nav}>
        <Input
          styled="search"
          placeholder="Пошук..."
          autofocus
          value={search}
          onChange={handleSearch}
        />
        <div className={css.categories} onClick={handleCategory}>
          <Button styled="category" name="Протизапальне" rippled>
            Протизапальне
          </Button>
          <Button styled="category" name="Протизапальне" rippled>
            Противірусне
          </Button>
          <Button styled="category" name="Протизапальне" rippled>
            Протипаразитарне
          </Button>
        </div>
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
