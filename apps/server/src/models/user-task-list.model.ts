import { Schema, model } from 'mongoose';

export interface IUserTaskList {
  creatorId: string;
  tasks: {
    taskId: string;
    title: string;
    description?: string;
    completed: boolean;
  }[]
}

const userTaskListSchema = new Schema({
  creatorId: {
    type: 'String', required: true, index: true,
  },
  tasks: {
    type: Array,
  }
}, { timestamps: true });

export const UserTaskList = model<IUserTaskList>('UserTaskList', userTaskListSchema);

