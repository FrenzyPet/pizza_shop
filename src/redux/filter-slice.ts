import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SortType {
  id: 0 | 1 | 2
  name: 'популярности' | 'цене' | 'алфавиту'
  sortValue: 'rating' | 'price' | 'name'
}

export interface FilterSlice {
  categoryId: number
  sortFilters: Array<SortType>
  activeSortId: number
  searchInput: string
}

interface Params {
  categoryId: number
  sortId: number
}

const initialState: FilterSlice = {
  categoryId: 0,
  sortFilters: [
    {
      id: 0,
      name: 'популярности',
      sortValue: 'rating',
    },
    {
      id: 1,
      name: 'цене',
      sortValue: 'price',
    },
    {
      id: 2,
      name: 'алфавиту',
      sortValue: 'name',
    },
  ],
  activeSortId: 0,
  searchInput: '',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload
    },
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload
    },
    setActiveSortId: (state, action: PayloadAction<number>) => {
      state.activeSortId = action.payload
    },
    setParamsToFilter: (state, action: PayloadAction<Params>) => {
      state.activeSortId = action.payload.sortId
      state.categoryId = action.payload.categoryId
    },
  },
})

export const { setCategoryId, setSearchInput, setActiveSortId, setParamsToFilter } = filterSlice.actions

export default filterSlice.reducer
