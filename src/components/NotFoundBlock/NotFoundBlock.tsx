import { FC } from 'react'
import vega from '../../assets/img/not-found.gif'
import style from './NotFoundBlock.module.scss'

const NotFoundBlock: FC = () => {
  return (
    <div className={style.root}>
      <div className={style.smile}>&#128169;</div>
      <h1>Ошибка 404. Ничего не найдено =(</h1>
      <img className={style.gif} src={vega} alt="vincent vega" />
    </div>
  )
}

export default NotFoundBlock
