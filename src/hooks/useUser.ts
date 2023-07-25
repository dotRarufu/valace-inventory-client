import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '../lib/pocketbase';
import { UserResponse } from '../../pocketbase-types';
import { getInitialAuthenticated } from '../utils/getInitialAuthenticated';

const useUser = () => {
  // sets the initial user
  const [shouldGetUser, setShouldGetUser] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState<UserResponse | null>(
    getInitialAuthenticated()
  );

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

      // console.log('got user:', user);

      if (!user.is_active) {
        setShouldGetUser(false);
        pb.authStore.clear();
        // user has false is_active because auth returns Admin, which does not have is_active
        console.info('user is inactive:', user.is_active);
        return;
      }
      console.log('pb.authStore.isValid', pb.authStore.isValid);
      // todo: untested
      // if (!pb.authStore.isValid) {
      //   pb.authStore.clear();
      //   console.log('authStore is not valid', pb.authStore.isValid);
      //   return;
      // }

      setUser(user);
      setShouldGetUser(false);
      // navigate(user.is_admin ? '/admin' : '/staff');
    };

    void setNewUser();
  }, [navigate, shouldGetUser]);

  useEffect(() => {
    return pb.authStore.onChange((token, model) => {
      token;
      const authenticated = model;
      console.log('auth state changed:', authenticated);
      if (authenticated === null) {
        setUser(null);
        navigate('/login');
        return;
      }

      setShouldGetUser(true);
    });
  }, [navigate, setShouldGetUser, setUser, user]);

  return { user, setShouldGetUser };
};

export default useUser;
