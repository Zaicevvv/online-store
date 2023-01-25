import React from 'react';
import Button from '../Button/Button';
import css from './Popups.module.css';

const Disconnect = ({ onClose, onClick }) => (
  <>
    <h1 className={css.title2}>Disconnect Data Source?</h1>
    <p className={css.text}>
      Removing a data source will remove all of the connected campaigns. Your
      clients and budgets will remain in the dashboard.
      <br />
      <br /> If you wish to remove certain clients, budgets or campaigns then
      you can do this via the relevant view in your dashboard.
    </p>
    <div className={css.btnsWrapper}>
      <Button styled="close" title="Cancel" onClick={onClose} />
      <Button styled="delete" title="Disconnect" onClick={onClick} />
    </div>
  </>
);

export default Disconnect;
