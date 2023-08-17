import { ItemRecord } from '../../pocketbase-types';
import { ItemDataRow } from '../pages/items/Items';

export const toCsvFormat = (data: ItemDataRow) => {
  const {
    name,
    quantity,
    location,
    supplier,
    is_available,
    remarks,
    type,
    images,
    property_number,
    serial_number,
    is_removed,
  } = data;
  const res: ItemRecord = {
    name,
    quantity,
    location,
    supplier,
    is_available,
    remarks,
    type,
    images,
    property_number,
    serial_number,
    is_removed,
  };

  return res;
};
