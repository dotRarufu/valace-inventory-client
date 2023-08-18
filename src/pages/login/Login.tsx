import { useContext, useEffect, useState } from 'react';
import pb from '../../lib/pocketbase';
import { useNavigate } from 'react-router-dom';
import {
  ActivityActionOptions,
  ActivityRecord,
  Collections,
  UserResponse,
} from '../../../pocketbase-types';
import { UserContext } from '../../contexts/UserContext';
import { Collection } from 'pocketbase';
import { toast } from 'react-hot-toast';
import { recordActivity } from '../../services/logger';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shouldLogin, setShouldLogin] = useState(false);
  const navigate = useNavigate();
  const { user, setShouldGetUser } = useContext(UserContext)!;

  useEffect(() => {
    if (user !== null) {
      navigate(user.is_admin ? '/admin' : '/staff');
    }
  }, [navigate, user]);

  useEffect(() => {
    if (shouldLogin) {
      const loginUser = async () => {
        try {
          const res = await pb
            .collection(Collections.User)
            .authWithPassword<UserResponse>(username, password);

          console.log('login successful:');

          await recordActivity(ActivityActionOptions.LOGIN, {
            userId: res.record.id,
          });
        } catch (err) {
          toast.error('Login failed', {
            duration: 7000,
            position: 'bottom-center',
            className: 'font-semibold',
          });
        } finally {
          setShouldGetUser(true);
          setShouldLogin(false);
        }
      };

      void loginUser();
    }
  }, [password, setShouldGetUser, shouldLogin, username]);

  const handleLogin = () => {
    setShouldLogin(true);
    console.log('login clicked');
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-[8px] ">
      <input
        onChange={e => setUsername(e.target.value)}
        className="input-bordered input"
        placeholder="Username"
        type="email"
      />
      <input
        onChange={e => setPassword(e.target.value)}
        className="input-bordered input"
        placeholder="Password"
      />

      <button onClick={handleLogin} className="btn-primary btn">
        Login
      </button>
      <button onClick={() => pb.authStore.clear()} className="btn-primary btn">
        Logout
      </button>
    </div>
  );
};

export default Login;
