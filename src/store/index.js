import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slice/theme'
import pageReducer from './slice/page'
import locationReducer from './slice/location'

export default configureStore({
  reducer: {
    theme: themeReducer,
    page: pageReducer,
    location: locationReducer
  }
})
