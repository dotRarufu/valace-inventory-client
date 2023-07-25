import { useContext, useEffect, useState } from 'react';
import pb from '../lib/pocketbase';
import { useNavigate } from 'react-router-dom';
import { Collections, UserResponse } from '../../pocketbase-types';
import { UserContext } from '../contexts/userContext';

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
          await pb
            .collection(Collections.User)
            .authWithPassword<UserResponse>(username, password);

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
