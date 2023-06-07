import { FC, useEffect, useMemo } from 'react';
import styles from './all-tasks.module.scss';
import EmptyListIcon from '../../../assets/icons/icon-empty-todo-list.svg';
import AddTask from '../add-task/add-task.component';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAddTaskEditor } from '../../../features/add-task-editor/add-task-editor.slice';
import { RootState } from '../../../store';
import TaskSection from '../task-section/task-section.component';
import { fetchTasks } from '../../../features/tasks/tasks.slice';

interface Props { }

const ADD_TASK_EDITOR_ID = 'add-task';

const AllTasksPage: FC<Props> = () => {
  const currentAddTaskEditorId = useSelector((state: RootState) => state.currentAddTaskEditor);
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    loadDependencies();
  }, []);

  const taskExists = useMemo(() => tasks.length, [tasks]);

  const loadDependencies = async () => {
    if (!taskExists) {
      dispatch(fetchTasks());
    }
  };

  return (
    <div className={styles.allTasksPage}>
      <div className={styles.sectionHeader}>
        <div className={styles.headerContent}>
          <h1>
            <span>All Tasks</span>
          </h1>
        </div>
      </div>
      <div className={styles.sectionContent}>
        {taskExists ? <TaskSection heading={null} tasks={tasks} /> : null}
        {!taskExists && <AddTask addTaskEditorId={ADD_TASK_EDITOR_ID} />}
        {!taskExists && currentAddTaskEditorId === null && (
          <div className={styles.emptyListHolder}>
            <div className={styles.emptyListIllustration}>
              <EmptyListIcon />
            </div>
            <div className={styles.emptyStateHeader}>Get a clear view of the day ahead</div>
            <div className={styles.emptyStateBody}>All your tasks will show up here, at a glance.</div>
            <button
              className={styles.emptyStateButton}
              onClick={() => dispatch(toggleAddTaskEditor(ADD_TASK_EDITOR_ID))}
            >
              Add a task
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTasksPage;
