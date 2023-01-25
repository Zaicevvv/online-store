import React from 'react'
import css from './Modals.module.css'

const Modal = ({
  type,
  mode,
  data,
  options,
  onGoogleLogin,
  onSubmit,
  onChange,
  onCheckbox,
  onCancel,
}) => (
  <div className={css.wrapper}>
    <h1>Modal</h1>
  </div>
)

export default Modal
