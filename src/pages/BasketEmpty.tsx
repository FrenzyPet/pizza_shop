import { FC } from 'react'
import { Link } from 'react-router-dom'
import basketEmptyimg from '../assets/img/empty-cart.png'

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
        <img src={basketEmptyimg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  )
}

export default BasketEmpty
