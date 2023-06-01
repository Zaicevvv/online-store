import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  firstNameError: false,
  lastNameError: false,
  telError: false,
  cityError: false,
  spotError: false,
  items: [],
  isCartOpen: false,
  formData: {
    tel: '',
    lastName: '',
    firstName: '',
    city: '',
    spot: '',
    self: false,
  },
  radio: '',
  isToSent: false,
  isLoading: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setFirstNameError: (state, action) => {
      state.firstNameError = action.payload
    },
    setLastNameError: (state, action) => {
      state.lastNameError = action.payload
    },
    setTelError: (state, action) => {
      state.telError = action.payload
    },
    setCityError: (state, action) => {
      state.cityError = action.payload
    },
    setSpotError: (state, action) => {
      state.spotError = action.payload
    },
    setCartItems: (state, action) => {
      state.items = action.payload
    },
    setIsCartOpen: (state, action) => {
      state.isCartOpen = action.payload
    },
    setFormData: (state, action) => {
      state.formData = action.payload
    },
    setRadio: (state, action) => {
      state.radio = action.payload
    },
    setIsToSent: (state, action) => {
      state.isToSent = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const {
  setFirstNameError,
  setLastNameError,
  setTelError,
  setCityError,
  setSpotError,
  setCartItems,
  setIsCartOpen,
  setFormData,
  setRadio,
  setIsToSent,
  setIsLoading,
} = cartSlice.actions

export default cartSlice.reducer
