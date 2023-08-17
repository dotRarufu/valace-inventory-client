import { ListResult } from 'pocketbase';
import { Collections, UserRecord, UserResponse } from '../../pocketbase-types';
import pb from '../lib/pocketbase';

export const getAccounts = async (
  callback: (res: ListResult<UserResponse>) => void
) => {
  // Admins are stored in user collection to store the the plain password

  const result = await pb
    .collection(Collections.User)
    // todo: add pagination
    .getList<UserResponse>(1, 10, {
      filter: 'is_removed = false',
    });

  callback(result);
};

export const updateAccount = async (
  id: string,
  data: Partial<UserRecord>,
  callback: () => void
) => {
  await pb.collection(Collections.User).update(id, data);

  callback();
};

export const getAccount = async (
  id: string,
  callback: (res: UserResponse) => void
) => {
  const res = await pb.collection(Collections.User).getOne<UserResponse>(id);

  callback(res);
};

export const addAccount = async (
  data: UserRecord,
  callback: (res: UserResponse) => void
) => {
  const res = await pb.collection(Collections.User).create<UserResponse>(data);

  callback(res);
};
