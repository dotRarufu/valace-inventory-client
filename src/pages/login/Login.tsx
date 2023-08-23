import { useContext, useEffect, useState } from 'react';
import pb from '../../lib/pocketbase';
import { UserContext } from '../../contexts/UserContext';
import { toast } from 'react-hot-toast';
import { loginUser } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // Use Form (similar to Angular)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shouldLogin, setShouldLogin] = useState(false);
  const { user, setShouldGetUser } = useContext(UserContext)!;
  const navigate = useNavigate();

  // Automatically navigate to appropriate route
  useEffect(() => {
    if (user !== null) {
      navigate(user.is_admin ? '/admin' : '/staff');
    }
  }, [navigate, user]);

  // Login
  useEffect(() => {
    if (!shouldLogin) return;

    loginUser(username, password)
      .catch(() => {
        toast.error('Login failed', {
          duration: 7000,
          position: 'bottom-center',
          className: 'font-semibold',
        });
      })
      .finally(() => {
        setShouldGetUser(true);
        setShouldLogin(false);
      });
  }, [password, setShouldGetUser, shouldLogin, username]);

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

      <button onClick={() => setShouldLogin(true)} className="btn-primary btn">
        Login
      </button>
      <button onClick={() => pb.authStore.clear()} className="btn-primary btn">
        Logout
      </button>
    </div>
  );
};

export default Login;
