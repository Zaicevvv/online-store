import React from 'react'
import css from './Input.module.css'

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  readOnly,
  styled,
  style,
  required,
}) => (
  <input
    name={name}
    type={type}
    style={style}
    className={`${css.input} ${css[styled]}`}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    readOnly={readOnly}
    required={required}
  />
)

export default Input
