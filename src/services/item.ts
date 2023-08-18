import { Collections, ItemResponse } from '../../pocketbase-types';
import pb from '../lib/pocketbase';

export const getItem = async (id: string) => {
  const res = await pb.collection(Collections.Item).getOne<ItemResponse>(id);

  return res;
};
