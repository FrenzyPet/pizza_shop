import { FC } from 'react'

const HomeError: FC = () => {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>Ошибка на сервере &#128421;&#128683;</h2>
        <p>
          Не удалось получить питсы...
          <br />
          Придется идти в макдональдс &#127828;&#127839;
        </p>
      </div>
    </div>
  )
}

export default HomeError
