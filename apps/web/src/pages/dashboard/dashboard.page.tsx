import { lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import DashbaordLayout from '../../modules/dashboard/dashboard-layout.component';
import Lazyload from '../../shared/lazyload.component';
import { Provider } from 'react-redux';
import { store } from '../../store';
import TaskDetailsModal from '../../shared/task-details-modal/task-details-modal.component';
import { getAccessToken } from '../../helpers/token.helper';

const CompletedTasksPage = lazy(() => import('../../modules/dashboard/completed-tasks/completed-tasks.component'));
const AllTasksPage = lazy(() => import('../../modules/dashboard/all-taks/all-tasks'));

interface IDashboardProps { }

const Dashboard: React.FC<IDashboardProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      navigate('/login');
    }
  }, []);

  return (
    <Provider store={store}>
      <Routes>
        <Route path="" element={<DashbaordLayout />}>
          <Route
            path="all"
            element={
              <Lazyload>
                <AllTasksPage />
              </Lazyload>
            }
          ></Route>
          <Route
            path="completed"
            element={
              <Lazyload>
                <CompletedTasksPage />
              </Lazyload>
            }
          ></Route>
          <Route path="*" element={<Navigate to="all" replace />} />
        </Route>
      </Routes>
      <TaskDetailsModal />
    </Provider>
  );
};
export default Dashboard;
