import React, { useCallback, useRef, useState } from 'react';
import Modal from '../../../packages/modal/modal.component';
import PrimaryButton from '../../primary-button/primary-button.component';
import styles from './confirmation-modal.module.scss';

interface IProps {
  message: string | React.ReactNode;
  confirm: (value: boolean) => void;
  closePopup: () => void;
}

const ConfirmationModal: React.FC<IProps> = ({ message, confirm, closePopup }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside: React.MouseEventHandler<HTMLDivElement> = useCallback((event) => {
    if (modalRef.current && !(modalRef.current as any).contains(event.target)) {
      closePopup();
    }
  }, []);

  return (
    <Modal showBackdrop={false} onClick={handleClickOutside}>
      <div className={styles.addTaskModal} ref={modalRef}>
        <div className={styles.modalBody}>
          <>{message}</>
          <div className={styles.formActions}>
            <div className={styles.actionsContainer}>
              <PrimaryButton content="Yes" type="button" onClick={() => confirm(true)} />
              <PrimaryButton content="No" type="button" onClick={() => confirm(false)} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
