import { FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './add-task.module.scss';
import AddIcon from '../../../assets/icons/icon-plus.svg';
import PrimaryButton from '../../../components/primary-button/primary-button.component';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { toggleAddTaskEditor } from '../../../features/add-task-editor/add-task-editor.slice';
import { addTask, editTask } from '../../../features/tasks/tasks.slice';
import { ITask } from '../../../services/api/task.api.service';

const defaultFormData = {
  title: '',
  description: '',
};

interface IAddTaksProps {
  addTaskEditorId: string;
  existingTaskDetails?: ITask | null;
  addTaskContent?: string | React.ReactNode;
  onAddTask?: (task: Partial<ITask>) => void;
}

const AddTask: FC<IAddTaksProps> = ({
  addTaskEditorId,
  existingTaskDetails = null,
  addTaskContent = 'Add Task',
  onAddTask,
}) => {
  const inputRef = useRef(null);
  const currentAddTaskEditorId = useSelector((state: RootState) => state.currentAddTaskEditor);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ ...defaultFormData });

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    },
    [formData],
  );

  const toggleEditor = useCallback(() => {
    dispatch(toggleAddTaskEditor(addTaskEditorId));
  }, []);

  const addTaskTrigger: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.stopPropagation();
      const { title, description } = formData;
      dispatch(
        addTask({
          title,
          description,
        }),
      );
      dispatch(toggleAddTaskEditor(addTaskEditorId));
      if (onAddTask) {
        onAddTask({
          title,
          description,
        });
      }
      resetForm();
    },
    [formData],
  );

  const resetForm = () => {
    setFormData({ ...defaultFormData });
  };

  const editTaskTrigger: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (existingTaskDetails?.taskId) {
        const { title, description } = formData;
        const updatedTask = { ...existingTaskDetails, title, description };
        dispatch(editTask(updatedTask));
        dispatch(toggleAddTaskEditor(addTaskEditorId));
        resetForm();
      }
    },
    [formData],
  );

  useEffect(() => {
    if (existingTaskDetails) {
      setFormData({
        title: existingTaskDetails.title,
        description: existingTaskDetails.description,
      });
    }
  }, [existingTaskDetails]);

  useEffect(() => {
    if (inputRef.current) {
      (inputRef.current as HTMLInputElement).focus();
    }
  }, [currentAddTaskEditorId]);

  return currentAddTaskEditorId === addTaskEditorId ? (
    <div className={styles.addTaskEditor}>
      <form onSubmit={existingTaskDetails ? editTaskTrigger : addTaskTrigger}>
        <div className={styles.editingArea}>
          <div className={styles.inputFields}>
            <div className={styles.titleField}>
              <input
                ref={inputRef}
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Conference Wednesday at 15 #Meeting"
              />
            </div>
            <div className={styles.descriptionField}>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
              ></textarea>
            </div>
          </div>
        </div>
        <div className={styles.editorFormActions}>
          <div className={styles.buttonContainer}>
            <PrimaryButton
              type="submit"
              content={existingTaskDetails ? 'Save' : 'Add task'}
              disabled={!!!formData.title}
            />
            <PrimaryButton type="button" content="Cancel" onClick={toggleEditor} />
          </div>
        </div>
      </form>
    </div>
  ) : (
    <button className={styles.addTaskButton} onClick={toggleEditor}>
      <span>
        <AddIcon />
      </span>
      {addTaskContent}
    </button>
  );
};

export default AddTask;
