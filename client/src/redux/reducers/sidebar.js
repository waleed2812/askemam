import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'sidebar',
  initialState: {
    isOpen: !!localStorage.getItem("sidebar"),
  },
  reducers: {
    openSidebar: (state, action) => {
      localStorage.setItem("sidebar", !!action.payload);
      state.isOpen = !!action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { openSidebar } = counterSlice.actions
export const sidebarReducer = counterSlice.reducer;
export default sidebarReducer;