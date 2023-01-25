import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { successBudgetDelete } from '../../../helpers/notyf'
import Button from '../Button/Button'
import css from './Popups.module.css'

const RemoveBudget = () => {
  const dispatch = useDispatch()

  const handleClose = () => {}

  const handleRemove = () => {
    handleClose()
  }

  return (
    <>
      <h1 className={css.title2}>{`Remove ${5} Budget${5 > 1 ? 's' : ''}?`}</h1>
      <p className={css.text}>
        Deleting budgets will remove them from your dashboard and they will no
        longer be tracked.
      </p>
      <div className={css.btnsWrapper}>
        <Button styled="close" title="Cancel" onClick={handleClose} />
        <Button styled="delete" title="Remove" onClick={handleRemove} />
      </div>
    </>
  )
}

export default RemoveBudget
