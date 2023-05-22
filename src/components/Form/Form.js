import React, { useState } from 'react'
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
} from '../../features/cart/cart'
import { useNavigate } from 'react-router-dom'
import ok from '../../assets/ok.svg'
import api from '../../config/api'
import npres from './новаПоштаresponse.json'
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
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onChange = (e) => {
    e.target.name === 'tel' && dispatch(setTelError(false))
    e.target.name === 'lastName' && dispatch(setLastNameError(false))
    e.target.name === 'firstName' && dispatch(setFirstNameError(false))
    e.target.name === 'city' && dispatch(setCityError(false))
    e.target.name === 'spot' && dispatch(setSpotError(false))
    dispatch(setFormData({ ...formData, [e.target.name]: e.target.value }))
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
      !formData.city && dispatch(setCityError(true))
      !formData.spot && dispatch(setSpotError(true))

      return
    }

    if (radio === 'self') dispatch(setFormData({ ...formData, self: true }))
    setDeliveryDetails(!deliveryDetails)
    dispatch(setIsToSent(!isToSent))
  }

  const handleSubmit = (e) => e.preventDefault()

  const handleRadio = (e) => {
    if (e.target.value === 'post')
      dispatch(setFormData({ ...formData, self: false }))
    setRadioError(false)
    dispatch(setRadio(e.target.value))
  }

  const onCityChange = (value) =>
    dispatch(setFormData({ ...formData, city: value }))

  const onCityInput = (value, callback) => {
    if (!value) {
      callback([])
      return
    }
    let options = []
    api.GET_CITIES({ query: value }).then(
      (res) =>
        (options = res.map((el) => {
          return { label: el.Description, value: el.Ref }
        })),
    )

    callback(options)
  }

  const onSpotChange = (value) =>
    dispatch(setFormData({ ...formData, spot: value }))

  const onSpotInput = (value, callback) => {
    if (!value) {
      callback([])
      return
    }
    let options = []
    api.GET_WAREHOUSES({ query: value, ref: formData.city.value }).then(
      (res) =>
        (options = res.map((el) => {
          return { label: el.Description, value: el.Description }
        })),
    )

    callback(options)
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
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
      <div className={`${css.container} ${contactDetails ? css.dn : css.red}`}>
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
        <Button styled="checkout2" onClick={handleContactDetails}>
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
              <p className={css.formTitle}>Населений пункт</p>
              <span className={css.required}>*</span>
              {cityError && (
                <p className={css.error}>Будь ласка оберіть населений пункт</p>
              )}
              <Select
                name="city"
                defaultValue="Введіть населений пункт"
                value={formData.city || ''}
                onChange={onCityChange}
                async
                options={onCityInput}
              />
              {formData.city && (
                <>
                  <p className={css.formTitle}>Відділення</p>
                  <span className={css.required}>*</span>
                  {spotError && (
                    <p className={css.error}>Будь ласка оберіть відділення</p>
                  )}
                  <Select
                    name="spot"
                    defaultValue="Оберіть відділення"
                    value={formData.spot || ''}
                    onChange={onSpotChange}
                    async
                    options={onSpotInput}
                  />
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
        <Button styled="checkout2" onClick={handleDeliveryDetails}>
          Продовжити
        </Button>
      </div>
    </form>
  )
}

export default Form
