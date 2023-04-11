import { FC, useEffect, useState } from 'react'
import '../scss/app.scss'
import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import { Pizza } from '../components/PizzaBlock'
import PizzaBlockSkeleton from '../components/PizzaBlockSkeleton'
import Sort from '../components/Sort'
import { useAppSelector } from '../hooks/hooks'

export interface Filter {
  name: string
  sort: string
}

const Home: FC = () => {
  const categoryIndex = useAppSelector(state => state.filter.categoryId)
  const search = useAppSelector(state => state.filter.searchInput)
  const activeSortId = useAppSelector(state => state.filter.activeSortId)
  const sortFilters = useAppSelector(state => state.filter.sortFilters)

  const [items, setItems] = useState<Array<Pizza>>([])
  const [isLoading, setIsLoading] = useState(false)

  const mockItems = Array.from({ length: 8 }, (_, index) => index)

  const getPizza = () => {
    setIsLoading(true)
    fetch(
      `https://643347c6582420e2316206a7.mockapi.io/cosmopizza/api/items?${
        categoryIndex ? `category=${categoryIndex}` : ''
      }&sortBy=${sortFilters[activeSortId].sortValue}`
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
  }, [categoryIndex, activeSortId])

  const renderPizzas = items
    .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    .map(item => <PizzaBlock key={item.id} {...item} />)

  const renderSkeletons = mockItems.map(item => <PizzaBlockSkeleton key={item} />)

  return (
    <>
      <div className="content__top">
        <Categories categoryIndex={categoryIndex} />
        <Sort activeSortId={activeSortId} sortFilters={sortFilters} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? renderSkeletons : renderPizzas}</div>
    </>
  )
}

export default Home
