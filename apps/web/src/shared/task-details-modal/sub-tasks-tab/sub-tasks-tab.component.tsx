import React from 'react';
import AddTask from '../../../modules/dashboard/add-task/add-task.component';
import TaskItem from '../../../modules/dashboard/task-item/task-item.component';
import { ITask } from '../../../services/api/task.api.service';
import styles from './sub-tasks-tab.module.scss';

interface IProps { }

const tasks = [] as ITask[];

const ADD_TASK_EDITOR_ID = 'subtask-editor';

const SubTasksTab: React.FC<IProps> = ({ }) => {
  return (
    <div className={styles.listHolder}>
      <ul className={styles.items}>
        {tasks.map((task, index) => (
          <li key={task.taskId}>
            <TaskItem task={task} index={index} />
          </li>
        ))}
        <AddTask addTaskEditorId={ADD_TASK_EDITOR_ID} />
      </ul>
    </div>
  );
};

export default SubTasksTab;
