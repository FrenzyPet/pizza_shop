import axios from 'axios'
import qs from 'qs'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../scss/app.scss'
import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import { Pizza } from '../components/PizzaBlock'
import PizzaBlockSkeleton from '../components/PizzaBlockSkeleton'
import Sort from '../components/Sort'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { setParamsToFilter } from '../redux/filter-slice'

export interface Filter {
  name: string
  sort: string
}

const Home: FC = () => {
  const categoryIndex = useAppSelector(state => state.filter.categoryId)
  const search = useAppSelector(state => state.filter.searchInput)
  const activeSortId = useAppSelector(state => state.filter.activeSortId)
  const sortFilters = useAppSelector(state => state.filter.sortFilters)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [items, setItems] = useState<Array<Pizza>>([])
  const [isLoading, setIsLoading] = useState(false)

  const mockItems = Array.from({ length: 8 }, (_, index) => index)

  const getPizza = () => {
    setIsLoading(true)
    axios
      .get(
        `https://643347c6582420e2316206a7.mockapi.io/cosmopizza/api/items?${categoryIndex ? `category=${categoryIndex}` : ''}&sortBy=${
          sortFilters[activeSortId].sortValue
        }`
      )
      .then(response => {
        setItems(response.data)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const { category, sortBy } = params
      const categoryId = Number(category)
      const sortId = sortFilters.find(item => item.sortValue === sortBy)?.id

      if (category && sortId) {
        dispatch(
          setParamsToFilter({
            categoryId,
            sortId,
          })
        )
      }
    }
  }, [dispatch, sortFilters])

  useEffect(() => {
    getPizza()
    window.scrollTo(0, 0)
  }, [categoryIndex, activeSortId])

  useEffect(() => {
    const queryParams = qs.stringify({
      category: categoryIndex,
      sortBy: sortFilters[activeSortId].sortValue,
    })
    navigate(`?${queryParams}`)
  }, [categoryIndex, activeSortId, sortFilters, navigate])

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
