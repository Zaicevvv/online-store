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
      backgroundColor: '#AA6FA8',
    },
  ],
})

export const addToCartSuccess = (name) => {
  notyf.success(`Ви успішно добавили ${name} до кошика!`)

  return true
}

export const error = (data) => {
  notyf.error(data.message)
}

export const fail = () => {
  notyf.error()
}
