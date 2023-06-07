/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../../packages/modal/modal.component';
import Task, { ITask } from '../../services/api/task.api.service';
import { RootState } from '../../store';
import styles from './task-details-modal.module.scss';
import IconInbox from '../../assets/icons/icon-inbox-page.svg';
import CheckboxTick from '../../assets/icons/icon-checkbox-tick.svg';
import { toggleTaskDetailsModal } from '../../features/task-detail-modal/task-detail-modal.slice';
import { toggleAddTaskEditor } from '../../features/add-task-editor/add-task-editor.slice';
import AddTask from '../../modules/dashboard/add-task/add-task.component';

const addTaskEditorId = 'TASK_DETAILS_MODAL_ADD_TASK_EDITOR';

interface Props { }

const TaskDetailsModal: React.FC<Props> = ({ }) => {
  const taskDetails = useSelector((state: RootState) => state.taskDetailsModal);
  const currentAddTaskEditor = useSelector((state: RootState) => state.currentAddTaskEditor);
  const dispatch = useDispatch();
  const [task, setTask] = useState<null | ITask>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (taskDetails?.show) {
      loadDependencies();
    }
  }, [taskDetails]);

  const loadDependencies = async () => {
    const currentTaskId = taskDetails.taskId;
    if (currentTaskId) {
      const response = await new Task().fetchOne(currentTaskId); // fetch from selectors ?
      if (response) {
        setTask(response);
      }
    }
  };

  const handleClickOutside: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (modalRef.current && !(modalRef.current as any).contains(event.target)) {
        dispatch(
          toggleTaskDetailsModal({
            show: false,
          }),
        );
      }
    },
    [dispatch],
  );

  const openTaskEdit: React.MouseEventHandler<HTMLDivElement> = useCallback(() => {
    dispatch(toggleAddTaskEditor(addTaskEditorId));
  }, [dispatch]);

  return taskDetails.show ? (
    <Modal showBackdrop={true} onClick={handleClickOutside}>
      <div className={styles.taskDetailsModal} ref={modalRef}>
        <div className={styles.content}>
          <div className={styles.contentDetails}>
            <div className={styles.contentDetailsHeader}>
              <div className={styles.contentDetailsParentInfo}>
                <Link to={`/app/inbox/`} className={styles.contentDetailsParentLink}>
                  <div className={styles.contentDetailsParentIcon}>
                    <IconInbox />
                  </div>
                  <div className={styles.contentDetailsParentName}>Task</div>
                </Link>
              </div>
            </div>
            {task &&
              (currentAddTaskEditor === addTaskEditorId ? (
                <AddTask addTaskEditorId={addTaskEditorId} existingTaskDetails={task} />
              ) : (
                <div className={styles.contentDetailsOverview}>
                  <button
                    className={`${styles.checkbox} ${task.completed ? styles.active : ''}`}
                  // onClick={toggleCompleted}
                  >
                    <div className={styles.checkboxCircle}>
                      <CheckboxTick />
                    </div>
                  </button>
                  <div role="presentation" className={styles.itemOverviewMain} onClick={openTaskEdit}>
                    <div className={styles.itemOverviewHeader}>
                      <div className={styles.itemOverviewContent}>
                        <div className={styles.taskContent}>{task.title}</div>
                      </div>
                      <div className={styles.itemOverviewDescription}>
                        {task.description || 'Description (optional)'}
                      </div>
                    </div>
                    {/* <div className={styles.itemOverviewSub}>
                      <button className={styles.dueControls}>
                        <span className={`${styles.date} ${styles.dateOverdue}`}>
                          <IconOverdue />
                          {getFormattedDate(task.scheduledDate, DateFormats.DD_MMM)}
                        </span>
                      </button>
                    </div> */}
                  </div>
                </div>
              ))}
            {/* <Tabs defaultTab={taskDetails.activeTab!} tabs={TABS} /> */}
          </div>
        </div>
      </div>
    </Modal>
  ) : null;
};

export default TaskDetailsModal;
