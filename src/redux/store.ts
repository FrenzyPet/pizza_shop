import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './basket-slice'
import filterReducer from './filter-slice'
import pizzaReducer from './pizza-slice'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    pizza: pizzaReducer,
    basket: basketReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
