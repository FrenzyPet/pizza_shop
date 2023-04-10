import { FC, useEffect, useState } from 'react'
import '../scss/app.scss'
import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import { Pizza } from '../components/PizzaBlock'
import PizzaBlockSkeleton from '../components/PizzaBlockSkeleton'
import Sort from '../components/Sort'

export interface Filter {
  name: string
  sort: string
}

const Home: FC = () => {
  const [items, setItems] = useState<Array<Pizza>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [categoryIndex, setCategoryIndex] = useState<number>(0)
  const [activeSort, setActiveSort] = useState<number>(0)
  const sortFilters: Array<Filter> = [
    { name: 'популярности', sort: 'rating' },
    { name: 'цене', sort: 'price' },
    { name: 'алфавиту', sort: 'name' },
  ]

  const tempItems = Array.from({ length: 12 }, (_, index) => index)

  const getPizza = () => {
    setIsLoading(true)
    fetch(
      `https://643347c6582420e2316206a7.mockapi.io/cosmopizza/api/items?${
        categoryIndex ? `category=${categoryIndex}` : ''
      }&sortBy=${sortFilters[activeSort].sort}`
    )
      .then(response => response.json())
      .then(data => {
        setItems(data)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getPizza()
    window.scrollTo(0, 0)
  }, [categoryIndex, activeSort])

  return (
    <>
      <div className="content__top">
        <Categories categoryIndex={categoryIndex} setCategoryIndex={setCategoryIndex} />
        <Sort activeSort={activeSort} setActiveSort={setActiveSort} sortFilters={sortFilters} />
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
