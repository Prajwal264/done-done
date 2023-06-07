import React, { useCallback, useState } from 'react';
import PrimaryButton from '../../../../components/primary-button/primary-button.component';
import styles from './add-comment-editor.module.scss';

const defaultFormData = {
  comment: '',
};

interface IProps {}

const AddCommentEditor: React.FC<IProps> = ({}) => {
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

  const addComment: React.MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <div className={styles.addCommentEditor}>
      <div className={styles.textareaHolder}>
        <textarea name="comment" onChange={handleChange}></textarea>
        <PrimaryButton content="comment" onClick={addComment} disabled={!!!formData.comment} />
      </div>
    </div>
  );
};

export default AddCommentEditor;
