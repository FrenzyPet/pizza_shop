import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PizzaItem {
  id: number
  name: string
  imageUrl: string
  type: number
  size: number
  price: number
  model: string
  count: number
}

export interface BasketSlice {
  items: Array<PizzaItem>
  totalPrice: number
}

const initialState: BasketSlice = {
  items: [],
  totalPrice: 0,
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    clearBasket: state => {
      state.items = []
      state.totalPrice = 0
    },
    addPizza: (state, action: PayloadAction<PizzaItem>) => {
      const samePizza = state.items.find(item => item.model === action.payload.model)
      if (samePizza) {
        samePizza.count += 1
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }

      state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.count, 0)
    },
    removePizza: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.model !== action.payload)
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.count, 0)
    },
    increasePizzaAmount: (state, action: PayloadAction<string>) => {
      const samePizza = state.items.find(item => item.model === action.payload)
      if (samePizza) {
        samePizza.count += 1
      }
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.count, 0)
    },
    decreasePizzaAmount: (state, action: PayloadAction<string>) => {
      const samePizza = state.items.find(item => item.model === action.payload)
      if (samePizza) {
        samePizza.count -= 1
      }
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.count, 0)
    },
  },
})

export const { clearBasket, addPizza, removePizza, increasePizzaAmount, decreasePizzaAmount } = basketSlice.actions

export default basketSlice.reducer
