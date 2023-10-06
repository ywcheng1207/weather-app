import { createSlice } from '@reduxjs/toolkit'

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    city: localStorage.getItem('city') || '臺北市',
    key: localStorage.getItem('key') || '315078'
  },
  reducers: {
    switchLocation: (state, action) => {
      state.city = action.payload.city
      state.key = action.payload.key
    }
  }
})

export const { switchLocation } = locationSlice.actions
export const selectLocation = (state) => state.location

export default locationSlice.reducer
