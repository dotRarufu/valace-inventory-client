import { useContext, useEffect, useState } from 'react';
import pb from '../lib/pocketbase';

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { getUser } from '../utils/getUser';
import { getUserPath } from '../utils/getUserPath';
import { UsersResponse } from '../../pocketbase-types';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shouldLogin, setShouldLogin] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext)!;

  useEffect(() => {
    if (user !== null) {
      navigate('/' + getUserPath(user.role));
    }
  }, [navigate, user]);

  useEffect(() => {
    if (shouldLogin) {
      const loginUser = async () => {
        const user = await pb
          .collection('users')
          .authWithPassword<UsersResponse>(username, password);

        console.log('user login successful:');

        setUser(user.record);
        setShouldLogin(false);
        navigate('/admin');
      };

      void loginUser();
    }
  }, [navigate, password, setUser, shouldLogin, username]);

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
