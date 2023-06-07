import * as React from 'react';
import styles from './pre-login-header.module.scss';
import logo from '../../assets/logo/logo.png';
import { NavLink } from 'react-router-dom';

interface IPreLoginHeaderProps {}

const PreLoginHeader: React.FC<IPreLoginHeaderProps> = () => (
  <div className={styles.header}>
    <header>
      <nav>
        <NavLink to="/">
          <img src={logo} alt="logo" width={170} />
        </NavLink>
        <div className={styles.headerOptions}>
          <NavLink to="login" className={styles.option}>
            Login
          </NavLink>
          <NavLink to="signup" className={styles.option}>
            Signup
          </NavLink>
        </div>
      </nav>
    </header>
  </div>
);

export default PreLoginHeader;
