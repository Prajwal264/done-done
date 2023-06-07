import { FC, useEffect, useMemo } from 'react';
import styles from './completed-tasks.module.scss';
import EmptyListIcon from '../../../assets/icons/icon-empty-todo-list.svg';
import AddTask from '../add-task/add-task.component';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAddTaskEditor } from '../../../features/add-task-editor/add-task-editor.slice';
import { RootState } from '../../../store';
import TaskSection from '../task-section/task-section.component';
import { fetchTasks } from '../../../features/tasks/tasks.slice';

interface Props { }

const ADD_TASK_EDITOR_ID = 'add-task';

const CompletedTasks: FC<Props> = () => {
  const currentAddTaskEditorId = useSelector((state: RootState) => state.currentAddTaskEditor);
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    loadDependencies();
  }, []);

  const taskExists = useMemo(
    () => tasks.length,
    [tasks],
  );

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed),
    [tasks]
  );

  const loadDependencies = async () => {
    if (!taskExists) {
      dispatch(fetchTasks());
    }
  };

  return (
    <div className={styles.todayPage}>
      <div className={styles.sectionHeader}>
        <div className={styles.headerContent}>
          <h1>
            <span>Completed Tasks</span>
          </h1>
        </div>
      </div>
      <div className={styles.sectionContent}>
        {completedTasks.length ? (
          <TaskSection
            heading={null}
            tasks={completedTasks}
            isDragDropDisabled={true}
          />
        ) : null}
        {!completedTasks.length && <AddTask addTaskEditorId={ADD_TASK_EDITOR_ID} />}
        {!completedTasks.length && currentAddTaskEditorId === null && (
          <div className={styles.emptyListHolder}>
            <div className={styles.emptyListIllustration}>
              <EmptyListIcon />
            </div>
            <div className={styles.emptyStateHeader}>Looks like you have not completed any tasks :)</div>
            <div className={styles.emptyStateBody}>All your completed tasks will be listed here.</div>
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

export default CompletedTasks;
