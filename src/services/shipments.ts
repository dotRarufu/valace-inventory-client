import {
  Collections,
  ShipmentItemRecord,
  ShipmentItemResponse,
  ShipmentItemTagOptions,
  ShipmentRecord,
  ShipmentResponse,
  ShipmentStatusOptions,
} from '../../pocketbase-types';
import pb from '../lib/pocketbase';
import {
  RequestItem,
  RestockItemRequest,
} from '../pages/items/SupplyFormSidebar';
import { getItem } from './item';
import { getRequest } from './request';

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
    status: ShipmentStatusOptions.WAITING,
  };
  const res = await pb
    .collection(Collections.Shipment)
    .create<ShipmentRecord>(querydata);

  return res;
};

export const createShipmentItems = async (
  restocks: RestockItemRequest[],
  requests: RequestItem[]
) => {
  const defaultOfficeId = 'lqumdc60rwqdjom';

  const requestsData = await Promise.all(
    requests.map(async r => getRequest(r.id))
  );

  const restocksData = await Promise.all(
    restocks.map(async r => getItem(r.id))
  );

  const dataRequests: ShipmentItemRecord[] = requestsData.map(r => ({
    expected_amount: r.amount,
    item_name: r.item_name,
    office: r.office,
    tag: r.tag as unknown as ShipmentItemTagOptions,
    unit: r.unit,
  }));

  const dataRestocks: ShipmentItemRecord[] = restocksData.map(r => {
    const match = restocks.filter(({ id }) => id === r.id);

    if (match.length === 0)
      console.error('r.id was not found in passed restocks parameter');

    const expectedAmount = match[0].amount;

    return {
      expected_amount: expectedAmount,
      item_name: r.name,
      office: defaultOfficeId,
      tag: r.type as unknown as ShipmentItemTagOptions,
      unit: r.unit,
    };
  });

  const data: ShipmentItemRecord[] = [...dataRequests, ...dataRestocks];

  console.log('data:', data);

  const res = await Promise.all(
    data.map(
      async d =>
        await pb
          .collection(Collections.ShipmentItem)
          .create<ShipmentItemResponse>(d)
    )
  );

  return res;
};
