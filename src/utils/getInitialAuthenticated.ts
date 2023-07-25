import { UserResponse } from '../../pocketbase-types';
import pb from '../lib/pocketbase';

export const getInitialAuthenticated = () => {
  // no admin account is ever logged in
  const user = pb.authStore.model as unknown as UserResponse | null;

  return user;
};
