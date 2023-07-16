import gmail from '../../../assets/gmail.png'
import instagram from '../../../assets/instagram.png'
import telegram from '../../../assets/telegram.png'
import viber from '../../../assets/viber.png'
import whatsapp from '../../../assets/whatsapp.png'
import gmail1 from '../../../assets/gmail1.png'
import instagram1 from '../../../assets/instagram1.png'
import telegram1 from '../../../assets/telegram1.png'
import viber1 from '../../../assets/viber1.png'
import whatsapp1 from '../../../assets/whatsapp1.png'
import css from './Social.module.css'

const Social = ({ footer }) => (
  <ul className={`${css.wrapper} ${footer ? css.footer : ''}`}>
    <li>
      <a href="mailto:vitaline.foodforlife@gmail.co">
        <img className={css.icon} alt="gmail" src={footer ? gmail : gmail1} />
      </a>
      <a className={css.link} href="mailto:vitaline.foodforlife@gmail.co">
        Email
      </a>
    </li>
    <li>
      <a href="https://instagram.com/vitaline_foodforlife">
        <img
          className={css.icon}
          alt="instagram"
          src={footer ? instagram : instagram1}
        />
      </a>
      <a className={css.link} href="https://instagram.com/vitaline_foodforlife">
        Instagram
      </a>
    </li>
    <li>
      <a href="/products">
        <img
          className={css.icon}
          alt="telegram"
          src={footer ? telegram : telegram1}
        />
      </a>
      <a className={css.link} href="/products">
        Telegram
      </a>
    </li>
    <li>
      <a href="/products">
        <img className={css.icon} alt="viber" src={footer ? viber : viber1} />
      </a>
      <a className={css.link} href="/products">
        Viber
      </a>
    </li>
    <li>
      <a href="/products">
        <img
          className={css.icon}
          alt="whatsapp"
          src={footer ? whatsapp : whatsapp1}
        />
      </a>
      <a className={css.link} href="/products">
        WhatsApp
      </a>
    </li>
  </ul>
)

export default Social
