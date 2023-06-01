import axios from 'axios'
import { error } from '../helpers/notyf'

const URL = process.env.REACT_APP_BASE_URL

const GET_PRODUCTS = () =>
  axios
    .get(`${URL}/index.php?route=product/category&path=59`)
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

// const LOG_IN = credantials =>
//   axios
//     .post(`${URL}/auth/token/`, credantials)
//     .then(response => {
//       localStorage.setItem('ACCESS_TOKEN', response.data.Token);
//       return response.status;
//     })
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const GET_GOOGLE_LINK = () =>
//   axios
//     .post(
//       `${URL}/google/oauth/url/`,
//       {
//         redirect_uri: `${WEB_URL}/data-sources/google`,
//       },
//       {
//         headers: {
//           Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//         },
//       },
//     )
//     .then(response => response)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const GET_FACEBOOK_LINK = () =>
//   axios
//     .post(
//       `${URL}/facebook/oauth/url/`,
//       {
//         redirect_uri: `${WEB_URL}/data-sources/facebook`,
//       },
//       {
//         headers: {
//           Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//         },
//       },
//     )
//     .then(response => response)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const SEND_GOOGLE_CODE = code =>
//   axios
//     .post(
//       `${URL}/google/oauth/code/exchange/`,
//       {
//         code: code,
//         redirect_uri: `${WEB_URL}/data-sources/google`,
//       },
//       {
//         headers: {
//           Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//         },
//       },
//     )
//     .then(response => response)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const SEND_FACEBOOK_CODE = code =>
//   axios
//     .post(
//       `${URL}/facebook/oauth/code/exchange/`,
//       {
//         code: code,
//         redirect_uri: `${WEB_URL}/data-sources/facebook`,
//       },
//       {
//         headers: {
//           Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//         },
//       },
//     )
//     .then(response => response)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const GET_GOOGLE_DATA_SOURCES_ALL = () =>
//   axios
//     .get(`${URL}/google/account/sources/all/`, {
//       headers: {
//         Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//       },
//     })
//     .then(response => response.data)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const GET_FACEBOOK_DATA_SOURCES = () =>
//   axios
//     .get(`${URL}/facebook/account/sources/`, {
//       headers: {
//         Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//       },
//     })
//     .then(response => response.data)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const DELETE_GOOGLE_DATA_SOURCE = id =>
//   axios
//     .delete(`${URL}/google/account/sources/${id}/delete/`, {
//       headers: {
//         Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//       },
//     })
//     .then(response => response.data)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const GET_ALL_CLIENTS = () =>
//   axios
//     .get(`${URL}/budget/client/list/`, {
//       headers: {
//         Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//       },
//     })
//     .then(response => response.data)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const GET_ACCOUNTS = id =>
//   axios
//     .get(`${URL}/google/account/sources/${id}/`, {
//       headers: {
//         Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//       },
//     })
//     .then(response => response.data)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const GET_CLIENT_DROPDOWNS = () =>
//   axios
//     .get(`${URL}/budget/client/fields/`, {
//       headers: {
//         Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//       },
//     })
//     .then(response => response.data)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const CREATE_CLIENT = formData =>
//   axios
//     .post(`${URL}/budget/client/create/`, formData, {
//       headers: {
//         Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//       },
//     })
//     .then(response => response)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const UPDATE_CLIENT = (id, formData) =>
//   axios
//     .post(`${URL}/budget/client/${id}/update/`, formData, {
//       headers: {
//         Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//       },
//     })
//     .then(response => response)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const GET_CAMPAIGNS = (id, account_id) =>
//   axios
//     .get(`${URL}/google/account/${id}/campaigns/${account_id}/`, {
//       headers: {
//         Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//       },
//     })
//     .then(response => response.data)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const CHECK_BUDGET_NAME = name =>
//   axios
//     .post(
//       `${URL}/budget/check/budget/name/`,
//       { name: name },
//       {
//         headers: {
//           Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//         },
//       },
//     )
//     .then(response => response)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const CHECK_CLIENT_NAME = name =>
//   axios
//     .post(
//       `${URL}/budget/check/client/name/`,
//       { name: name },
//       {
//         headers: {
//           Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//         },
//       },
//     )
//     .then(response => response)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const CREATE_BUDGET = (formData, period) =>
//   axios
//     .post(`${URL}/budget/create/${period ? period : ''}`, formData, {
//       headers: {
//         Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//       },
//     })
//     .then(response => response)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const GET_CLIENT_BUDGET_PACING = () =>
//   axios
//     .get(`${URL}/budget/client/pacing/`, {
//       headers: {
//         Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//       },
//     })
//     .then(response => response.data)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const GET_BUDGET_BUDGET_PACING = () =>
//   axios
//     .get(`${URL}/budget/pacing/`, {
//       headers: {
//         Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//       },
//     })
//     .then(response => response.data)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const LOG_OUT = () =>
//   axios
//     .delete(`${URL}/auth/token/delete/`, {
//       headers: {
//         Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//       },
//     })
//     .then(response => response.data)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const DELETE_CLIENT = id =>
//   axios
//     .delete(`${URL}/budget/client/${id}/delete/`, {
//       headers: {
//         Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//       },
//     })
//     .then(response => response.data)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const DELETE_BUDGET = id =>
//   axios
//     .delete(`${URL}/budget/${id}/delete/`, {
//       headers: {
//         Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//       },
//     })
//     .then(response => response.data)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const GET_CLIENT = id =>
//   axios
//     .get(`${URL}/budget/client/${id}/info/`, {
//       headers: {
//         Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//       },
//     })
//     .then(response => response.data)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const GET_BUDGET = id =>
//   axios
//     .get(`${URL}/budget/${id}/info/`, {
//       headers: {
//         Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//       },
//     })
//     .then(response => response.data)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const GET_GRAPH = type =>
//   // ?type=${type}
//   axios
//     .get(`${URL}/budget/graph/`, {
//       headers: {
//         Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//       },
//     })
//     .then(response => response.data)
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

// const GET_ALL_BUDGETS = () =>
//   axios
//     .get(`${URL}/budget/list/`, {
//       headers: {
//         Authorization: `token ${localStorage.getItem('ACCESS_TOKEN')}`,
//       },
//     })
//     .then(response => console.log(response.data.data))
//     .catch(er => {
//       error(er);
//       er.response.status === 401 && window.location.replace('/login');
//     });

const api = {
  URL,
  GET_PRODUCTS,
  GET_PRODUCT,
  GET_CITIES,
  GET_WAREHOUSES,
}

export default api
