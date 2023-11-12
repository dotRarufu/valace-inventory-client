import { useEffect, useState } from 'react';
import { ItemTypeOptions } from '../../../../pocketbase-types';
import { useNavigate } from 'react-router-dom';
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

const Shipment = () => {
  const navigate = useNavigate();

  const [shipments, setShipments] = useState<Awaited<
    ReturnType<typeof getAllShipmentsAndItems>
  > | null>(null);

  const navigateTo = (path: string) => () => navigate(path);

  // Get shipments, initial
  useEffect(() => {
    getAllShipmentsAndItems()
      .then(d => {
        const withItems = d.filter(a => a.shipmentItems.length > 0);

        setShipments(withItems);
      })
      .catch(err => {
        toast.error('Failed to get shipments', toastSettings);
        console.log(err);
      });
  }, []);

  if (shipments === null)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="loading loading-ring aspect-square w-1/2" />
      </div>
    );

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
