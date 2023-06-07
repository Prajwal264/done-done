import React from 'react';
import styles from './comments-tab.module.scss';
import IconEmptyComments from '../../../assets/icons/icon-empty-comments.svg';
import IconEdit from '../../../assets/icons/icon-edit.svg';
import IconDelete from '../../../assets/icons/icon-delete.svg';
import AddCommentEditor from './add-comment-editor/add-comment-editor.component';

interface IProps {}

const CommentsTab: React.FC<IProps> = ({}) => {
  return (
    <div className={styles.commentsTab}>
      <div className={styles.commentsContainer}>
        <div className={styles.commentsListContainer}>
          <div className={styles.commentItem}>
            <img
              src={`https://ui-avatars.com/api/?name=${'Prajwal+P'}&background=fff&bold=true&color=db4c3f`}
              alt="Prajwal P"
            />
            <div className={styles.commentMeta}>
              <span className={styles.username}>Prajwal P.</span>
              <span className={styles.time}>16 Apr 19:26</span>
              <div className={styles.commentActions}>
                <button className={styles.actionItem}>
                  <IconEdit />
                </button>
                <button className={styles.actionItem}>
                  <IconDelete />
                </button>
              </div>
            </div>
            <div className={styles.commentContent}>
              <p>Task 1</p>
            </div>
          </div>
          {false && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIllsutration}>
                <IconEmptyComments />
              </div>
              <div className={styles.emptyStateBody}>
                Add relevant notes, links, files, photos, or anything else here.
              </div>
            </div>
          )}
        </div>
        <AddCommentEditor />
      </div>
    </div>
  );
};

export default CommentsTab;
