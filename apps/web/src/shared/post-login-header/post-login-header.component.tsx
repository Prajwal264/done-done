import { useCallback, useState } from 'react';
import styles from './post-login-header.module.scss';
import Hamburger from '../../assets/icons/icon-hamburger.svg';
import Home from '../../assets/icons/icon-home.svg';
import SearchIcon from '../../assets/icons/icon-search.svg';
import AddIcon from '../../assets/icons/icon-add.svg';
import GraphIcon from '../../assets/icons/icon-graphup.svg';
import NotificationIcon from '../../assets/icons/icon-notification.svg';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../features/sidebar/sidebar.slice';
import AddTaskModal from '../../components/popups/add-task-modal/add-task-modal.component';

interface IPostLoginHeaderProps { }

const PostLoginHeader: React.FC<IPostLoginHeaderProps> = () => {
  const dispatch = useDispatch();
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const triggerSidebarToggle: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.stopPropagation();
      dispatch(toggleSidebar());
    },
    [dispatch],
  );

  const openAddTaskModal = useCallback(() => {
    setShowAddTaskModal(true);
  }, []);

  const closeAddTaskModal = useCallback(() => {
    setShowAddTaskModal(false);
  }, []);

  return (
    <div className={styles.postLoginHeader}>
      <header className={styles.topBar}>
        <div className={styles.leftControl}>
          <button className={styles.topbarBtn} onClick={triggerSidebarToggle}>
            <Hamburger />
          </button>
        </div>
        <div className={styles.rightControl}>
          <button className={styles.topbarBtn} onClick={openAddTaskModal}>
            <AddIcon />
          </button>
        </div>
      </header>
      {showAddTaskModal && <AddTaskModal closePopup={closeAddTaskModal} />}
    </div>
  );
};

export default PostLoginHeader;
