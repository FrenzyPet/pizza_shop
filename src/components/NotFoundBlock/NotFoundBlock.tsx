import { FC } from 'react'
import vega from '../../assets/img/not-found.gif'
import style from './NotFoundBlock.module.scss'

const NotFoundBlock: FC = () => {
  return (
    <div className={style.root}>
      <div className={style.smile}>&#128169;</div>
      <h1>Ошибка 404</h1>
      <p className={style.description}>Такой страницы у нас нет =(</p>
      <img className={style.gif} src={vega} alt="vincent vega" />
    </div>
  )
}

export default NotFoundBlock
