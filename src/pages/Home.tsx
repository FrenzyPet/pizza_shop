import { FC, useEffect, useState } from 'react'
import '../scss/app.scss'
import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import { Pizza } from '../components/PizzaBlock'
import PizzaBlockSkeleton from '../components/PizzaBlockSkeleton'
import Sort from '../components/Sort'

const Home: FC = () => {
  const [items, setItems] = useState<Array<Pizza>>([])
  const [isLoading, setIsLoading] = useState(false)

  const tempItems = Array.from({ length: 12 }, (_, index) => index)

  const getPizza = async () => {
    setIsLoading(true)
    const result = await fetch(
      'https://643347c6582420e2316206a7.mockapi.io/cosmopizza/api/items'
    ).then(response => response.json())
    setItems(result)
    setIsLoading(false)
  }

  useEffect(() => {
    getPizza()
  }, [])

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? tempItems.map(item => <PizzaBlockSkeleton key={item} />)
          : items.map(item => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </>
  )
}

export default Home
