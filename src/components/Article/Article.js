import React, { useEffect, useRef } from 'react'
import Button from '../reusable/Button/Button'
import css from './Article.module.css'

const Article = ({ el, active, handleToggle, goToProduct }) => {
  const myRef = useRef(null)

  useEffect(() => {
    myRef.current.innerHTML = el.article
  }, [])

  return (
    <li>
      <article className={css.article}>
        <div
          className={`${css.article_trigger} ${
            active.find((i) => +i === +el.id) ? css.article_trigger__active : ''
          }`}
          onClick={handleToggle.bind(this, el.id)}
        ></div>
        <div className={css.article_header}>
          <img
            className={css.article_img}
            alt="product"
            src={el.img}
            onClick={el.product_id && goToProduct.bind(this, el.product_id)}
            style={el.product_id ? { cursor: 'pointer' } : null}
          />
          <div className={css.article_header__text}>
            <h2 className={css.article_header__title}>{el.title}</h2>
            <div className={css.article_header__btns}>
              <Button
                styled="invert"
                onClick={handleToggle.bind(this, el.id)}
                rippled
              >
                {active.find((i) => +i === +el.id)
                  ? 'Закрити статтю'
                  : 'Читати статтю'}
              </Button>
            </div>
          </div>
        </div>
        <div
          className={`${css.article_text__wrapper} ${
            active.find((i) => +i === +el.id)
              ? css.article_text__wrapper__active
              : ''
          }`}
        >
          <div className={css.article_text} ref={myRef}></div>
        </div>
      </article>
    </li>
  )
}

export default Article
