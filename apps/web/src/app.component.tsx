import { Component, lazy } from 'react';
import type { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import Lazyload from './shared/lazyload.component';
import PreLoginLayout from './shared/pre-login-layout.component';

const Home = lazy(() => import('./pages/home/home.page'));
const Signup = lazy(() => import('./pages/signup/signup.page'));
const Login = lazy(() => import('./pages/login/login.page'));
const Dashboard = lazy(() => import('./pages/dashboard/dashboard.page'));

export class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<PreLoginLayout />}>
          <Route
            index
            element={
              <Lazyload>
                <Home />
              </Lazyload>
            }
          />
          <Route
            path="signup"
            element={
              <Lazyload>
                <Signup />
              </Lazyload>
            }
          />
          <Route
            path="login"
            element={
              <Lazyload>
                <Login />
              </Lazyload>
            }
          />
        </Route>
        <Route
          path="app/*"
          element={
            <Lazyload>
              <Dashboard />
            </Lazyload>
          }
        />
      </Routes>
    );
  }
}
