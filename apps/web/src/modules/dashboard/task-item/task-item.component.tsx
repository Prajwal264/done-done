/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useCallback, useMemo } from 'react';
import styles from './task-item.module.scss';
import CheckboxTick from '../../../assets/icons/icon-checkbox-tick.svg';
import IconInbox from '../../../assets/icons/icon-inbox.svg';
import IconEdit from '../../../assets/icons/icon-edit.svg';
import IconDelete from '../../../assets/icons/icon-delete.svg';
import { ITask } from '../../../services/api/task.api.service';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, editTask } from '../../../features/tasks/tasks.slice';
import AddTask from '../add-task/add-task.component';
import { RootState } from '../../../store';
import { toggleAddTaskEditor } from '../../../features/add-task-editor/add-task-editor.slice';
import useAudio from '../../../hooks/useAudio';
import { toggleTaskDetailsModal } from '../../../features/task-detail-modal/task-detail-modal.slice';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';

interface IProps {
  task: ITask;
  index: number;
  isDragDropDisabled?: boolean;
}

const TaskItem: FC<IProps> = ({ task, index, isDragDropDisabled = false }) => {
  const [_, togglePlay] = useAudio('../../assets/audio/task-complete.mp3');
  const currentAddTaskEditorId = useSelector((state: RootState) => state.currentAddTaskEditor);

  const dispatch = useDispatch();

  const toggleCompleted = useCallback(() => {
    if (!task.completed) {
      togglePlay(true);
    } else {
      togglePlay(false);
    }
    const updatedTask = { ...task, completed: !task.completed };
    dispatch(editTask(updatedTask));
  }, [task]);

  const addTaskEditorId = useMemo(() => 'edit_' + task.taskId, [task]);

  const triggerEditFlow = useCallback(() => {
    dispatch(toggleAddTaskEditor(addTaskEditorId));
  }, [addTaskEditorId]);

  const removeTask = useCallback(() => {
    dispatch(deleteTask(task.taskId))
  }, [addTaskEditorId]);

  const showTaskDetailModal = useCallback(() => {
    dispatch(
      toggleTaskDetailsModal({
        show: true,
        taskId: task.taskId,
      }),
    );
  }, [task]);

  return (
    <React.Fragment>
      {currentAddTaskEditorId === addTaskEditorId ? (
        <AddTask existingTaskDetails={task} addTaskEditorId={addTaskEditorId} />
      ) : (
        <Draggable draggableId={task.taskId} index={index} isDragDisabled={isDragDropDisabled} >
          {(provided: DraggableProvided) => (
            <div ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={styles.taskItem}>
              <div className={styles.taskItemBody}>
                <button className={`${styles.checkbox} ${task.completed ? styles.active : ''}`} onClick={toggleCompleted}>
                  <div className={styles.checkboxCircle}>
                    <CheckboxTick />
                  </div>
                </button>
                <div className={styles.taskItemContent} onClick={showTaskDetailModal} role="presentation">
                  <div className={styles.contentWrapper}>
                    <div className={`${styles.taskContent} ${task.completed ? styles.active : ''}`}>{task.title}</div>
                    {task.description && <div className={styles.taskDescription}>{task.description}</div>}
                  </div>
                  <div className={styles.infoFlags}>
                    <div className={styles.project}>
                      <a href="/all">
                        <span>Alltasks</span>
                        <IconInbox />
                      </a>
                    </div>
                  </div>
                </div>
                <div className={styles.taskItemActions}>
                  <button className={styles.actionItem} onClick={triggerEditFlow}>
                    <IconEdit />
                  </button>
                  <button className={styles.actionItem} onClick={removeTask}>
                    <IconDelete />
                  </button>
                </div>
              </div>
            </div>
          )}
        </Draggable>
      )}
    </React.Fragment>
  );
};

export default TaskItem;
