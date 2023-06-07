/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = true;

export const showSidebarSlice = createSlice({
  name: 'showSidebar',
  initialState,
  reducers: {
    toggleSidebar: (state, action: PayloadAction<boolean | undefined>) => {
      if (typeof action.payload !== 'undefined') {
        return !!action.payload;
      }
      return !state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleSidebar } = showSidebarSlice.actions;

export default showSidebarSlice.reducer;
