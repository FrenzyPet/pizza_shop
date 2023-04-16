import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Pizza } from '../redux/pizza-slice'

const FullPizza: FC = () => {
  const params = useParams()
  const pizzaId = Number(params.id)
  const [pizza, setPizza] = useState<Pizza>()

  useEffect(() => {
    const getFullPizza = async () => {
      const response = await axios.get(`https://643347c6582420e2316206a7.mockapi.io/cosmopizza/api/items/${pizzaId}`)
      setPizza(response.data)
    }
    getFullPizza()
  }, [pizzaId])

  if (!pizza) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="container container--cart">
      <h3>{pizza.name}</h3>
      <img src={pizza.imageUrl} width="250" height="250" alt="" />
      <div>{pizza.price}</div>
    </div>
  )
}

export default FullPizza
