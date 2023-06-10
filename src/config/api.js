import axios from 'axios'
import { error } from '../helpers/notyf'

const URL = process.env.REACT_APP_BASE_URL

const GET_PRODUCTS = (page = 1) =>
  axios
    .get(`${URL}/index.php?route=product/category&path=59&page=${page}`)
    .then((response) => response.data.products)
    .catch((er) => {
      error(er)
    })

const GET_PRODUCT = (id) =>
  axios
    .get(`${URL}/index.php?route=product/product&product_id=${id}`)
    .then((response) => response.data)
    .catch((er) => {
      error(er)
    })

const GET_SEARCHED_PRODUCTS = (search) =>
  axios
    .get(`${URL}/index.php?route=product/search&search=${search}`)
    .then((response) => response.data.products)
    .catch((er) => {
      error(er)
    })

const GET_CITIES = (query) =>
  axios
    .get(`${URL}/index.php?route=checkout/cart/npcities&query=${query}`)
    .then((response) => response.data)
    .catch((er) => {
      error(er)
    })

const GET_WAREHOUSES = (ref) =>
  axios
    .get(`${URL}/index.php?route=checkout/cart/npwarehouses&ref=${ref}`)
    .then((response) => response.data)
    .catch((er) => {
      error(er)
    })

const api = {
  URL,
  GET_PRODUCTS,
  GET_PRODUCT,
  GET_SEARCHED_PRODUCTS,
  GET_CITIES,
  GET_WAREHOUSES,
}

export default api
