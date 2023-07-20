import { Admin } from 'pocketbase';
import { ChangeEvent, useEffect, useState } from 'react';
import pb from '../../lib/pocketbase';

const AuthenticationTest = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shouldLoginAdmin, setShouldLoginAdmin] = useState(false);
  const [shouldSignUpUser, setShouldSignUpUser] = useState(false);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [shouldLogOut, setShouldLogOut] = useState(false);
  const [shouldLoginUser, setShouldLoginUser] = useState(false);

  // Get collections
  useEffect(() => {
    //* Temporary
    if (shouldFetch) {
      const fetchTestCollection = async () => {
        const records = await pb.collection('test').getFullList({
          sort: '-created',
        });

        console.log('res:', records);

        setShouldFetch(false);
      };

      fetchTestCollection().catch(err => {
        console.log('error:', err);
      });
    }
  }, [shouldFetch]);

  // Logout
  useEffect(() => {
    if (shouldLogOut) {
      pb.authStore.clear();

      setShouldLogOut(false);
    }
  }, [shouldLogOut]);

  // Login admin
  useEffect(() => {
    if (shouldLoginAdmin) {
      const loginAsAdmin = async () => {
        const authData = await pb.admins.authWithPassword(username, password);
        console.log('admin:', authData.admin);

        setAdmin(authData.admin);
        setShouldLoginAdmin(false);
      };

      loginAsAdmin().catch(err => {
        console.log('error logging in as admin:', err);
      });
    }
  }, [password, shouldLoginAdmin, username]);

  // Sign up user
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'https://api.example.com/data' with your actual API endpoint
        const response = await fetch('https://api.example.com/data');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    void fetchData();
  }, [password, shouldSignUpUser, username]);

  // Log in user
  useEffect(() => {
    if (shouldLoginUser) {
      const loginUser = async () => {
        const authData = await pb
          .collection('users')
          .authWithPassword(username, password);

        console.log('user login successful:', authData.record);
        setShouldLoginUser(false);
      };

      loginUser().catch(err => {
        console.log('err:', err);
      });
    }
  }, [password, shouldLoginUser, username]);

  const handleUsernameFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setUsername(value);
  };

  const handlePasswordFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setPassword(value);
  };

  const handleLoginButtonClick = () => {
    console.log('username:', username);
    console.log('password:', password);

    setShouldLoginAdmin(true);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Username"
        className="input input-bordered w-full max-w-xs"
        value={username}
        onChange={e => handleUsernameFieldChange(e)}
      />
      <input
        type="password"
        placeholder="Password"
        className="input input-bordered w-full max-w-xs"
        value={password}
        onChange={e => handlePasswordFieldChange(e)}
      />
      <div className="flex flex-col gap-2">
        <button onClick={handleLoginButtonClick} className="btn btn-primary">
          Login Admin
        </button>
        <button
          onClick={() => setShouldLoginUser(true)}
          className="btn btn-primary"
        >
          Login User
        </button>
        <button
          onClick={() => setShouldSignUpUser(true)}
          className="btn btn-primary"
        >
          Sign Up User
        </button>
        <button
          onClick={() => setShouldFetch(true)}
          className="btn btn-primary"
        >
          Fetch Test Collection
        </button>
        <button
          onClick={() => setShouldLogOut(true)}
          className="btn btn-primary"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default AuthenticationTest;
