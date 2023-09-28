import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { ItemTypeOptions } from '../../../../pocketbase-types';
import { useNavigate, useOutlet } from 'react-router-dom';

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
  const [activeShipment, setActiveShipment] = useState('September 2023');
  const [items, setItems] = useState(dummyItems);

  const navigateTo = (path: string) => () => navigate(path);
  const outlet = useOutlet();

  return (
    outlet || (
      <div className="absolute flex h-full w-full flex-col gap-2 px-[16px] font-khula">
        {items.length > 0 ? (
          <div className="w-full ">
            <div className="text-lg font-bold">{activeShipment} Shipment</div>

            <ul className="flex flex-col overflow-clip rounded-[5px] ">
              {items.map(item => (
                <li
                  className="flex items-center justify-between p-2 odd:bg-base-100 cursor-pointer  even:bg-base-100/40"
                  onClick={navigateTo(item.id.toString())}
                >
                  {item.name}
                  <span className="badge badge-success">{item.tag}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className=" w-[75%] text-center font-khula text-lg font-semibold">
              There is currently no expected shipment
            </span>
          </div>
        )}
      </div>
    )
  );
};

export default Shipment;
