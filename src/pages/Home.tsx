import qs from 'qs'
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../scss/app.scss'
import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import PizzaBlockSkeleton from '../components/PizzaBlockSkeleton'
import Sort from '../components/Sort'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { setParamsToFilter } from '../redux/filter-slice'
import { StatusValues, fetchPizzas } from '../redux/pizza-slice'
import HomeError from './HomeError'

const Home: FC = () => {
  const { categoryId, searchInput, activeSortId, sortFilters } = useAppSelector(state => state.filter)
  const { items, fetchStatus } = useAppSelector(state => state.pizza)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

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
    dispatch(fetchPizzas({ categoryId, activeSortId, sortFilters }))
    window.scrollTo(0, 0)
  }, [dispatch, categoryId, activeSortId, sortFilters])

  useEffect(() => {
    const queryParams = qs.stringify({
      category: categoryId,
      sortBy: sortFilters[activeSortId].sortValue,
    })
    navigate(`?${queryParams}`)
  }, [categoryId, activeSortId, sortFilters, navigate])

  const mockItems = Array.from({ length: 8 }, (_, index) => index)
  const renderSkeletons = mockItems.map(item => <PizzaBlockSkeleton key={item} />)
  const renderPizzas = items
    .filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()))
    .map(item => <PizzaBlock key={item.id} {...item} />)

  return (
    <>
      <div className="content__top">
        <Categories categoryIndex={categoryId} />
        <Sort activeSortId={activeSortId} sortFilters={sortFilters} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {fetchStatus === StatusValues.error && <HomeError />}
      <div className="content__items">{fetchStatus === StatusValues.loading ? renderSkeletons : renderPizzas}</div>
    </>
  )
}

export default Home
