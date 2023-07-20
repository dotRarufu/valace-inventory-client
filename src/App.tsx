import { Navigate, Routes, Route, useNavigate } from 'react-router-dom';
import Items from './pages/Items';
import AdminLayout from './components/AdminLayout';
import ActivityLog from './pages/ActivityLog';
import Accounts from './pages/Accounts';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { createContext, useEffect, useState } from 'react';
import pb from './lib/pocketbase';
import { UserResponse } from '../pocketbase-types';

type UserState = {
  user: UserResponse | null;

  setShouldGetUser: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserContext = createContext<UserState | null>(null);

type PocketbaseError = {
  code: number;
  message: string;
  data: unknown;
};

const App = () => {
  const [user, setUser] = useState<UserResponse | null>(null);
  // sets the initial user
  const [shouldGetUser, setShouldGetUser] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const setNewUser = async () => {
      if (!shouldGetUser) return;

      const authenticated = pb.authStore.model;

      if (authenticated === null) {
        setShouldGetUser(false);
        return;
      }

      const user = await pb
        .collection('user')
        .getOne<UserResponse>(authenticated.id);

      console.log('got user:', user);

      if (!user.is_active) {
        setShouldGetUser(false);
        pb.authStore.clear();
        // user has false is_active because auth returns Admin, which does not have is_active
        console.info('user is inactive:', user.is_active);
        return;
      }

      setUser(user);
      setShouldGetUser(false);
      navigate(user.is_admin ? '/admin' : '/staff');
    };

    void setNewUser();
  }, [navigate, shouldGetUser]);

  useEffect(() => {
    console.log('shouldGetUser:', shouldGetUser);
  }, [shouldGetUser]);

  useEffect(() => {
    console.log('user:', user);
  }, [user]);

  useEffect(() => {
    return pb.authStore.onChange((token, model) => {
      const authenticated = model;
      console.log('auth state changed:', authenticated);
      if (authenticated === null) {
        setUser(null);
        navigate('/login');
        return;
      }

      setShouldGetUser(true);
    });
  }, [navigate, user]);

  // add uef that watches authStore, then set user
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

// pb.authStore.onChange((token, model) => {
//   if (model === null) {
//     console.log('auth state: no user');
//     navigate('/login');

//     return;
//   }

//   console.log('auth state: has user');
//   navigate('/admin');
// });
