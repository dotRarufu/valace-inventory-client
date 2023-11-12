import {
  Collections,
  ShipmentItemRecord,
  ShipmentItemResponse,
  ShipmentItemTagOptions,
  ShipmentItemTypeOptions,
  ShipmentRecord,
  ShipmentResponse,
  ShipmentStatusOptions,
} from '../../pocketbase-types';
import pb from '../lib/pocketbase';
import {
  RequestItem,
  RestockItemRequest,
} from '../pages/items/SupplyFormSidebar';
import { getAccount } from './accounts';
import { getUser } from './auth';
import { getItem } from './item';
import { getRequest } from './request';

export const getAllShipments = async () => {
  // Todo: add pagination on users of this function

  const res = await pb
    .collection(Collections.Shipment)
    .getList<ShipmentResponse>(1, 10);

  const actualRes = await Promise.all(
    res.items.map(async i => {
      const { username, name } = await getUser(i.created_by);

      return { ...i, created_by: name || username };
    })
  );

  return actualRes;
};

export const getAllShipmentsAndItems = async () => {
  const shipments = await pb
    .collection(Collections.Shipment)
    .getList<ShipmentResponse>(1, 10, {
      filter: `status = "${ShipmentStatusOptions.WAITING}"`,
    });

  const shipmentsId = shipments.items.map(r => r.id);

  const shipmentItems = (
    await Promise.all(
      shipmentsId.map(async id => await getShipmentItemFromShipmentId(id))
    )
  ).flat();
  // console.log('shipmentItems:', shipmentItems);
  const container: (ShipmentResponse & {
    shipmentItems: ShipmentItemResponse[];
  })[] = shipments.items.map(s => ({ ...s, shipmentItems: [] }));

  const res = container.map(shipment => {
    const match = shipmentItems.filter(item => item.shipment === shipment.id);

    return { ...shipment, shipmentItems: match };
  });

  return res;
};

export const getShipment = async (id: string) => {
  const res = await pb
    .collection(Collections.Shipment)
    .getOne<ShipmentResponse>(id);

  return res;
};

export const deleteShipmentItem = async (id: string) => {
  // await pb.collection(Collections.Request).update(id, {
  //   is_removed: true,
  // });

  const res = await pb.collection(Collections.ShipmentItem).delete(id);

  return res;
};

export const deleteShipment = async (id: string) => {
  // await pb.collection(Collections.Request).update(id, {
  //   is_removed: true,
  // });
  console.log('delete shipemnt:', id);
  const shipmentItems = await pb
    .collection(Collections.ShipmentItem)
    .getFullList({ filter: `shipment = '${id}'` });
  await Promise.all(
    shipmentItems.map(
      async i => await pb.collection(Collections.ShipmentItem).delete(i.id)
    )
  );

  await pb.collection(Collections.Shipment).delete(id);
};

export const createShipment = async (data: Omit<ShipmentRecord, 'status'>) => {
  const querydata: ShipmentRecord = {
    ...data,
    status: ShipmentStatusOptions.WAITING,
  };
  const res = await pb
    .collection(Collections.Shipment)
    .create<ShipmentResponse>(querydata);

  return res;
};

export const createShipmentItems = async (
  restocks: RestockItemRequest[],
  requests: RequestItem[],
  shipmentId: string
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
    shipment: shipmentId,
    type: ShipmentItemTypeOptions.REQUEST,
    request: r.id,
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
      shipment: shipmentId,
      type: ShipmentItemTypeOptions.RESTOCK,
      restock_item_id: r.id,
    };
  });

  const data: ShipmentItemRecord[] = [...dataRequests, ...dataRestocks];

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

const getShipmentItemFromShipmentId = async (id: string) => {
  const res = await pb
    .collection(Collections.ShipmentItem)
    .getFullList<ShipmentItemResponse>({
      filter: `shipment = "${id}" && received_amount = 0`,
    });

  return res;
};

export const getShipmentItem = async (id: string) => {
  const res = await pb
    .collection(Collections.ShipmentItem)
    .getOne<ShipmentItemResponse>(id);
  const officeData = await getAccount(res.office);

  return { ...res, officeData };
};

export const updateShipmentItem = async (
  id: string,
  data: Partial<ShipmentItemRecord>
) => {
  const res = await pb
    .collection(Collections.ShipmentItem)
    .update<ShipmentItemResponse>(id, data);

  return res;
};

export const checkAndMarkShipmentAsComplete = async (id: string) => {
  const items = await pb
    .collection(Collections.ShipmentItem)
    .getFullList<ShipmentItemResponse>({
      filter: `shipment = "${id}" && received_amount = 0`,
    });

  // - 1 to account the current request
  if (items.length === 0) {
    const data: Partial<ShipmentRecord> = {
      status: ShipmentStatusOptions.COMPLETED,
    };

    const res = await pb
      .collection(Collections.Shipment)
      .update<ShipmentResponse>(id, data);

    return res;
  }
};
