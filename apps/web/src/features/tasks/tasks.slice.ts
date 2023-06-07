import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Task, { CreateTaskPayload, EditTaskPayload, IFetchTasksResponse, ITask, ReorderTaskPayload } from '../../services/api/task.api.service';

const initialState: ITask[] = []

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await new Task().fetchAll();
  return response;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task: CreateTaskPayload) => {
  const response = await new Task().create(task);
  return response;
});

export const editTask = createAsyncThunk('tasks/editTask', async (task: EditTaskPayload) => {
  await new Task().update(task.taskId, task);
  return task;
});
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId: string) => {
  await new Task().remove(taskId);
  return taskId;
});
export const reorderTasks = createAsyncThunk('tasks/reorderTasks', async (payload: ReorderTaskPayload) => {
  await new Task().reorder(payload);
  return payload;
});

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasks: () => { },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.push(...action.payload);
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      const { payload } = action;
      state.push(payload);
    });
    builder.addCase(editTask.fulfilled, (state, action) => {
      const { payload } = action;
      debugger;
      const updatedTasks = state.map((task) => {
        if (task.taskId === payload.taskId) {
          return payload as ITask;
        }
        return task;
      });
      state = [...updatedTasks];
      return state;
    });
    builder.addCase(reorderTasks.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload.updatedTasks) {
        state = [...payload.updatedTasks];
      }
      return state;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload) {
        state = state.filter((item) => item.taskId !== payload);
      }
      return state;
    });
  },
});

// Action creators are generated for each case reducer function
// export const { fetchTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
