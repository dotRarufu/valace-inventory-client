import { useEffect, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import {
  ItemTypeOptions,
  ShipmentItemRecord,
  ShipmentRecord,
  ShipmentResponse,
} from '../../../../pocketbase-types';
import { useNavigate, useOutlet } from 'react-router-dom';
import { getAllShipmentsAndItems } from '../../../services/shipments';
import { toast } from 'react-hot-toast';
import { toastSettings } from '../../../data/toastSettings';

export type ShipmentItem = {
  name: string;
  tag: ItemTypeOptions;
  id: number;
  requestedBy: string;
  description: string;
  expectedAmount: number;
};

export const dummyItems: ShipmentItem[] = [
  {
    name: 'Wooden Chair',
    tag: ItemTypeOptions.Office,
    id: 0,
    requestedBy: 'IT Office',
    description: 'Upuan ni Andrei',
    expectedAmount: 1,
  },
  {
    name: 'Goofy Mouse',
    tag: ItemTypeOptions.IT,
    id: 1,
    requestedBy: 'IT Office',
    description: 'Mouse ni Andrei',
    expectedAmount: 1,
  },
  {
    name: 'AMD A6 Laptop',
    tag: ItemTypeOptions.IT,
    id: 2,
    requestedBy: 'IT Office',
    description: 'Laptop ko',
    expectedAmount: 1,
  },
];

const Shipment = () => {
  const navigate = useNavigate();

  const [shipments, setShipments] = useState<
    Awaited<ReturnType<typeof getAllShipmentsAndItems>>
  >([]);

  const navigateTo = (path: string) => () => navigate(path);

  // Get shipments, initial
  useEffect(() => {
    getAllShipmentsAndItems()
      .then(d => {
        const withItems = d.filter(a => a.shipmentItems.length > 0);
        console.log('d:', withItems);
        setShipments(withItems);
      })
      .catch(err => {
        toast.error('Failed to get shipments', toastSettings);
      });
  }, []);

  return (
    <div className="absolute flex h-full w-full flex-col gap-4 px-[16px] pb-[8px] font-khula">
      {shipments.length > 0 ? (
        shipments.map(shipment => (
          <div key={shipment.id} className="w-full ">
            <div className="text-lg font-bold">{shipment.month} Shipment</div>

            <ul className="flex flex-col overflow-clip rounded-[5px] ">
              {shipment.shipmentItems.map(item => (
                <li
                  key={item.id}
                  className="flex cursor-pointer items-center justify-between p-2 odd:bg-base-100  even:bg-base-100/40"
                  onClick={navigateTo(item.id.toString())}
                >
                  {item.item_name}
                  <span className="badge badge-success">{item.tag}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div className="flex h-full items-center justify-center">
          <span className=" w-[75%] text-center font-khula text-lg font-semibold">
            There is currently no expected shipment
          </span>
        </div>
      )}
    </div>
  );
};

export default Shipment;
