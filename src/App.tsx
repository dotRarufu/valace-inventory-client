import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import ActivityLog from './pages/ActivityLog';
import Accounts from './pages/Accounts';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';
import useUser from './hooks/useUser';
import { UserContext } from './contexts/userContext';
import ItemsSidebar from './components/Drawer/ItemsSidebar';
import Items from './pages/Items';

const App = () => {
  const { user, setShouldGetUser } = useUser();

  useEffect(() => {
    console.log('user:', user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setShouldGetUser }}>
      <Routes>
        <Route index element={<div>Landing</div>} />
        <Route path="login" element={<Login />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute
              redirectPath={
                user === null ? '/login' : user.is_admin ? '/admin' : '/staff'
              }
              isAllowed={!!user && user.is_admin}
            >
              {/* {(() => {
                console.log('user?.is_admin:', user?.is_admin);
                console.log(
                  'condition:',
                  user === null ? '/login' : user.is_admin ? '/admin' : '/staff'
                );
                return '';
              })()} */}
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="items" />} />
          <Route path="reports" element={<div>reports</div>} />
          <Route path="items" element={<Items />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="activity-log" element={<ActivityLog />} />
        </Route>
        <Route path="unauthorized" element={<div>Unauthorized</div>} />

        <Route
          path="staff"
          element={
            <ProtectedRoute
              redirectPath={
                user === null ? '/login' : !user.is_admin ? '/staff' : '/admin'
              }
              isAllowed={!!user && !user.is_admin}
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
