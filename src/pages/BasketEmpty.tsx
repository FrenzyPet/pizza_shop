import { FC } from 'react'
import { Link } from 'react-router-dom'
import basketEmptyImg from '../assets/img/empty-cart.png'

const BasketEmpty: FC = () => {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>Корзина пустая 😕</h2>
        <p>
          Ну давай, закажи что-нибудь.
          <br />
          Вся вкусная пицца на главной странице.
        </p>
        <img src={basketEmptyImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Вернуться на главную</span>
        </Link>
      </div>
    </div>
  )
}

export default BasketEmpty
