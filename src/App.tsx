import { FC } from 'react'
import './scss/app.scss'
import Header from './components/Header'
import Basket from './pages/Basket'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const App: FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          {/* <Home />
          <Basket /> */}
          <NotFound />
        </div>
      </div>
    </div>
  )
}

export default App
