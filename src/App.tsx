import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import Items from './pages/Items';
import Root from './components/Root';
import ActivityLog from './pages/ActivityLog';
import Accounts from './pages/Accounts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Navigate to={'/reports'} />,
      },
      {
        path: 'reports',
        element: <div>reports</div>,
      },
      {
        path: 'items',
        element: <Items />,
      },
      {
        path: 'activity-log',
        element: <ActivityLog />,
      },
      {
        path: 'accounts',
        element: <Accounts />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
