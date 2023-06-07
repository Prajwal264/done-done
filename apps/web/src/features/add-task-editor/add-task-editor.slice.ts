/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState: string | null = null;

export const showAddTaskEditor = createSlice({
  name: 'showAddTask',
  initialState,
  reducers: {
    toggleAddTaskEditor: (state, action) => {
      const { payload } = action;
      if (state !== payload) {
        return payload;
      }
      return null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleAddTaskEditor } = showAddTaskEditor.actions;

export default showAddTaskEditor.reducer;
