import {
  ActivityActionOptions,
  Collections,
  UserResponse,
} from '../../pocketbase-types';
import pb from '../lib/pocketbase';
import { recordActivity } from './logger';

export const loginUser = async (username: string, password: string) => {
  const res = await pb
    .collection(Collections.User)
    .authWithPassword<UserResponse>(username, password);

  await recordActivity(ActivityActionOptions.LOGIN, {
    userId: res.record.id,
  });
};
