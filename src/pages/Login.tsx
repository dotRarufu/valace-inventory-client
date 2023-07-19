import { useContext, useEffect, useState } from 'react';
import pb from '../lib/pocketbase';

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shouldLogin, setShouldLogin] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext)!;

  useEffect(() => {
    console.log('user:', user);
    if (user !== null) {
      console.log('has user, navigate to admin:', user);
      navigate('/admin');
    }
  }, [navigate, user]);

  useEffect(() => {
    console.log('shouldLogin:', shouldLogin);
    if (shouldLogin) {
      const loginUser = async () => {
        const authData = await pb
          .collection('users')
          .authWithPassword(username, password);

        console.log('user login successful:');
        setUser(authData.record);
        setShouldLogin(false);
        navigate('/admin');
      };

      loginUser().catch(err => {
        console.log('err:', err);
      });
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
