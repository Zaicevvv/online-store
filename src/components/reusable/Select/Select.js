import React from 'react'
import ReactSelect, { components } from 'react-select'
import AsyncSelect from 'react-select/async'
import css from './Select.module.css'

const NoOptionsMessage = (props) => {
  return (
    <components.NoOptionsMessage {...props}>
      <span>Нічого не знайдено</span>
    </components.NoOptionsMessage>
  )
}

const Select = ({
  options,
  value,
  name,
  onChange,
  styled,
  defaultValue,
  async,
}) => (
  <div className={css.container}>
    {async ? (
      <AsyncSelect
        components={{ NoOptionsMessage }}
        name={name}
        loadOptions={options}
        onChange={(e) => onChange(e)}
        placeholder={defaultValue}
        classNamePrefix="modal"
        maxMenuHeight={260}
        menuPlacement="auto"
        value={value}
      />
    ) : (
      <ReactSelect
        components={{ NoOptionsMessage }}
        name={name}
        options={options}
        onChange={onChange}
        placeholder={defaultValue}
        classNamePrefix="modal"
        isSearchable={true}
        maxMenuHeight={260}
        menuPlacement="auto"
        value={value}
      />
    )}
  </div>
)

export default Select
