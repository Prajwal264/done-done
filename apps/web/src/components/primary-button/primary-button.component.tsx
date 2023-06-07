import React, { FC } from 'react';

import styles from './primary-button.module.scss';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  content: string;
  loading?: boolean;
}

const PrimaryButton: FC<Props> = ({ content, loading, ...rest }) => (
  <button className={styles.button} disabled={rest.disabled || loading} {...rest}>
    <div>{content}</div>
    {loading && (
      <div className={styles.ldsRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )}
  </button>
);

export default PrimaryButton;
