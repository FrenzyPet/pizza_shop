import { FC, useState } from 'react'
import ModalWindow from '../components/ModalWindow/ModalWindow'
import { useAppDispatch } from '../hooks/hooks'
import { PizzaItem, decreasePizzaAmount, increasePizzaAmount, removePizza } from '../redux/basket-slice'

const BasketItem: FC<PizzaItem> = ({ imageUrl, name, price, size, type, model, count }) => {
  const typesName = ['тонкое', 'традиционное']
  const pizzaSizes = [26, 30, 40]
  const [showRemovePizzaModal, setShowRemovePizzaModal] = useState(false)

  const dispatch = useAppDispatch()

  const removeButtonHandler = () => {
    setShowRemovePizzaModal(true)
  }
  const finalRemoveButtonHandler = () => {
    setShowRemovePizzaModal(false)
    dispatch(removePizza(model))
  }

  const increaseButtonHandler = () => {
    dispatch(increasePizzaAmount(model))
  }

  const decreaseButtonHandler = () => {
    if (count > 1) {
      dispatch(decreasePizzaAmount(model))
    } else {
      dispatch(removePizza(model))
    }
  }
  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{name}</h3>
        <p>
          {typesName[type]}, {pizzaSizes[size]} см.
        </p>
      </div>
      <div className="cart__item-count">
        <DecrementButton handler={decreaseButtonHandler} />
        <b>{count}</b>
        <IncrementButton handler={increaseButtonHandler} />
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div className="cart__item-remove">
        <DeleteButton handler={removeButtonHandler} />
      </div>
      <ModalWindow active={showRemovePizzaModal} setActive={setShowRemovePizzaModal}>
        <div>
          <p>Вы точно хотите удалить пиццу?</p>
          <button className="button" onClick={finalRemoveButtonHandler}>
            Удалить
          </button>
        </div>
      </ModalWindow>
    </div>
  )
}

const IncrementButton: FC<ButtonProps> = ({ handler }) => {
  return (
    <button onClick={handler} className="button button--outline button--circle cart__item-count-plus">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
          fill="#EB5A1E"
        ></path>
        <path
          d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
          fill="#EB5A1E"
        ></path>
      </svg>
    </button>
  )
}

const DecrementButton: FC<ButtonProps> = ({ handler }) => {
  return (
    <button onClick={handler} className="button button--outline button--circle cart__item-count-minus">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
          fill="#EB5A1E"
        ></path>
        <path
          d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
          fill="#EB5A1E"
        ></path>
      </svg>
    </button>
  )
}

interface ButtonProps {
  handler: () => void
}

const DeleteButton: FC<ButtonProps> = ({ handler }) => {
  return (
    <button onClick={handler} className="button button--outline button--circle">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
          fill="#EB5A1E"
        ></path>
        <path
          d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
          fill="#EB5A1E"
        ></path>
      </svg>
    </button>
  )
}

export default BasketItem
