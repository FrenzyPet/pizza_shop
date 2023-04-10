import { FC, useEffect, useState } from 'react'
import './scss/app.scss'
import Categories from './components/Categories'
import Header from './components/Header'
import PizzaBlock from './components/PizzaBlock'
import { Pizza } from './components/PizzaBlock'
import Sort from './components/Sort'

const App: FC = () => {
  const [items, setItems] = useState<Array<Pizza>>([])

  const getPizza = () => {
    fetch('https://643347c6582420e2316206a7.mockapi.io/cosmopizza/api/items')
      .then(response => response.json())
      .then(data => setItems(data))
  }

  useEffect(() => {
    getPizza()
  }, [])
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map(item => (
              <PizzaBlock key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
