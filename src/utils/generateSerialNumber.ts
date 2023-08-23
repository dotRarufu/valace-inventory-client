import { Collections, CountRecord } from '../../pocketbase-types';
import pb from '../lib/pocketbase';

const itemId = 'm940ztp5mzi2wlq';

// todo: improve type
async function generateSerialNumber<T extends number | undefined, R = T extends number ? string[] : string>(
  itemsLength?: number
): Promise<R> {
  const item = await pb
    .collection(Collections.Count)
    .getOne<CountRecord>(itemId);

  const newLast = item.count + 1;

  if (itemsLength !== undefined) {
    const serialNumbers = new Array(itemsLength).fill(null).map((_, i) => {
      const a =
        new Date().getFullYear().toString() +
        '-' +
        (newLast + i).toString().padStart(4, '0');

      return a;
    });
    
    return serialNumbers as R;
  } else {
    return (
      new Date().getFullYear().toString() +
      '-' +
      newLast.toString().padStart(4, '0')
    ) as R;
  }
}

export default generateSerialNumber;
