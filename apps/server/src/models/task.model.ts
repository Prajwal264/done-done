import { Schema, model } from 'mongoose';

export interface ITask {
  taskId: string;
  creatorId: string;
  title: string;
  description?: string;
  completed: boolean;
  scheduledDate: Date;
}

const tasksSchema = new Schema({
  taskId: {
    type: 'String', required: true, unique: true, index: true,
  },
  creatorId: {
    type: 'String', required: true, index: true,
  },
  title: {
    type: 'String', required: true,
  },
  description: {
    type: 'String',
  },
  completed: {
    type: 'Boolean', default: false,
  },
  scheduledDate: {
    type: 'Date', default: new Date(),
  },
}, { timestamps: true });

export const Task = model('Task', tasksSchema);

// create a task contents model for maintaining the position of the records for a user,
// each document will be consiting of a chunk of tasks ~ 10
// approach 1: top level records will be having the chunk index, document to find
// create a project task model for maintain the position of the records in a project
// remove the element from the position model when a task is marked as complete
