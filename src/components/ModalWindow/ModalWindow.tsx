import cn from 'classnames'
import React, { FC, useEffect } from 'react'
import style from './ModalWindow.module.scss'

interface Props {
  children: React.ReactNode
  active: boolean
  setActive: (value: boolean) => void
}

const ModalWindow: FC<Props> = ({ active, setActive, children }) => {
  useEffect(() => {
    const closeModal = (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        setActive(false)
      }
    }
    window.addEventListener('keydown', closeModal)
    return () => {
      window.removeEventListener('keydown', closeModal)
    }
  }, [setActive])

  const backsheetClasses = cn({ [style.backsheet]: true, [style.backsheet__active]: active })
  const contentClasses = cn({ [style.content]: true, [style.content__active]: active })
  return (
    <div onClick={() => setActive(false)} className={backsheetClasses}>
      <div onClick={evt => evt.stopPropagation()} className={contentClasses}>
        {children}
      </div>
    </div>
  )
}

export default ModalWindow
