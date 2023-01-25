import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  nameError: false,
  shortNameError: false,
  uniqueNameError: false,
  countryError: false,
  timezoneError: false,
  currencyError: false,
  items: [],
  isCartOpen: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setNameError: (state, action) => {
      state.nameError = action.payload
    },
    setShortNameError: (state, action) => {
      state.shortNameError = action.payload
    },
    setUniqueNameError: (state, action) => {
      state.uniqueNameError = action.payload
    },
    setCountryError: (state, action) => {
      state.countryError = action.payload
    },
    setTimezoneError: (state, action) => {
      state.timezoneError = action.payload
    },
    setCurrencyError: (state, action) => {
      state.currencyError = action.payload
    },
    setCartItems: (state, action) => {
      state.items = action.payload
    },
    setIsCartOpen: (state, action) => {
      state.isCartOpen = action.payload
    },
  },
})

export const {
  setNameError,
  setShortNameError,
  setUniqueNameError,
  setCountryError,
  setTimezoneError,
  setCurrencyError,
  setCartItems,
  setIsCartOpen,
} = cartSlice.actions

export default cartSlice.reducer
