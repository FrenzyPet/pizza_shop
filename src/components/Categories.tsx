import { FC } from 'react'
import { v1 } from 'uuid'

interface Props {
  categoryIndex: number
  setCategoryIndex: (index: number) => void
}

const Categories: FC<Props> = ({ categoryIndex, setCategoryIndex }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']
  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            key={v1()}
            onClick={() => setCategoryIndex(index)}
            className={categoryIndex === index ? 'active' : ''}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
