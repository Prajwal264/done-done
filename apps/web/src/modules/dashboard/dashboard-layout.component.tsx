import React, { FC, Fragment, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AppSidebar from '../../shared/app-sidebar/app-sidebar';
import PostLoginHeader from '../../shared/post-login-header/post-login-header.component';
import { RootState } from '../../store';
import styles from './dashboard-layout.module.scss';
import { useSelector } from 'react-redux';
import { getAccessToken } from '../../helpers/token.helper';

interface Props { }

const DashbaordLayout: FC<Props> = ({ }) => {

  const showSidebar = useSelector((state: RootState) => state.showSidebar);
  const navigate = useNavigate();

  useEffect(() => {
    redirectionCheck();
  }, []);

  const redirectionCheck = () => {
    const token = getAccessToken();
    if (!token) {
      navigate('/login');
    } else {
      navigate('all');
    }
  };

  return (
    <Fragment>
      <PostLoginHeader />
      <main className={styles.appLayoutWrapper}>
        <div className={styles.appLayout}>
          <AppSidebar />
          <div className={`${styles.mainContent} ${showSidebar ? '' : styles.moveLeft}`}>
            <Outlet />
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default DashbaordLayout;
