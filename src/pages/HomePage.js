import React, { useEffect } from 'react'
import rain from '../parallaxHelpers/rain'
import { mouseMove } from '../parallaxHelpers/mouseTracking'
import { useNavigate } from 'react-router-dom'
import AnimatedComponent from '../components/AnimatedComponent/AnimatedComponent'
import scroll from '../assets/scroll.svg'
import touchmove from '../assets/touchmove.svg'
import css from './pages.module.css'

const HomePage = () => {
  const navigate = useNavigate()

  let w = window.innerWidth

  const handleGoToProducts = () =>
    setTimeout(() => {
      navigate('products')
    }, 300)

  useEffect(() => {
    rain()
    document.title = 'Vitaline'

    const handleScroll = (e) => {
      e.type === 'keydown' && e.code === 'ArrowDown' && handleGoToProducts()
      e.type === 'touchmove' && handleGoToProducts()
      e.deltaY > 0 && handleGoToProducts()
    }

    window.addEventListener('wheel', handleScroll)
    window.addEventListener('touchmove', handleScroll)
    window.addEventListener('keydown', handleScroll)

    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchmove', handleScroll)
      window.removeEventListener('keydown', handleScroll)
    }
  }, [])

  return (
    <AnimatedComponent>
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
                <img
                  className={css.scrollImg}
                  alt="Scroll down"
                  src={w < 768 ? touchmove : scroll}
                />
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
    </AnimatedComponent>
  )
}

export default HomePage
