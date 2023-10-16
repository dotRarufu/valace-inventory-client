import {
  Collections,
  ShipmentRecord,
  ShipmentResponse,
  ShipmentStatusOptions,
} from '../../pocketbase-types';
import pb from '../lib/pocketbase';

export const getAllShipments = async () => {
  const res = await pb
    .collection(Collections.Shipment)
    .getList<ShipmentResponse>(1, 10);

  //   {
  //   filter: 'is_removed = false',
  // });

  return res;
};

export const getShipment = async (id: string) => {
  const res = await pb
    .collection(Collections.Shipment)
    .getOne<ShipmentResponse>(id);

  return res;
};

export const deleteShipment = async (id: string) => {
  // await pb.collection(Collections.Request).update(id, {
  //   is_removed: true,
  // });
  await pb.collection(Collections.Shipment).delete(id);
};

export const createShipment = async (data: Omit<ShipmentRecord, 'status'>) => {
  const querydata: ShipmentRecord = {
    ...data,
    status: ShipmentStatusOptions.WAITING
  };
  const res = await pb
    .collection(Collections.Shipment)
    .create<ShipmentRecord>(querydata);

  return res;
};
