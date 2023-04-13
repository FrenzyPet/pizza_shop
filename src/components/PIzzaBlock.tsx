import { FC, useState } from 'react'
import { v1 } from 'uuid'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { addPizza } from '../redux/basket-slice'

export interface Pizza {
  id: number
  imageUrl: string
  name: string
  types: Array<number>
  sizes: Array<number>
  price: number
  category: number
  rating: number
}

const PizzaBlock: FC<Pizza> = ({ id, name, price, imageUrl, sizes, types }) => {
  const typesName = ['тонкое', 'традиционное']
  const [activeSize, setActiveSize] = useState<number>(0)
  const [activeType, setActiveType] = useState<number>(0)
  const dispatch = useAppDispatch()
  const items = useAppSelector(state => state.basket.items)

  const totalCount = items.filter(item => item.id === id).reduce((acc, item) => acc + item.count, 0)

  const getPrice = () => {
    let resultPrice = price

    resultPrice += activeType === 0 ? 0 : price * 0.1
    resultPrice += activeSize === 0 ? 0 : activeSize === 1 ? price * 0.1 : price * 0.2

    return Math.round(resultPrice)
  }

  const onAddPizza = () => {
    const pizzaItem = {
      id,
      name,
      imageUrl,
      price: getPrice(),
      type: activeType,
      size: activeSize,
      model: String(id) + String(activeType) + String(activeSize),
      count: 0,
    }
    dispatch(addPizza(pizzaItem))
  }
  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((item, index) => (
            <li key={v1()} onClick={() => setActiveType(index)} className={activeType === index ? 'active' : ''}>
              {typesName[item]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((item, index) => (
            <li key={v1()} onClick={() => setActiveSize(index)} className={activeSize === index ? 'active' : ''}>
              {item} см
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button onClick={onAddPizza} className="button button--outline button--add">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {totalCount > 0 && <i>{totalCount}</i>}
        </button>
      </div>
    </div>
  )
}

export default PizzaBlock
