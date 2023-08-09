import pb from '../lib/pocketbase';
import { Collections, CountRecord } from '../../pocketbase-types';

export const increaseRowCount = async (rowId: string, count?: number) => {
  const old = await pb.collection(Collections.Count).getOne<CountRecord>(rowId);
  const req = await pb
    .collection(Collections.Count)
    .update<CountRecord>(rowId, {
      count: count !== undefined ? old.count + count : old.count + 1,
    });
  console.log('asd:', {
    count: count !== undefined ? old.count + count : old.count + 1,
  });
};
