import Social from '../components/reusable/Social/Social'
import css from './pages.module.css'

const AboutPage = () => (
  <main className={css.main}>
    <div className={css.aboutWrapper}>
      <section className={css.aboutInfoSection}>
        <h1 className={css.aboutTitle}>Про нас</h1>
        <article className={css.aboutContainer}>
          <p className={css.aboutText}>
            Компанія Віталайн має власне виробництво.
          </p>
          <p className={css.aboutText}>
            Компанія Віталайн самостійно вирішує питання асортименту.
          </p>
          <p className={css.aboutText}>
            Компанія Віталайн більше 25 років успішно працює в Україні та
            країнах СНД.
          </p>
          <p className={css.aboutText}>
            Компанія Віталайн фінансово стабільна.
          </p>
          <p className={css.aboutText}>
            Компанія Віталайн створила науково-консультаційний відділ.
          </p>
          <p className={css.aboutText}>
            Маркетинг-план Компанії Віталайн на сьогоднішній день один з
            найбільш лояльних і добре продуманих.
          </p>
          <p className={css.aboutText}>
            Основне досягнення компанії за роки роботи - це довіра людей до
            якості продукції і до самої компанії.
          </p>
        </article>
        <article className={css.aboutContainer}>
          <h2 className={css.aboutSubTitle}>Інформація про компанію</h2>
          <p className={css.aboutText}>Назва: Віталайн з США</p>
          <p className={css.aboutText}>
            Тип компанії: Дистриб'ютор / Реселер, Компанія, що надає послуги
          </p>
        </article>
        <article className={css.aboutContainer}>
          <h2 className={css.aboutSubTitle}>Інформація про виробництво</h2>
          <p className={css.aboutText}>
            Розміри виробничих площ: Понад 100000 кв.м.
          </p>
          <p className={css.aboutText}>Місцезнаходження виробництва: США</p>
          <p className={css.aboutText}>
            Контроль якості: Зовнішній та внутрішній
          </p>
        </article>
      </section>
      <section className={css.aboutContactSection}>
        <h2 className={css.aboutTitle}>Контакти</h2>
        <p className={css.aboutText}>Компанія: Віталайн з США</p>
        <p className={css.aboutText}>
          Телефон:{' '}
          <a className={css.tel} href="tel:+380689811557">
            +38(068)981-15-57
          </a>
        </p>
        <p className={css.aboutText}>Контактна особа: Марія</p>
        <p className={css.aboutText}>Адреса: Київ, Україна</p>
        <p>Email та Соціальні мережі:</p>
        <Social />
      </section>
    </div>
  </main>
)

export default AboutPage
