import { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../hooks/hooks'
import { SortType, setActiveSortId } from '../redux/filter-slice'
interface Props {
  activeSortId: number
  sortFilters: Array<SortType>
}

const Sort: FC<Props> = ({ activeSortId, sortFilters }) => {
  const [isPopup, setIsPopup] = useState(false)
  const dispatch = useAppDispatch()

  const onSortClick = (sortId: number) => {
    dispatch(setActiveSortId(sortId))
    setIsPopup(false)
  }

  useEffect(() => {
    const closePopup = () => {
      setIsPopup(false)
    }

    document.addEventListener('click', closePopup)

    return () => {
      document.removeEventListener('click', closePopup)
    }
  }, [setIsPopup])

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <div
          onClick={evt => {
            evt.stopPropagation()
            setIsPopup(!isPopup)
          }}
        >
          {sortFilters[activeSortId].name}
        </div>
      </div>
      {isPopup && (
        <div className="sort__popup">
          <ul>
            {sortFilters.map(item => (
              <li
                key={item.id}
                onClick={() => onSortClick(item.id)}
                className={activeSortId === item.id ? 'active' : ''}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Sort
