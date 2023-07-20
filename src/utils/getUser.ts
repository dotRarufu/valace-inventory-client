import pb from '../lib/pocketbase';
import { UsersResponse } from '../../pocketbase-types';

export const getUser = async (id: string) => {
  const user = await pb.collection('users').getOne<UsersResponse>(id);

  return user;
};
