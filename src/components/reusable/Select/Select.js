import React from 'react'
import ReactSelect, { components } from 'react-select'
import AsyncSelect from 'react-select/async'
import search from '../../../assets/search.svg'
import css from './Select.module.css'

const customStyles = {
  control: (base) => ({
    ...base,
    background:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))',
    backdropFilter: 'blur(5px)',
    webkitBackdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    borderRadius: '8px',
  }),
  menu: (base) => ({
    ...base,
    background:
      'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
    backdropFilter: 'blur(5px)',
    webkitBackdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    borderRadius: '8px',
  }),
  placeholder: (base) => ({
    ...base,
    color: 'var(--white)',
  }),
  input: (base) => ({
    ...base,
    color: 'var(--white)',
  }),
}

const NoOptionsMessage = (props) => {
  return (
    <components.NoOptionsMessage {...props}>
      <span style={{ color: 'var(--black3)' }}>Нічого не знайдено</span>
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
        styles={styled && customStyles}
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
