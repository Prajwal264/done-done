import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Task, { CreateTaskPayload, EditTaskPayload, IFetchTasksResponse, ITask, ReorderTaskPayload } from '../../services/api/task.api.service';
import { toast } from 'react-hot-toast';

const initialState: ITask[] = []

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const fetchTasksPromise = new Task().fetchAll();
  toast.promise(fetchTasksPromise, {
    loading: 'Fetching Tasks',
    error: "Something went wrong",
    success: 'Tasks fetched successfully'
  })
  const response = await fetchTasksPromise;
  return response;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task: CreateTaskPayload) => {
  const addTaskPromise = new Task().create(task);
  toast.promise(addTaskPromise, {
    loading: 'Adding Task',
    error: "Something went wrong",
    success: 'Task added successfully'
  });
  const response = await addTaskPromise;
  return response;
});

export const editTask = createAsyncThunk('tasks/editTask', async (task: EditTaskPayload) => {
  const editTaskPromise = new Task().update(task.taskId, task);
  toast.promise(editTaskPromise, {
    loading: 'Editing Task',
    error: "Something went wrong",
    success: 'Task edited successfully'
  });
  await editTaskPromise;
  return task;
});
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId: string) => {
  const deleteTaskPromise = new Task().remove(taskId);
  toast.promise(deleteTaskPromise, {
    loading: 'Deleting Task',
    error: "Something went wrong",
    success: 'Task deleted successfully'
  });
  await deleteTaskPromise;
  return taskId;
});
export const reorderTasks = createAsyncThunk('tasks/reorderTasks', async (payload: ReorderTaskPayload) => {
  const reorderTaskPromise = new Task().reorder(payload);
  toast.promise(reorderTaskPromise, {
    loading: 'Reording Task',
    error: "Something went wrong",
    success: 'Task reordered successfully'
  });
  await reorderTaskPromise;
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
