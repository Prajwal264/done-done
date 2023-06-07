import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import PreLoginHeader from './pre-login-header/pre-login-header.component';

export interface IPreLoginLayoutProps {}

const PreLoginLayout: React.FC<IPreLoginLayoutProps> = ({ children }) => (
  <Fragment>
    <PreLoginHeader />
    <main>{children}</main>
    <Outlet />
  </Fragment>
);

export default PreLoginLayout;
