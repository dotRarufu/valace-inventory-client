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
import { getUserPath } from './utils/getUserPath';
import { Admin } from 'pocketbase';

type UserState = {
  user: { role: string; user: UserResponse | Admin } | null;
  setUser: React.Dispatch<
    React.SetStateAction<{ role: string; user: UserResponse | Admin } | null>
  >;
  setShouldGetUser: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserContext = createContext<UserState | null>(null);

const checkIsAdmin = async (id: string) => {
  try {
    const res = await pb.admins.getOne<Admin>(id);

    return res;
  } catch (err) {
    return null;
  }
};

type PocketbaseError = {
  code: number;
  message: string;
  data: unknown;
};

const checkIsStaff = async (id: string) => {
  try {
    const res = await pb.collection('user').getOne<UserResponse>(id);

    return res;
  } catch (err) {
    return null;
  }
};

// todo: unduplicate fn name
const getUser = async (id: string) => {
  const staffRes = await checkIsStaff(id);
  const isStaff = staffRes !== null;

  if (isStaff) return { role: 'user', user: staffRes };

  const adminRes = await checkIsAdmin(id);
  const isAdmin = adminRes !== null;

  if (isAdmin) return { role: 'admin', user: adminRes };

  throw new Error('unknown user, no role assigned');
};

const App = () => {
  const [user, setUser] = useState<{
    role: string;
    user: UserResponse | Admin;
  } | null>(null);
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

      const user = await getUser(authenticated.id);

      setUser(user);
      setShouldGetUser(false);
      navigate('/' + user.role);
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
      if (authenticated === null) return;

      setUser(user);
      setShouldGetUser(true);
    });
  }, [user]);

  // add uef that watches authStore, then set user
  return (
    <UserContext.Provider value={{ user, setUser, setShouldGetUser }}>
      <Routes>
        <Route index element={<div>Landing</div>} />
        <Route path="login" element={<Login />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute
              redirectPath={user?.role || '/login'}
              isAllowed={!!user && user.role === 'admin'}
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
              redirectPath={user?.role || '/login'}
              isAllowed={!!user && user.role === 'user'}
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
