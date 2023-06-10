import React from 'react'
import ReactSelect, { components } from 'react-select'
import AsyncSelect from 'react-select/async'
import search from '../../../assets/search.svg'
import css from './Select.module.css'

const NoOptionsMessage = (props) => {
  return (
    <components.NoOptionsMessage {...props}>
      <span>Нічого не знайдено</span>
    </components.NoOptionsMessage>
  )
}

const DropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <img alt="timezone" src={search} />
      </components.DropdownIndicator>
    )
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
  <div className={`${css.container} ${styled ? css.mb : ''}`}>
    {async ? (
      <AsyncSelect
        components={{ NoOptionsMessage, DropdownIndicator }}
        loadingMessage={() => 'Завантаження...'}
        cacheOptions
        name={name}
        loadOptions={options}
        onChange={onChange}
        placeholder={defaultValue}
        classNamePrefix="modal"
        maxMenuHeight={260}
        menuPlacement="auto"
        value={value}
      />
    ) : (
      <ReactSelect
        components={{ NoOptionsMessage, DropdownIndicator }}
        name={name}
        options={options}
        onChange={onChange}
        placeholder={defaultValue}
        classNamePrefix="modal"
        isSearchable={true}
        maxMenuHeight={260}
        menuPlacement="auto"
        value={value}
        className={css[styled]}
      />
    )}
  </div>
)

export default Select
