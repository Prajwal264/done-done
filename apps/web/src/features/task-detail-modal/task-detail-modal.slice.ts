import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum TaskDetailModalTabs {
  SUB_TASKS = 'SUB_TASKS',
  COMMENTS = 'COMMENTS',
  ACTIVITY = 'ACTIVITY',
}

interface IState {
  show: boolean;
  taskId?: string | null;
  activeTab?: TaskDetailModalTabs;
}

const initialState: IState = {
  show: false,
  taskId: null,
  activeTab: TaskDetailModalTabs.SUB_TASKS,
};

export const taskDetailModalSlice = createSlice({
  name: 'taskDetailsModal',
  initialState,
  reducers: {
    toggleTaskDetailsModal: (_, action: PayloadAction<IState>) => {
      if (!action.payload.activeTab) {
        action.payload.activeTab = TaskDetailModalTabs.SUB_TASKS;
      }
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleTaskDetailsModal } = taskDetailModalSlice.actions;

export default taskDetailModalSlice.reducer;
