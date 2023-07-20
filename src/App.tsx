import { Navigate, Routes, Route } from 'react-router-dom';
import Items from './pages/Items';
import AdminLayout from './components/AdminLayout';
import ActivityLog from './pages/ActivityLog';
import Accounts from './pages/Accounts';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { createContext, useEffect, useState } from 'react';
import pb from './lib/pocketbase';
import { UsersResponse } from '../pocketbase-types';
import { getUser } from './utils/getUser';
import { getUserPath } from './utils/getUserPath';

type UserState = {
  user: UsersResponse | null;
  setUser: React.Dispatch<React.SetStateAction<UsersResponse | null>>;
};

export const UserContext = createContext<UserState | null>(null);

const App = () => {
  const [user, setUser] = useState<UsersResponse | null>(
    // assumes that no pocketbase admin account log in
    pb.authStore.model as unknown as UsersResponse
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route index element={<div>Landing</div>} />
        <Route path="login" element={<Login />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute
              redirectPath={`/${getUserPath(user?.role)}`}
              isAllowed={!!user && user.role === 0}
            >
              {/* {(() => {
                console.log('user role:', user?.role);
                console.log('condition:', !!user && user.role === 0);
                return '';
              })()} */}
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
        <Route path="unauthorized" element={<div>Unauthorized</div>} />

        <Route
          path="staff"
          element={
            <ProtectedRoute
              redirectPath={`/${getUserPath(user?.role)}`}
              isAllowed={!!user && user.role === 1}
            >
              <AdminLayout />
            </ProtectedRoute>
          }
        ></Route>
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
