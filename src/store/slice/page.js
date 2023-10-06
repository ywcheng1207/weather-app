import { createSlice } from '@reduxjs/toolkit'

export const pageSlice = createSlice({
  name: 'page',
  initialState: { value: 'WeatherCard' },
  reducers: {
    switchPage: (state, action) => {
      state.value = action.payload.value
    }
  }
})

export const { switchPage } = pageSlice.actions
export const selectPage = (state) => state.page

export default pageSlice.reducer
