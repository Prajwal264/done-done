import { Response } from 'express';
import { inject } from 'inversify';
import {
  interfaces, controller, request, response, httpPost, httpGet, httpPut, httpDelete,
} from 'inversify-express-utils';
import { RequestWithContext } from '../types/request.type';
import { authMiddleware } from '../middlewares/auth.middleware';
import { TaskService } from '../services/task.service';
import TYPES from '../types';

@controller('/tasks', authMiddleware())
export class TaskController implements interfaces.Controller {
  constructor(
    @inject(TYPES.TaskService) readonly taskService: TaskService,
  ) { }

  @httpGet('/:taskId')
  public async fetchTask(@request() req: RequestWithContext, @response() res: Response) {
    try {
      const { taskId } = req.params;
      const task = await this.taskService.fetchOne(taskId);
      res.status(200).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  @httpGet('/')
  public async fetchAllUserTasks(@request() req: RequestWithContext, @response() res: Response) {
    try {
      const { user } = req;
      const tasks = await this.taskService.fetchAllForCreator(user.userId);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  @httpPut('/reorder')
  public async reorderUserTasks(@request() req: RequestWithContext, @response() res: Response) {
    const { sourceIndex, destinationIndex } = req.body;
    try {
      const { user } = req;
      const tasks = await this.taskService.reorderTasks({
        sourceIndex,
        destinationIndex
      }, user.userId);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  @httpPost('/')
  public async create(@request() req: RequestWithContext, @response() res: Response) {
    const {
      title,
      description,
    } = req.body;
    const { user } = req;
    try {
      if (!title) {
        throw Error('Title is mandatory');
      }
      const task = await this.taskService.create({
        title,
        description,
        creatorId: user.userId,
      });
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  @httpPut('/:taskId')
  public async update(@request() req: RequestWithContext, @response() res: Response) {
    const { taskId } = req.params;
    const {
      title,
      description,
      completed,
      scheduledDate,
    } = req.body;
    const { user } = req;
    try {
      if (!title) {
        throw Error('Title is mandatory');
      }
      const task = await this.taskService.update(taskId, {
        title,
        description,
        completed,
        creatorId: user.userId,
        scheduledDate,
      });
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  @httpDelete('/:taskId')
  public async delete(@request() req: RequestWithContext, @response() res: Response) {
    const { taskId } = req.params;
    try {
      const task = await this.taskService.deleteOne(taskId, req.user.userId);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
