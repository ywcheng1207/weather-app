import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: { type: 'light' },
  reducers: {
    onTheme: (state, action) => {
      state.type = action.payload.type
    }
  }
})

export const { onTheme } = themeSlice.actions
export const selectTheme = (state) => state.theme

export default themeSlice.reducer
