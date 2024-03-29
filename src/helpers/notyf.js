import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

const notyf = new Notyf({
  duration: 7000,
  types: [
    {
      type: 'error',
      backgroundColor: '#7c7c7c',
      message: 'Ойой, щось пішло не так, будь ласка спробуйте ще раз!',
    },
    {
      type: 'success',
      backgroundColor: '#66B9EB',
    },
  ],
})

export const addToCartSuccess = (name) => {
  notyf.success(`Ви додали ${name} до кошика!`)

  return true
}

export const checkoutSuccess = () => {
  notyf.success("Дякуємо, Ваше замовлення прийняте! Ми з Вами зв'яжемося.")

  return true
}

export const error = (data) => {
  notyf.error(data.message)
}

export const fail = () => {
  notyf.error()
}
