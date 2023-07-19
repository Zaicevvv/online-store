import gmail from '../../../assets/gmail.png'
import instagram from '../../../assets/instagram.png'
import telegram from '../../../assets/telegram.png'
import viber from '../../../assets/viber.png'
import whatsapp from '../../../assets/whatsapp.png'
import css from './Social.module.css'

const Social = ({ footer }) => (
  <ul className={css.wrapper}>
    <li>
      <a href="mailto:vitaline.foodforlife@gmail.co">
        <img className={css.icon} alt="gmail" src={gmail} />
      </a>
    </li>
    <li>
      <a href="https://instagram.com/vitaline_foodforlife">
        <img className={css.icon} alt="instagram" src={instagram} />
      </a>
    </li>
    <li>
      <a href="/products">
        <img className={css.icon} alt="telegram" src={telegram} />
      </a>
    </li>
    <li>
      <a href="/products">
        <img className={css.icon} alt="viber" src={viber} />
      </a>
    </li>
    <li>
      <a href="/products">
        <img className={css.icon} alt="whatsapp" src={whatsapp} />
      </a>
    </li>
  </ul>
)

export default Social
