import { FC, useState } from 'react'
import { v1 } from 'uuid'

const Categories: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const categories = ['Все', 'Мясные', 'Веганские', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li key={v1()} onClick={() => setActiveIndex(index)} className={activeIndex === index ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
