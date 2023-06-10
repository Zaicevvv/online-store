import React, { useEffect } from 'react'
import rain from '../parallaxHelpers/rain'
import { mouseMove } from '../parallaxHelpers/mouseTracking'
import { useNavigate } from 'react-router-dom'
import Button from '../components/reusable/Button/Button'
import css from './pages.module.css'

const HomePage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    rain()
  }, [])

  const handleGoToProducts = () =>
    setTimeout(() => {
      navigate('products')
    }, 300)

  return (
    <main className={css.parallax}>
      <section className={css.layers} onMouseMove={mouseMove}>
        <div className={css.layers__container}>
          <div className={`${css.layers__item} ${css.layer_1}`}></div>
          <div className={`${css.layers__item} ${css.layer_2}`}></div>
          <div className={`${css.layers__item} ${css.layer_3}`}>
            <div className={css.hero_content}>
              <h1 className={css.hero_content__title}>
                VITALINE
                <br />
                <span className={css.hero_content__text}>FOOD FOR LIFE</span>
              </h1>
              <Button styled="main" onClick={handleGoToProducts} rippled>
                До товарів
              </Button>
            </div>
          </div>
          <div className={`${css.layers__item} ${css.layer_4}`}>
            <canvas className="rain"></canvas>
          </div>
          <div className={`${css.layers__item} ${css.layer_5}`}></div>
          <div className={`${css.layers__item} ${css.layer_6}`}></div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
