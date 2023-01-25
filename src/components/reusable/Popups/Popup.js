import React from 'react'
import Disconnect from './Disconnect'
import RemoveBudget from './RemoveBudget'
import css from './Popups.module.css'

const Popup = ({ type, onClose, onClick }) => {
  return (
    <div className={css.overlay}>
      <div className={css.wrapper}>
        {type === 'disconnect' && (
          <Disconnect onClose={onClose} onClick={onClick} />
        )}
        {type === 'removeBudget' && <RemoveBudget />}
      </div>
    </div>
  )
}

export default Popup
