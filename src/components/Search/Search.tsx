import debounce from 'lodash.debounce'
import { ChangeEvent, FC, useCallback, useRef, useState } from 'react'
import clearIcon from '../../assets/img/clear-icon.svg'
import searchIcon from '../../assets/img/search-icon.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { setSearchInput } from '../../redux/filter-slice'
import style from './Search.module.scss'

const Search: FC = () => {
  const [localSearch, setLocalSearch] = useState<string>('')
  const search = useAppSelector(state => state.filter.searchInput)
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const onChangeSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(evt.currentTarget.value)
    updateSearchValue(evt.currentTarget.value)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = useCallback(
    debounce(value => dispatch(setSearchInput(value)), 350),
    []
  )

  const clearButtonHandler = () => {
    setLocalSearch('')
    dispatch(setSearchInput(''))
    inputRef.current?.focus()
  }

  return (
    <div className={style.root}>
      <img className={style.icon} src={searchIcon} alt="" />
      <input ref={inputRef} onChange={onChangeSearch} value={localSearch} className={style.input} type="text" placeholder="Найти питсу..." />
      {search && <img onClick={clearButtonHandler} className={style.clearIcon} src={clearIcon} alt="" />}
    </div>
  )
}

export default Search
