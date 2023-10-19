import { Collections, ItemRecord, ItemResponse } from '../../pocketbase-types';
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

export const getData = async (id: string) => {
  const res = await pb.collection(Collections.Item).getOne<ItemResponse>(id);

  return res;
};

export const getImageUrl = (record: ItemResponse, filename: string) => {
  return pb.files.getUrl(record, filename);
};

export const getImageUrlTokenized = async (
  record: ItemResponse,
  filename: string
) => {
  const fileToken = await pb.files.getToken();

  return pb.files.getUrl(record, filename, {
    token: fileToken,
  });
};

export const createItem = async (data: ItemRecord) => {
  const res = await pb.collection(Collections.Item).create<ItemResponse>(data);

  return res;
};

export type ItemUpdate = Partial<ItemRecord>;

 
export const updateItem = async (id: string, data: ItemUpdate) => {
  console.log("updateitem:", id)
  await pb.collection(Collections.Item).update(id, data);
};

export const deleteImage = async (id: string, filenames: string[]) => {
  const data = {
    'images-': filenames,
  };
  await pb.collection(Collections.Item).update(id, data);
};
