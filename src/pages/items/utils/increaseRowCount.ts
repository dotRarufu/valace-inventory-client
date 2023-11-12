import { Collections, CountRecord } from '../../../../pocketbase-types';
import pb from '../../../lib/pocketbase';

export const increaseRowCount = async (rowId: string, count?: number) => {
  const old = await pb.collection(Collections.Count).getOne<CountRecord>(rowId);
  await pb.collection(Collections.Count).update<CountRecord>(rowId, {
    count: count !== undefined ? old.count + count : old.count + 1,
  });
  console.log('asd:', {
    count: count !== undefined ? old.count + count : old.count + 1,
  });
};
