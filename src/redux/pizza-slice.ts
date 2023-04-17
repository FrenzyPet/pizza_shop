import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import type { SortType } from './filter-slice'

export interface Pizza {
  id: number
  imageUrl: string
  name: string
  types: Array<number>
  sizes: Array<number>
  price: number
  category: number
  rating: number
}

export enum StatusValues {
  error = 'error',
  success = 'success',
  loading = 'loading',
}
export interface PizzeSlice {
  items: Array<Pizza>
  fetchStatus: StatusValues
}

const initialState: PizzeSlice = {
  items: [],
  fetchStatus: StatusValues.loading,
}

interface Attributes {
  categoryId: number
  activeSortId: number
  sortFilters: Array<SortType>
}

export const fetchPizzas = createAsyncThunk<Array<Pizza>, Attributes>(
  'pizza/fetchPizzaItems',

  async ({ categoryId, activeSortId, sortFilters }) => {
    const { data } = await axios.get(
      `https://643347c6582420e2316206a7.mockapi.io/cosmopizza/api/items?${categoryId ? `category=${categoryId}` : ''}&sortBy=${
        sortFilters[activeSortId].sortValue
      }`
    )
    return data
  }
)

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas: (state, action: PayloadAction<Array<Pizza>>) => {
      state.items = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPizzas.pending, state => {
      state.fetchStatus = StatusValues.loading
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.fetchStatus = StatusValues.success
      state.items = action.payload
    })
    builder.addCase(fetchPizzas.rejected, state => {
      state.fetchStatus = StatusValues.error
      state.items = []
    })
  },
})

export const { setPizzas } = pizzaSlice.actions

export default pizzaSlice.reducer
