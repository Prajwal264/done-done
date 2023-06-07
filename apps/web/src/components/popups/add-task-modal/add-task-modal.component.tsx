import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../../features/tasks/tasks.slice';
import Modal from '../../../packages/modal/modal.component';
import PrimaryButton from '../../primary-button/primary-button.component';
import styles from './add-task-modal.module.scss';

interface IProps {
  closePopup: () => void;
}

const AddTaskModal: React.FC<IProps> = ({ closePopup }) => {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

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

  const addTaskTrigger: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      e.stopPropagation();
      const { title, description } = formData;
      dispatch(
        addTask({
          title,
          description,
        }),
      );
      closePopup();
    },
    [formData],
  );

  const handleClickOutside: React.MouseEventHandler<HTMLDivElement> = useCallback((event) => {
    if (modalRef.current && !(modalRef.current as any).contains(event.target)) {
      closePopup();
    }
  }, []);
  return (
    <Modal showBackdrop={false} onClick={handleClickOutside}>
      <div className={styles.addTaskModal} ref={modalRef}>
        <div className={styles.modalBody}>
          <form>
            <div className={styles.editingArea}>
              <div className={styles.inputFields}>
                <input type="text" name="title" placeholder="Task name" onChange={handleChange} />
                <div className={styles.textAreaWrapper}>
                  <textarea name="description" placeholder="Description (optional)" onChange={handleChange}></textarea>
                </div>
              </div>
            </div>
            <div className={styles.formActions}>
              <div className={styles.actionsContainer}>
                <PrimaryButton content="Add Task" type="button" onClick={addTaskTrigger} disabled={!!!formData.title} />
                <PrimaryButton content="Cancel" type="button" onClick={closePopup} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddTaskModal;
