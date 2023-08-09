import { Collections, CountRecord } from '../../pocketbase-types';
import pb from '../lib/pocketbase';

const itemId = 'm940ztp5mzi2wlq';

export const generateSerialNumber = async () => {
  const item = await pb
    .collection(Collections.Count)
    .getOne<CountRecord>(itemId);

  const newLast = item.count + 1;

  return (
    new Date().getFullYear().toString() +
    '-' +
    newLast.toString().padStart(4, '0')
  );
};
