import React, { useState, useEffect } from 'react'
import { PhoneInput } from '@ua-opendata/react-phone-input'
import Button from '../reusable/Button/Button'
import Input from '../reusable/Input/Input'
import Select from '../reusable/Select/Select'
import { useSelector, useDispatch } from 'react-redux'
import {
  setFormData,
  setFirstNameError,
  setLastNameError,
  setTelError,
  setCityError,
  setSpotError,
  setRadio,
  setIsToSent,
  setIsLoading,
} from '../../features/cart/cart'
import { useNavigate } from 'react-router-dom'
import ok from '../../assets/ok.svg'
import api from '../../config/api'
import css from './Form.module.css'

const Form = () => {
  const {
    formData,
    telError,
    firstNameError,
    lastNameError,
    cityError,
    spotError,
    radio,
    isToSent,
  } = useSelector((state) => state.cart)
  const [contactDetails, setContactDetails] = useState(false)
  const [deliveryDetails, setDeliveryDetails] = useState(false)
  const [radioError, setRadioError] = useState(false)
  const [spots, setSpots] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (formData.tel && formData.firstName && formData.lastName)
      setContactDetails(true)
    if (radio) {
      if (formData.self === true) {
        setDeliveryDetails(true)
        dispatch(setIsToSent(true))
      }
      if (formData.city && formData.spot) {
        setDeliveryDetails(true)
        dispatch(setIsToSent(true))
      }
    }
  }, [])

  const onChange = (e) => {
    e.target.name === 'tel' && dispatch(setTelError(false))
    e.target.name === 'lastName' && dispatch(setLastNameError(false))
    e.target.name === 'firstName' && dispatch(setFirstNameError(false))
    e.target.name === 'city' && dispatch(setCityError(false))
    e.target.name === 'spot' && dispatch(setSpotError(false))
    dispatch(setFormData({ ...formData, [e.target.name]: e.target.value }))
    localStorage.setItem(
      'formData',
      JSON.stringify({ ...formData, [e.target.name]: e.target.value }),
    )
  }

  const handleContactDetails = () => {
    if (!formData.tel || !formData.firstName || !formData.lastName) {
      !formData.tel && dispatch(setTelError(true))
      !formData.firstName && dispatch(setFirstNameError(true))
      !formData.lastName && dispatch(setLastNameError(true))

      return
    }
    setContactDetails(!contactDetails)
  }

  const handleDeliveryDetails = () => {
    if (!radio) {
      setRadioError(true)

      return
    }

    if (radio === 'post' && (!formData.city || !formData.spot)) {
      if (!formData.city) return dispatch(setCityError(true))
      if (!formData.spot) return dispatch(setSpotError(true))

      return
    }

    if (radio === 'self') {
      dispatch(setFormData({ ...formData, self: true }))
      localStorage.setItem(
        'formData',
        JSON.stringify({ ...formData, self: true }),
      )
    }
    setDeliveryDetails(!deliveryDetails)
    dispatch(setIsToSent(!isToSent))
  }

  const handleRadio = (e) => {
    if (e.target.value === 'post') {
      dispatch(setFormData({ ...formData, self: false }))
      localStorage.setItem(
        'formData',
        JSON.stringify({ ...formData, self: false }),
      )
    }
    setRadioError(false)
    dispatch(setRadio(e.target.value))
    localStorage.setItem('radio', JSON.stringify(e.target.value))
  }

  const onCityChange = (value) => {
    dispatch(setFormData({ ...formData, city: value }))
    localStorage.setItem(
      'formData',
      JSON.stringify({ ...formData, city: value }),
    )

    let warehouses = []
    dispatch(setIsLoading(true))
    api
      .GET_WAREHOUSES(value.value)
      .then((res) => {
        warehouses = res.map((el) => {
          return { label: el.Description, value: el.Number }
        })

        setSpots(warehouses)
      })
      .finally(() => dispatch(setIsLoading(false)))
  }

  const handleCityChange = () => {
    dispatch(setFormData({ ...formData, city: '', spot: '' }))
    localStorage.setItem(
      'formData',
      JSON.stringify({ ...formData, city: '', spot: '' }),
    )
  }

  const handleSpotChange = () => {
    dispatch(setFormData({ ...formData, spot: '' }))
    localStorage.setItem('formData', JSON.stringify({ ...formData, spot: '' }))
  }

  const onCityInput = (value, callback) => {
    if (value) dispatch(setCityError(false))
    if (!value || value.length < 3) {
      callback([])
      return
    }

    let options = []
    dispatch(setIsLoading(true))
    api
      .GET_CITIES(value)
      .then((res) => {
        options = res.map((el) => {
          return { label: el.Description, value: el.Ref }
        })

        callback(options)
      })
      .finally(() => dispatch(setIsLoading(false)))
  }

  const onSpotChange = (value) => {
    dispatch(setSpotError(false))
    dispatch(setFormData({ ...formData, spot: value }))
    localStorage.setItem(
      'formData',
      JSON.stringify({ ...formData, spot: value }),
    )
  }

  return (
    <form className={css.form}>
      <div className={css.formHeader}>
        <div className={css.formHeaderContainer}>
          {!contactDetails ? (
            <div className={css.number}>1</div>
          ) : (
            <img className={css.complete} src={ok} alt="complete" />
          )}
          <h2 className={css.mainTitle}>Контактні дані</h2>
          <span className={css.required}>*</span>
        </div>
        {contactDetails && (
          <Button styled="change" onClick={handleContactDetails}>
            Змінити
          </Button>
        )}
      </div>
      <div
        className={`${css.container} ${contactDetails ? css.dn : css.red} ${
          formData.tel && formData.firstName && formData.lastName
            ? css.green
            : ''
        }`}
      >
        <p className={css.formTitle}>Телефон</p>
        <span className={css.required}>*</span>
        {telError && (
          <p className={css.error}>
            Будь ласка введіть правильний номер телефону
          </p>
        )}
        <PhoneInput
          className={css.telInput}
          name="tel"
          placeholder="+38 (0__) ___-__-__"
          value={formData.tel || ''}
          onChange={onChange}
        />
        <p className={css.formTitle}>Прізвище</p>
        <span className={css.required}>*</span>
        {lastNameError && (
          <p className={css.error}>Будь ласка введіть Прізвище</p>
        )}
        <Input
          name="lastName"
          type="text"
          placeholder="Введіть Прізвище кирилицею"
          value={formData.lastName || ''}
          onChange={onChange}
        />
        <p className={css.formTitle}>Ім'я</p>
        <span className={css.required}>*</span>
        {firstNameError && <p className={css.error}>Будь ласка введіть Ім'я</p>}
        <Input
          name="firstName"
          type="text"
          placeholder="Введіть Ім'я кирилицею"
          value={formData.firstName || ''}
          onChange={onChange}
        />
        <Button
          styled={
            formData.tel && formData.firstName && formData.lastName
              ? 'checkout2'
              : 'disabled2'
          }
          onClick={handleContactDetails}
        >
          Продовжити
        </Button>
      </div>
      {contactDetails && (
        <div className={css.formHeader}>
          <div className={css.formHeaderContainer}>
            {!deliveryDetails ? (
              <div className={css.number}>2</div>
            ) : (
              <img className={css.complete} alt="complete" src={ok} />
            )}
            <h2 className={css.mainTitle}>Доставка</h2>
            <span className={css.required}>*</span>
          </div>
          {deliveryDetails && (
            <Button styled="change" onClick={handleDeliveryDetails}>
              Змінити
            </Button>
          )}
        </div>
      )}
      <div
        className={`${css.container} ${
          deliveryDetails || !contactDetails ? css.dn : css.red
        } ${
          radio === 'self' ||
          (formData.city && formData.spot && radio === 'post')
            ? css.green
            : ''
        }`}
      >
        <div className={css.radioGroup}>
          <h2
            className={`${css.mainTitle} ${radioError ? css.radioError : ''}`}
          >
            Будь ласка оберіть спосіб доставки
          </h2>
          <div className={css.radio}>
            <input
              type="radio"
              id="deliveryChoice1"
              name="delivery"
              value="post"
              onChange={handleRadio}
              checked={radio === 'post'}
            />
            <label className={css.label} htmlFor="deliveryChoice1">
              Нова Пошта
            </label>
          </div>
          {radio === 'post' && (
            <div className={css.post}>
              <p className={`${css.formTitle} ${css.small}`}>Населений пункт</p>
              <span className={css.required}>*</span>
              {formData.city && (
                <Button styled="change" onClick={handleCityChange}>
                  Змінити
                </Button>
              )}
              {cityError && (
                <p className={css.error}>Будь ласка оберіть населений пункт</p>
              )}
              {formData.city ? (
                <p className={css.selected}>{formData.city.label}</p>
              ) : (
                <Select
                  name="city"
                  defaultValue="Введіть населений пункт (мінімум три літери)"
                  value={formData.city || ''}
                  onChange={onCityChange}
                  async
                  options={onCityInput}
                />
              )}
              {formData.city && (
                <>
                  <p className={`${css.formTitle} ${css.small}`}>Відділення</p>
                  <span className={css.required}>*</span>
                  {formData.spot && (
                    <Button styled="change" onClick={handleSpotChange}>
                      Змінити
                    </Button>
                  )}
                  {spotError && (
                    <p className={css.error}>Будь ласка оберіть відділення</p>
                  )}
                  {formData.spot ? (
                    <p className={css.selected}>{formData.spot.label}</p>
                  ) : (
                    <Select
                      name="spot"
                      defaultValue="Оберіть відділення"
                      value={formData.spot || ''}
                      onChange={onSpotChange}
                      options={spots}
                    />
                  )}
                </>
              )}
            </div>
          )}
          <div className={css.radio}>
            <input
              type="radio"
              id="deliveryChoice2"
              name="delivery"
              value="self"
              onChange={handleRadio}
              checked={radio === 'self'}
            />
            <label className={css.label} htmlFor="deliveryChoice2">
              Самовивіз
            </label>
          </div>
        </div>
        <Button
          styled={
            radio === 'self' || (formData.city && formData.spot)
              ? 'checkout2'
              : 'disabled2'
          }
          onClick={handleDeliveryDetails}
        >
          Продовжити
        </Button>
      </div>
    </form>
  )
}

export default Form
