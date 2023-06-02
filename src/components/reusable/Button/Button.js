import React from 'react'
import css from './Button.module.css'

const Button = ({
  type,
  name,
  styled,
  style,
  onClick,
  title,
  children,
  disabled,
  rippled,
}) => {
  const handleClick = (e) => {
    const { target } = e
    if (target.closest('[data-ripple]')) {
      const button = target.closest('[data-ripple]')
      const ripple = document.createElement('span')
      const diameter = Math.max(button.clientWidth, button.clientHeight)
      const radius = diameter / 2

      ripple.style.width = ripple.style.height = `${diameter}px`
      ripple.style.left = `${
        //eslint-disable-next-line
        e.pageX - (button.getBoundingClientRect().left + scrollX) - radius
      }px`
      ripple.style.top = `${
        //eslint-disable-next-line
        e.pageY - (button.getBoundingClientRect().top + scrollY) - radius
      }px`
      ripple.classList.add('ripple')

      //eslint-disable-next-line
      button.dataset.ripple === 'once' && button.querySelector('.ripple')
        ? button.querySelector('.ripple').remove()
        : null

      button.appendChild(ripple)

      const getAnimationDuration = () => {
        const aDuration = window.getComputedStyle(ripple).animationDuration
        return aDuration.includes('ms')
          ? aDuration.replace('ms', '')
          : aDuration.replace('s', '') * 1000
      }

      const timeOut = getAnimationDuration(ripple)

      setTimeout(() => {
        //eslint-disable-next-line
        ripple ? ripple.remove() : null
      }, timeOut)
    }

    onClick()
  }

  return rippled ? (
    <button
      name={name}
      data-ripple="once"
      type={type}
      style={style}
      className={`${css.button} ${css[styled]}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {title}
      {children}
    </button>
  ) : (
    <button
      name={name}
      type={type}
      style={style}
      className={`${css.button} ${css[styled]}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {title}
      {children}
    </button>
  )
}

export default Button
