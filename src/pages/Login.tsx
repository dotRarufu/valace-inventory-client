import { useContext, useEffect, useState } from 'react';
import pb from '../lib/pocketbase';
import { useNavigate } from 'react-router-dom';
import {
  ActivityActionOptions,
  ActivityRecord,
  Collections,
  UserResponse,
} from '../../pocketbase-types';
import { UserContext } from '../contexts/userContext';
import { Collection } from 'pocketbase';
import { recordActivity } from '../utils/recordActivity';
import { toast } from 'react-hot-toast';

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
    <div className="w-screen h-screen justify-center items-center gap-[8px] flex-col flex ">
      <input
        onChange={e => setUsername(e.target.value)}
        className="input input-bordered"
        placeholder="Username"
        type="email"
      />
      <input
        onChange={e => setPassword(e.target.value)}
        className="input input-bordered"
        placeholder="Password"
      />

      <button onClick={handleLogin} className="btn btn-primary">
        Login
      </button>
      <button onClick={() => pb.authStore.clear()} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
};

export default Login;
