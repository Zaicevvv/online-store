import React, { useState, useEffect, useRef } from 'react';
import './dropdown.scss';
import { useClickOutside } from '../../hooks/useClickOutside';
import { ReactComponent as Arrow } from '../../assets/icons/Arrow_down.svg';
import classNames from 'classnames';

const defaultOptions = [{ name: 'No Options', value: 'No options' }];

export const CustomDropdown = ({
  placeholder,
  formData,
  value,
  onChange,
  options,
  variant, // grey | white | transparent
  variantError = 'topright',
  selectVariant = 'bottom' // bottom | top
}) => {
  const [open, setOpen] = useState(false);
  const [currentOptions, setCurrentOptions] = useState([]);
  const ref = useRef();

  useEffect(() => {
    if (options && options.length) {
      setCurrentOptions(options);
    } else setCurrentOptions(defaultOptions);
  }, [options]);

  useClickOutside(ref, () => {
    setOpen(false);
  });

  const handleChange = (elem) => {
    setOpen(false);
    onChange(elem);
  };

  const onOpen = () => {
    setOpen((prev) => !prev);
  };

  const getOptions = () => {
    let arr = [...currentOptions];

    if (selectVariant === 'top') {
      arr = arr.reverse();
    }
    return arr;
  };

  return (
    <div className={`custom-dropdown ${variant}`} ref={ref}>
      <div
        className={`label-container ${
          formData?.hasError && formData?.touched ? 'label-container_error' : ''
        }`}
        onClick={onOpen}>
        <div className="label">{!value || value === 'No Options' ? placeholder : value}</div>
        {/* {isCancelButton && value && (
          <div className="cancel-options" onClick={handleCancelOption}>
            &#10006;
          </div>
        )}*/}
        <div className={`arrow ${open ? 'arrow_up' : ''}`}>
          <Arrow />
        </div>
      </div>

      {open && (
        <div
          className={classNames(`select ${selectVariant}`, {
            col2: currentOptions.length > 7 && currentOptions.length <= 14,
            col3: currentOptions.length > 14 && currentOptions.length <= 21,
            col4: currentOptions.length > 21 && currentOptions.length <= 28,
            col5: currentOptions.length > 28
          })}>
          {currentOptions.length ? (
            getOptions().map((elem) => {
              return (
                <div key={elem.value} className="select__option" onClick={() => handleChange(elem)}>
                  {elem.name}
                </div>
              );
            })
          ) : (
            <div className="select__option">No results</div>
          )}
        </div>
      )}

      {formData?.hasError && formData?.touched && variantError === 'topright' && (
        <div className="custom-dropdown__topright-err">{formData?.error}</div>
      )}
    </div>
  );
};
