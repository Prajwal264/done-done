import { FC, useCallback, useEffect, useRef } from 'react';
import styles from './app-sidebar.module.scss';
import Inbox from '../../assets/icons/icon-inbox-page.svg';
import Completed from '../../assets/icons/icon-completed.svg';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../features/sidebar/sidebar.slice';

interface Props { }

const SIDEBAR_ITEMS = [
  {
    id: 'all-tasks',
    name: 'All Tasks',
    icon: <Inbox />,
    iconColor: '#246fe0',
    link: 'all',
  },
  {
    id: 'completed',
    name: 'Completed',
    icon: <Completed />,
    iconColor: '#eb8909',
    link: 'completed',
  },
];

const AppSidebar: FC<Props> = () => {
  const showSidebar = useSelector((state: RootState) => state.showSidebar);
  const sidebarRef = useRef(null);
  const dispatch = useDispatch();
  const handleOutsideClick = (event: Event) => {
    event.stopPropagation();
    if (showSidebar && sidebarRef.current && !(sidebarRef.current as any).contains(event.target)) {
      dispatch(toggleSidebar(false));
    }
  };

  const handleClickNavItem: React.MouseEventHandler<HTMLAnchorElement> = useCallback(() => {
    if (window.innerWidth < 750) {
      dispatch(toggleSidebar(false));
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth < 750) {
      window.addEventListener('click', handleOutsideClick);

      return () => {
        window.removeEventListener('click', handleOutsideClick);
      };
    }
  }, []);
  return (
    <aside className={`${styles.appSidebar} ${showSidebar ? '' : styles.hideSidebar}`} ref={sidebarRef}>
      <div className={styles.sidebarContent}>
        <ul>
          {SIDEBAR_ITEMS.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.link}
                onClick={handleClickNavItem}
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                <span className={styles.iconHolder} style={{ color: item.iconColor }}>
                  {item.icon}
                </span>
                <span className={styles.itemContent}>
                  {item.name}
                  {/* <small aria-label="3 tasks" className={styles.itemCounter}>
                3
              </small> */}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default AppSidebar;
