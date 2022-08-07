import { configureStore } from '@reduxjs/toolkit'
import { sidebarReducer } from './reducers/sidebar';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer
  },
})

export default store;