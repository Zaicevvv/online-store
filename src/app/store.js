import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cart'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
