import pb from '../lib/pocketbase';
import { UserResponse } from '../../pocketbase-types';

export const getUser = async (id: string) => {
  const user = await pb.collection('user').getOne<UserResponse>(id);

  return user;
};
