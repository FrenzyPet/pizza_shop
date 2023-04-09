import { FC } from 'react'
import './scss/app.scss'
import pizzas from './assets/img/pizzaList.json'
import Categories from './components/Categories'
import Header from './components/Header'
import PizzaBlock from './components/PizzaBlock'
import Sort from './components/Sort'

const App: FC = () => {
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
            {pizzas.map(item => (
              <PizzaBlock key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
