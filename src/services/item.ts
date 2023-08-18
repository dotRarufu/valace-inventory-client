import { Collections, ItemResponse } from '../../pocketbase-types';
import pb from '../lib/pocketbase';

export const getItem = async (id: string) => {
  const res = await pb.collection(Collections.Item).getOne<ItemResponse>(id);

  return res;
};

export const getAllItems = async () => {
  const res = await pb
    .collection(Collections.Item)
    .getList<ItemResponse>(1, undefined, {
      filter: 'is_removed = false',
    });

  return res;
};

export const addItemImages = async (id: string, data: FormData) => {
  const res = await pb.collection(Collections.Item).update(id, data);

  return res;
};

export const removeItem = async (id: string) => {
  await pb.collection(Collections.Item).update(id, {
    is_removed: true,
  });
};
