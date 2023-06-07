import React from 'react';
import styles from './modal-wrapper.module.scss';

interface IProps {
  showBackdrop: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function ModalWrapper(node: React.ReactNode, props: IProps) {
  return (
    <React.Fragment>
      <div
        role={'presentation'}
        className={`${styles.modalWrapper} ${props.showBackdrop ? styles.backdrop : ''}`}
        onClick={props.onClick}
      >
        <div className={styles.modalContent}>{node}</div>
      </div>
    </React.Fragment>
  );
}

export default ModalWrapper;
