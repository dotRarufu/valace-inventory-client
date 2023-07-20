import { useContext, useEffect, useState } from 'react';
import pb from '../lib/pocketbase';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { Collections, UserResponse } from '../../pocketbase-types';
import { Collection } from 'pocketbase';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shouldLogin, setShouldLogin] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, setShouldGetUser } = useContext(UserContext)!;
  // para mas dumali, hindi kaylangan iduplicate yung acounts ng admins sa staff collection
  const [role, setRole] = useState<'user' | 'admin'>('user');

  useEffect(() => {
    if (user !== null) {
      navigate('/' + user?.role || 'unauthorized');
    }
  }, [navigate, user]);

  useEffect(() => {
    if (shouldLogin) {
      const loginUser = async () => {
        try {
          if (role === 'user') {
            await pb
              .collection('user')
              .authWithPassword<UserResponse>(username, password);
          }

          await pb.admins.authWithPassword(username, password);

          console.log('login successful:');
        } catch (err) {
          console.log('show toast, error occured');
        } finally {
          setShouldGetUser(true);
          setShouldLogin(false);
        }
      };

      void loginUser();
    }
  }, [password, role, setShouldGetUser, shouldLogin, username]);

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
      />
      <input
        onChange={e => setPassword(e.target.value)}
        className="input input-bordered"
        placeholder="Password"
      />
      <div className="gap-[16px] flex items-center">
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={role === 'admin'}
          onChange={e => setRole(e.target.checked ? 'admin' : 'user')}
        />
        <span className="font-khula text-[20px] capitalize h-[13px] font-semibold leading-none">
          {role}
        </span>
      </div>

      <button onClick={handleLogin} className="btn btn-primary">
        Login
      </button>
    </div>
  );
};

export default Login;
