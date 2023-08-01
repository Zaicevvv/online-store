import React, { useEffect, useRef } from 'react'
import AnimatedComponent from '../components/AnimatedComponent/AnimatedComponent'
import Social from '../components/reusable/Social/Social'
import css from './pages.module.css'

const AboutPage = () => {
  const pageTopRef = useRef(null)

  useEffect(() => {
    document.title = 'Vitaline'
    pageTopRef.current.scrollIntoView()
  }, [])

  return (
    <AnimatedComponent>
      <main className={css.main} ref={pageTopRef}>
        <div className={css.aboutWrapper}>
          <section className={css.aboutInfoSection}>
            <h1 className={css.aboutTitle}>Про нас</h1>
            <article className={css.aboutContainer}>
              <h2 className={css.aboutSubTitle}>
                Компанія Віталайн / Vitaline
              </h2>
              <ul className={css.aboutInfoList}>
                <li className={css.aboutText}>Має власне виробництво.</li>
                <li className={css.aboutText}>
                  Самостійно вирішує питання асортименту.
                </li>
                <li className={css.aboutText}>
                  Більше 25 років успішно працює в Україні та країнах СНД.
                </li>
                <li className={css.aboutText}>Фінансово стабільна.</li>
                <li className={css.aboutText}>
                  Створила науково-консультаційний відділ.
                </li>
                <li className={css.aboutText}>
                  Маркетинг-план Компанії Віталайн на сьогоднішній день один з
                  найбільш лояльних і добре продуманих.
                </li>
                <li className={css.aboutText}>
                  Основне досягнення компанії за роки роботи - це довіра людей
                  до якості продукції і до самої компанії.
                </li>
              </ul>
            </article>
            <article className={css.aboutContainer}>
              <h2 className={css.aboutSubTitle}>Інформація про компанію</h2>
              <div className={css.aboutTextWrapper}>
                <p className={css.aboutText}>Назва:</p>
                <p className={css.aboutText}>Віталайн з США</p>
                <p className={css.aboutText}>Тип компанії:</p>
                <p className={css.aboutText}>
                  Дистриб'ютор / Реселер, Компанія, що надає послуги
                </p>
              </div>
            </article>
            <article className={css.aboutContainer}>
              <h2 className={css.aboutSubTitle}>Інформація про виробництво</h2>
              <div className={css.aboutTextWrapper}>
                <p className={css.aboutText}>Розміри виробничих площ:</p>
                <p className={css.aboutText}>Понад 100000 кв.м.</p>
                <p className={css.aboutText}>Місцезнаходження виробництва:</p>
                <p className={css.aboutText}>США</p>
                <p className={css.aboutText}>Контроль якості:</p>
                <p className={css.aboutText}>Зовнішній та внутрішній</p>
              </div>
            </article>
          </section>
          <section className={css.aboutContactSection}>
            <h2 className={css.aboutTitle}>Контакти</h2>
            <p className={`${css.aboutText} ${css.aboutTextStyle}`}>
              Компанія:{' '}
              <span className={css.aboutSecondaryText}>Віталайн з США</span>
            </p>
            <p className={`${css.aboutText} ${css.aboutTextStyle}`}>
              Телефон: <a href="tel:+380689811557">+38(068)981-15-57</a>
            </p>
            <p className={`${css.aboutText} ${css.aboutTextStyle}`}>
              Контактна особа:{' '}
              <span className={css.aboutSecondaryText}>Марія</span>
            </p>
            <p
              className={`${css.aboutText} ${css.aboutTextStyle} ${css.aboutMB}`}
            >
              Адреса:{' '}
              <span className={css.aboutSecondaryText}>Київ, Україна</span>
            </p>
            <p className={css.aboutTextStyle}>Email та Соціальні мережі:</p>
            <Social />
          </section>
        </div>
      </main>
    </AnimatedComponent>
  )
}

export default AboutPage
