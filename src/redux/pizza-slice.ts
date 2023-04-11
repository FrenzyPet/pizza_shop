import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PizzeSlice {
  value: number
}

const initialState: PizzeSlice = {
  value: 0,
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = pizzaSlice.actions

export default pizzaSlice.reducer
