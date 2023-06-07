/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useCallback, useMemo, useState } from 'react';
import styles from './task-item.module.scss';
import CheckboxTick from '../../../assets/icons/icon-checkbox-tick.svg';
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
import ConfirmationModal from '../../../components/popups/confirmation-modal/confirmation-modal.component';

interface IProps {
  task: ITask;
  index: number;
  isDragDropDisabled?: boolean;
}

const TaskItem: FC<IProps> = ({ task, index, isDragDropDisabled = false }) => {
  const [_, togglePlay] = useAudio('../../assets/audio/task-complete.mp3');
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
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
    setShowDeleteConfirmationModal(true);
  }, [addTaskEditorId]);

  const showTaskDetailModal = useCallback(() => {
    dispatch(
      toggleTaskDetailsModal({
        show: true,
        taskId: task.taskId,
      }),
    );
  }, [task]);

  const onConfirmDeletion = (confirm: boolean) => {
    if (confirm) {
      dispatch(deleteTask(task.taskId));
    }
    setShowDeleteConfirmationModal(false);
  };

  return (
    <React.Fragment>
      {currentAddTaskEditorId === addTaskEditorId ? (
        <AddTask existingTaskDetails={task} addTaskEditorId={addTaskEditorId} />
      ) : (
        <Draggable draggableId={task.taskId} index={index} isDragDisabled={isDragDropDisabled}>
          {(provided: DraggableProvided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={styles.taskItem}
            >
              <div className={styles.taskItemBody}>
                <button
                  className={`${styles.checkbox} ${task.completed ? styles.active : ''}`}
                  onClick={toggleCompleted}
                >
                  <div className={styles.checkboxCircle}>
                    <CheckboxTick />
                  </div>
                </button>
                <div className={styles.taskItemContent} onClick={showTaskDetailModal} role="presentation">
                  <div className={styles.contentWrapper}>
                    <div className={`${styles.taskContent} ${task.completed ? styles.active : ''}`}>{task.title}</div>
                    {task.description && <div className={styles.taskDescription}>{task.description}</div>}
                  </div>
                  {/* <div className={styles.infoFlags}>
                    <div className={styles.project}>
                      <a href="/all">
                        <span>All Tasks</span>
                        <IconInbox />
                      </a>
                    </div>
                  </div> */}
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
              {showDeleteConfirmationModal && (
                <ConfirmationModal
                  message={
                    <div className={'confirmationMessage'}>
                      <p>Are you sure you want to</p>
                      <p>delete this task ?</p>
                      <p className="subtext">This action cannot be undone.</p>
                    </div>
                  }
                  closePopup={() => setShowDeleteConfirmationModal(false)}
                  confirm={onConfirmDeletion}
                />
              )}
            </div>
          )}
        </Draggable>
      )}
    </React.Fragment>
  );
};

export default TaskItem;
