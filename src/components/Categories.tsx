import { FC } from 'react'
import { v1 } from 'uuid'
import { useAppDispatch } from '../hooks/hooks'
import { setCategoryId } from '../redux/filter-slice'
interface Props {
  categoryIndex: number
}

const Categories: FC<Props> = ({ categoryIndex }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']
  const dispatch = useAppDispatch()

  const onChangeCategory = (index: number) => {
    dispatch(setCategoryId(index))
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li key={v1()} onClick={() => onChangeCategory(index)} className={categoryIndex === index ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
