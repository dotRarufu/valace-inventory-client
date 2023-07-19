import { Navigate, Routes, Route } from 'react-router-dom';
import Items from './pages/Items';
import AdminLayout from './components/AdminLayout';
import ActivityLog from './pages/ActivityLog';
import Accounts from './pages/Accounts';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { createContext, useState } from 'react';
import pb from './lib/pocketbase';
import { Admin, Record } from 'pocketbase';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Root />,
//     children: [
//       {
//         path: 'login',
//         element: <Login />,
//       },
//     ],
//   },
//   {
//     path: 'app',
//     element: <ProtectedRoute />
//     children: [
//       {
//         path: 'admin',
//         element: <Admin />,
//         children: [
//           {
//             path: '',
//             element: <Navigate to={'/app/items'} />,
//           },
//           {
//             path: 'reports',
//             element: <div>reports</div>,
//           },
//           {
//             path: 'items',
//             element: <Items />,
//           },
//           {
//             path: 'activity-log',
//             element: <ActivityLog />,
//           },
//           {
//             path: 'accounts',
//             element: <Accounts />,
//           },
//         ],
//       },
//     ],
//   },
// ]);

type UserState = {
  user: Record | Admin | null;
  setUser: React.Dispatch<React.SetStateAction<Record | Admin | null>>;
};

export const UserContext = createContext<UserState | null>(null);

const App = () => {
  const [user, setUser] = useState(pb.authStore.model);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route index element={<div>Landing</div>} />
        <Route path="login" element={<Login />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute redirectPath="/login" isAllowed={!!user}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="items" />} />
          <Route path="reports" element={<div>reports</div>} />
          <Route path="items" element={<Items />} />
          <Route path="activity-log" element={<ActivityLog />} />
          <Route path="accounts" element={<Accounts />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;

// pb.authStore.onChange((token, model) => {
//   if (model === null) {
//     console.log('auth state: no user');
//     navigate('/login');

//     return;
//   }

//   console.log('auth state: has user');
//   navigate('/admin');
// });
