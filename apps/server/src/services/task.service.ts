import { injectable } from 'inversify';
import { nanoid } from 'nanoid';
import { LeanDocument } from 'mongoose';
import { ITask, Task } from '../models/task.model';
import { IUserTaskList, UserTaskList } from '../models/user-task-list.model';

interface CreateTaskPayload {
  title: string;
  creatorId: string;
  description?: string;
}

@injectable()
export class TaskService {
  public async create(payload: CreateTaskPayload) {
    const {
      title,
      description,
      creatorId,
    } = payload;
    const taskId = `task_${nanoid()}`;
    const scheduledDate = new Date();
    const task = await Task.create({
      taskId,
      creatorId,
      title,
      description,
      scheduledDate,
    });
    const userTaskList = await UserTaskList.findOne({
      creatorId,
    });
    if (!userTaskList) {
      new UserTaskList({
        creatorId,
        tasks: [{
          taskId,
          title,
          description,
          completed: false,
        }],
      }).save();
    } else {
      userTaskList.tasks.push({
        taskId: task.taskId,
        title: task.title,
        description: task.description,
        completed: task.completed,
      });
      userTaskList.save();
    }
    return task;
  }

  public async fetchOne(taskId: string): Promise<LeanDocument<ITask>> {
    const task = await Task.findOne({ taskId });
    if (!task) {
      throw new Error(`Task with Id${taskId} Not found`);
    }
    return task;
  }

  public async deleteOne(taskId: string, creatorId: string): Promise<boolean> {
    await UserTaskList.updateOne({
      creatorId,
    }, {
      $pull: { tasks: { taskId } },
    }, {
      safe: true,
      multi: false,
    });
    await Task.deleteOne({ taskId });
    return true;
  }

  public async fetchAllForCreator(creatorId: string): Promise<LeanDocument<IUserTaskList['tasks']>> {
    const taskList = await UserTaskList.findOne({
      creatorId,
    }).lean();
    if (!taskList) {
      return [];
    }
    return taskList.tasks as LeanDocument<IUserTaskList['tasks']>;
  }

  public async reorderTasks({
    sourceIndex,
    destinationIndex,
  }: {
    sourceIndex: number,
    destinationIndex: number,
  }, creatorId: string) {
    const userTaskList = await UserTaskList.findOne({ creatorId }).lean();
    if (userTaskList) {
      const result = userTaskList.tasks;
      const [removed] = result.splice(sourceIndex, 1);
      result.splice(destinationIndex, 0, removed);
      await UserTaskList.updateOne({
        creatorId,
      }, {
        $set: {
          tasks: result,
        },
      });
    }
  }

  public async update(taskId: string, updatedPayload: Partial<ITask>) {
    const task = await Task.findOne<ITask>({ taskId });
    const updatedTask: Partial<ITask> = {};
    if (!task) {
      throw new Error(`Task with id: ${taskId} not found`);
    }
    if (task.creatorId !== updatedPayload.creatorId) {
      throw new Error('Unauthorized');
    }
    if (task.completed !== updatedPayload.completed) {
      updatedTask.completed = updatedPayload.completed;
    }
    if (task.title !== updatedPayload.title) {
      updatedTask.title = updatedPayload.title;
    }
    if (task.description !== updatedPayload.description) {
      updatedTask.description = updatedPayload.description;
    }
    if (task.scheduledDate !== updatedPayload.scheduledDate) {
      updatedTask.scheduledDate = updatedPayload.scheduledDate;
    }
    await Task.updateOne({ taskId }, updatedTask);
    const userTaskList = await UserTaskList.findOne({
      creatorId: task.creatorId,
    });
    if (userTaskList) {
      if (userTaskList.tasks.length) {
        userTaskList.tasks = userTaskList?.tasks.map((item) => {
          if (item.taskId === taskId) {
            return {
              taskId: task.taskId,
              title: updatedPayload.title ?? task.title,
              description: updatedPayload.description ?? task.description,
              completed: updatedPayload.completed ?? task.completed,
            };
          }
          return item;
        });
      }
      userTaskList?.save();
    }
  }
}
