import { FC } from 'react'
import clearIcon from '../../assets/img/clear-icon.svg'
import searchIcon from '../../assets/img/search-icon.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { setSearchInput } from '../../redux/filter-slice'
import style from './Search.module.scss'

const Search: FC = () => {
  const search = useAppSelector(state => state.filter.searchInput)
  const dispatch = useAppDispatch()

  const onChangeSearch = (value: string) => {
    dispatch(setSearchInput(value))
  }

  return (
    <div className={style.root}>
      <img className={style.icon} src={searchIcon} alt="" />
      <input
        onChange={evt => onChangeSearch(evt.currentTarget.value)}
        value={search}
        className={style.input}
        type="text"
        placeholder="Найти питцу..."
      />

      {search && (
        <img
          onClick={() => onChangeSearch('')}
          className={style.clearIcon}
          src={clearIcon}
          alt=""
        />
      )}
    </div>
  )
}

export default Search
