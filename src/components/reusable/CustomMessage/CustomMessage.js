import React, { useEffect, useState } from 'react';
import './message.scss';
import classNames from 'classnames';
import CSSTransition from 'react-transition-group/cjs/CSSTransition';

const CustomMessage = ({ children, isError = false }) => {
  return (
    <div className={classNames('custom-message', { 'custom-message--error': isError })}>
      {children}
    </div>
  );
};

export default CustomMessage;
