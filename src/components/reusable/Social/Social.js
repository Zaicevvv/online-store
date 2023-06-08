import gmail from '../../../assets/gmail.png'
import instagram from '../../../assets/instagram.png'
import telegram from '../../../assets/telegram.png'
import viber from '../../../assets/viber.png'
import whatsapp from '../../../assets/whatsapp.png'
import css from './Social.module.css'

const Social = ({ footer }) => (
  <ul className={`${css.wrapper} ${footer ? css.footer : ''}`}>
    <li>
      <a className={css.link} href="mailto:vitaline.foodforlife@gmail.co">
        <img className={css.icon} alt="gmail" src={gmail} />
        Email
      </a>
    </li>
    <li>
      <a className={css.link} href="https://instagram.com/vitaline_foodforlife">
        <img className={css.icon} alt="instagram" src={instagram} />
        Instagram
      </a>
    </li>
    <li>
      <a className={css.link} href="/products">
        <img className={css.icon} alt="telegram" src={telegram} />
        Telegram
      </a>
    </li>
    <li>
      <a className={css.link} href="/products">
        <img className={css.icon} alt="viber" src={viber} />
        Viber
      </a>
    </li>
    <li>
      <a className={css.link} href="/products">
        <img className={css.icon} alt="whatsapp" src={whatsapp} />
        WhatsApp
      </a>
    </li>
  </ul>
)

export default Social
