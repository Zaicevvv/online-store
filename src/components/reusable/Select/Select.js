import React from 'react'
import ReactSelect, { components } from 'react-select'
import css from './Select.module.css'

// const DropdownIndicator = props => {
//   return (
//     components.DropdownIndicator && (
//       <components.DropdownIndicator {...props}>
//         <img alt="timezone" src={calendar} />
//       </components.DropdownIndicator>
//     )
//   );
// };

const Select = ({ options, value, name, onChange, styled, defaultValue }) => (
  <div className={css.container}>
    <ReactSelect
      // components={styled ? { DropdownIndicator } : null}
      name={name}
      options={options}
      onChange={onChange}
      placeholder={defaultValue}
      classNamePrefix="modal"
      styles={{
        singleValue: () => ({
          gridArea: '1/1/2/3',
          color: 'var(--gray2)',
          margin: '0 20px',
          fontSize: '16px',
          lineHeight: '19px',
        }),
        placeholder: () => ({
          gridArea: '1/1/2/3',
          color: 'var(--gray)',
          margin: '0 20px',
          fontSize: '16px',
          lineHeight: '19px',
        }),
        input: () => ({
          gridArea: '1/1/auto/auto',
          color: 'var(--gray2)',
          margin: '0 20px',
          fontSize: '16px',
          lineHeight: '19px',
        }),
        menu: () => ({
          width: '50%',
          zIndex: 222,
          backgroundColor: 'var(--white)',
          boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.05)',
          borderRadius: '8px',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '16px',
          color: 'var(--gray2)',
        }),
        menuPortal: (base) => ({
          ...base,
          zIndex: 9999,
        }),
      }}
      // menuPortalTarget={document.querySelector('main')}
      isSearchable={true}
      maxMenuHeight={260}
      menuPlacement="auto"
      value={value}
    />
  </div>
)

export default Select
