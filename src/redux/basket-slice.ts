import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface BasketSlice {
  value: number
}

const initialState: BasketSlice = {
  value: 0,
}

export const basketSlice = createSlice({
  name: 'basket',
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

export const { increment, decrement, incrementByAmount } = basketSlice.actions

export default basketSlice.reducer
