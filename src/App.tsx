import { FC } from 'react'
import './scss/app.scss'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Basket from './pages/Basket'
import FullPizza from './pages/FullPizza'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const App: FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/pizza/:id" element={<FullPizza />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
