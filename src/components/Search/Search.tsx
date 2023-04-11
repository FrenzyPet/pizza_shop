import { FC, useContext } from 'react'
import { ContextType, SearchContext } from '../../App'
import clearIcon from '../../assets/img/clear-icon.svg'
import searchIcon from '../../assets/img/search-icon.svg'
import style from './Search.module.scss'

const Search: FC = () => {
  const { search, setSearch } = useContext(SearchContext) as ContextType
  return (
    <div className={style.root}>
      <img className={style.icon} src={searchIcon} alt="" />
      <input
        onChange={evt => setSearch(evt.target.value)}
        value={search}
        className={style.input}
        type="text"
        placeholder="Найти питцу..."
      />

      {search && (
        <img onClick={() => setSearch('')} className={style.clearIcon} src={clearIcon} alt="" />
      )}
    </div>
  )
}

export default Search
