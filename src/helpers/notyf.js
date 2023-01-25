import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

const notyf = new Notyf({
  duration: 7000,
  types: [
    {
      type: 'error',
      backgroundColor: 'grey',
      message: 'Whoops, something went wrong, please try again!',
    },
  ],
})

export const addToCartSuccess = (name) => {
  notyf.success(`You have successfully added ${name} to cart!`)

  return true
}

export const error = (data) => {
  notyf.error(data.message)
}

export const fail = () => {
  notyf.error()
}
