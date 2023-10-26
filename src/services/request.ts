import {
  Collections,
  RequestRecord,
  RequestResponse,
  RequestStatusOptions,
} from '../../pocketbase-types';
import pb from '../lib/pocketbase';
import { getAccount } from './accounts';

export const createRequest = async (data: Omit<RequestRecord, 'status'>) => {
  const querydata: RequestRecord = {
    ...data,
    status: RequestStatusOptions.PENDING,
  };
  const res = await pb
    .collection(Collections.Request)
    .create<RequestRecord>(querydata);

  return res;
};

export const getAllRequests = async () => {
  const res = await pb
    .collection(Collections.Request)
    .getList<RequestResponse>(1, 10);

  //   {
  //   filter: 'is_removed = false',
  // });

  return res;
};

export const getApprovedRequests = async () => {
  console.log('get approved requets filteR:', {
    filter: `status = ${RequestStatusOptions.APPROVED}`,
  });
  const res = await pb
    .collection(Collections.Request)
    .getList<RequestResponse>(1, 10, {
      filter: `status = "${RequestStatusOptions.APPROVED}"`,
    });

  return res;
};

export const getRequest = async (id: string) => {
  const res = await pb
    .collection(Collections.Request)
    .getOne<RequestResponse>(id);
  const officeData = await getAccount(res.office);

  return { ...res, officeData };
};

// export const addItemImages = async (id: string, data: FormData) => {
//   const res = await pb.collection(Collections.Item).update(id, data);

//   return res;
// };

export const removeRequest = async (id: string) => {
  // await pb.collection(Collections.Request).update(id, {
  //   is_removed: true,
  // });
  await pb.collection(Collections.Request).delete(id);
};

export const judgeRequest = async (id: string, isApproved: boolean) => {
  const data: Partial<RequestRecord> = {
    status: isApproved
      ? RequestStatusOptions.APPROVED
      : RequestStatusOptions.DECLINED,
  };
  await pb.collection(Collections.Request).update(id, data);
};

// export const getData = async (id: string) => {
//   const res = await pb.collection(Collections.Item).getOne<ItemResponse>(id);

//   return res;
// };

// export const getImageUrl = (record: ItemResponse, filename: string) => {
//   return pb.files.getUrl(record, filename);
// };

// export const getImageUrlTokenized = async (
//   record: ItemResponse,
//   filename: string
// ) => {
//   const fileToken = await pb.files.getToken();

//   return pb.files.getUrl(record, filename, {
//     token: fileToken,
//   });
// };

// export type ItemUpdate = Omit<ItemRecord, 'serial_number'>;

// export const updateItem = async (id: string, data: ItemUpdate) => {
//   await pb.collection(Collections.Item).update(id, data);
// };

// export const deleteImage = async (id: string, filenames: string[]) => {
//   const data = {
//     'images-': filenames,
//   };
//   await pb.collection(Collections.Item).update(id, data);
// };
