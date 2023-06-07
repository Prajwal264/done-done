import { RestApi } from './rest-api.service';

export interface CreateTaskPayload {
  title: string;
  description?: string;
}

export interface ITask {
  _id: string;
  taskId: string;
  creatorId: string;
  title: string;
  completed: boolean;
  scheduledDate: Date;
  description: string;
}

export interface EditTaskPayload extends Partial<ITask> {
  taskId: string;
}
export interface ReorderTaskPayload {
  sourceIndex: number;
  destinationIndex: number;
  updatedTasks?: ITask[],
}

export type IFetchTasksResponse = Array<{
  count: never;
  tasks: ITask[];
  _id: string;
}>;

class Task extends RestApi {
  protected override getInstanceConfig() {
    return {
      baseURL: `${this.baseUrl}tasks/`,
    };
  }

  public async fetchAll() {
    return this.getAll('');
  }

  public async fetchOne(taskId: string): Promise<ITask> {
    return this.getAll(`/${taskId}`);
  }

  public async create(payload: CreateTaskPayload): Promise<ITask> {
    return this.post('', payload);
  }

  public async update(taskId: string, payload: EditTaskPayload): Promise<ITask> {
    return this.put(`/${taskId}`, payload);
  }
  public async remove(taskId: string): Promise<ITask> {
    return this.delete(`/${taskId}`, {});
  }
  public async reorder(payload: ReorderTaskPayload): Promise<ITask> {
    return this.put(`/reorder`, payload);
  }
}

export default Task;
