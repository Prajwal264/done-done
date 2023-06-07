import { configureStore } from '@reduxjs/toolkit';
import showSidebarReducer from './features/sidebar/sidebar.slice';
import showAddTaskEditorReducer from './features/add-task-editor/add-task-editor.slice';
import tasksReducer from './features/tasks/tasks.slice';
import taskDetailsModalReducer from './features/task-detail-modal/task-detail-modal.slice';
export const store = configureStore({
  reducer: {
    showSidebar: showSidebarReducer,
    currentAddTaskEditor: showAddTaskEditorReducer,
    tasks: tasksReducer,
    taskDetailsModal: taskDetailsModalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
