import { FC, useState } from 'react'
import './scss/app.scss'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Basket from './pages/Basket'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

export interface ContextType {
  search: string
  setSearch: (text: string) => void
}

export const SearchContext = React.createContext<ContextType | null>(null)

const App: FC = () => {
  const [search, setSearch] = useState<string>('')

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ search, setSearch }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/basket" element={<Basket />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  )
}

export default App
