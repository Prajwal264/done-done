import { useCallback, useState } from 'react';
import styles from './post-login-header.module.scss';
import Hamburger from '../../assets/icons/icon-hamburger.svg';
import Logout from '../../assets/icons/icon-logout.svg';
import AddIcon from '../../assets/icons/icon-add.svg';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../features/sidebar/sidebar.slice';
import AddTaskModal from '../../components/popups/add-task-modal/add-task-modal.component';
import { removeAccessToken, removeRefreshToken } from '../../helpers/token.helper';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

interface IPostLoginHeaderProps { }

const PostLoginHeader: React.FC<IPostLoginHeaderProps> = () => {
  const dispatch = useDispatch();
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const navigate = useNavigate();
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

  const logout = useCallback(() => {
    removeAccessToken();
    removeRefreshToken();
    navigate('/login');
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
          <button
            data-tooltip-id="header-tooltip"
            data-tooltip-content={'Add a new Task'}
            className={styles.topbarBtn}
            onClick={openAddTaskModal}
          >
            <AddIcon />
          </button>
          <button
            data-tooltip-id="header-tooltip"
            data-tooltip-content={'Logout'}
            className={styles.topbarBtn}
            onClick={logout}
          >
            <Logout />
          </button>
        </div>
      </header>
      {showAddTaskModal && <AddTaskModal closePopup={closeAddTaskModal} />}
      <Tooltip id="header-tooltip" place="left" />
    </div>
  );
};

export default PostLoginHeader;
