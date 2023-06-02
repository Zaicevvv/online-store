import Social from '../reusable/Social/Social'
import css from './Footer.module.css'

const Footer = () => (
  <footer className={css.footer}>
    <div className={css.wrapper}>
      <Social footer />
      <a className={css.link} href="tel:+380689811557">
        +38(068) 981-15-57 - Марія
      </a>
    </div>
  </footer>
)

export default Footer
