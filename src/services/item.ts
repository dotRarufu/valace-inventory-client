import {
  BorrowRecord,
  BorrowResponse,
  Collections,
  ItemRecord,
  ItemResponse,
  UserResponse,
  UtilizeeRecord,
  UtilizeeResponse,
  UtilizerRecord,
} from '../../pocketbase-types';
import pb from '../lib/pocketbase';
import { getAccount } from './accounts';

export const getItem = async (id: string) => {
  const res = await pb.collection(Collections.Item).getOne<ItemResponse>(id);

  return res;
};

export const getAllItems = async () => {
  // todo: add pagination to users of this function
  const res = await pb
    .collection(Collections.Item)
    .getList<ItemResponse>(1, undefined, {
      filter: 'is_removed = false',
    });

  return res;
};

export const getOnStockItems = async () => {
  // todo: add pagination to users of this function
  const res = await pb
    .collection(Collections.Item)
    .getList<ItemResponse>(1, undefined, {
      filter: 'is_removed = false && quantity > 0',
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

export const updateItem = async (id: string, data: ItemUpdate | FormData) => {
  await pb.collection(Collections.Item).update(id, data);
};

export const deleteImage = async (id: string, filenames: string[]) => {
  const data = {
    'images-': filenames,
  };
  await pb.collection(Collections.Item).update(id, data);
};

export const borrowItem = async (data: BorrowRecord) => {
  const res = await pb
    .collection(Collections.Borrow)
    .create<BorrowResponse>(data);

  return res;
};

export const getBorrowedItem = async (id: string) => {
  const res = await pb
    .collection(Collections.Borrow)
    .getOne<BorrowResponse>(id);

  const officeData = await getAccount(res.office);
  const itemData = await getItem(res.item);

  return { ...res, officeData, itemData };
};

export const recordUtilizee = async (data: UtilizeeRecord) => {
  const res = await pb
    .collection(Collections.Utilizee)
    .create<UtilizeeResponse>(data);

  return res;
};

export const recordUtilizer = async (data: UtilizerRecord) => {
  const res = await pb
    .collection(Collections.Utilizer)
    .create<UtilizerRecord>(data);

  return res;
};

export const deleteBorrowed = async (id: string) => {
  const res = await pb.collection(Collections.Borrow).delete(id);

  return res;
};

export const getUtilizees = async (itemId: string) => {
  // todo: add pagination on users of this
  const utilizees = (
    await pb.collection(Collections.Utilizee).getList<UtilizeeResponse>(1, 10, {
      filter: `item = "${itemId}"`,
    })
  ).items;

  const res = await Promise.all(
    utilizees.map(async u => {
      const officeData = await getAccount(u.office);

      return { ...u, officeData };
    })
  );

  return res;
};

const getUtilizerByUtilizee = async (utilizeeId: string) => {
  const res = await pb
    .collection(Collections.Utilizer)
    .getList<UtilizerRecord>(1, 10, {
      filter: `utilizee = '${utilizeeId}'`,
    });

  return res.items[0];
};

const getUtilizerData = async (id: string) => {
  const res = await pb.collection(Collections.User).getOne<UserResponse>(id);

  return res;
};

export const getUtilizeeData = async (id: string) => {
  // todo: add pagination on users of this
  const res = await pb
    .collection(Collections.Utilizee)
    .getOne<UtilizeeResponse>(id);

  const officeData = await getAccount(res.office);
  const utilizer = await getUtilizerByUtilizee(res.id);
  const utilizerData = await getUtilizerData(utilizer.utilizer);

  return { ...res, officeData, utilizerData };
};
