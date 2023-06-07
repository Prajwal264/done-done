import { Container } from 'inversify';
import TYPES from './types';
import { AuthService } from './services/auth.service';
import { TaskService } from './services/task.service';

const container = new Container();

container.bind<AuthService>(TYPES.AuthService).to(AuthService).inSingletonScope();
container.bind<TaskService>(TYPES.TaskService).to(TaskService).inSingletonScope();

export default container;
