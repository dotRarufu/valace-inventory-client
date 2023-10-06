import { useState } from 'react';
import { NavLink, useNavigate, useOutlet } from 'react-router-dom';
import { ItemTypeOptions } from '../../../../pocketbase-types';
import { keyPairs } from './RequestInfo';

export type RequestedItem = {
  id: number;
  name: string;
  status: RequestStatus;
  expectedAmount: number;
  tag: ItemTypeOptions;
  requestedBy: number;
  date: string;
  description: string;
  unit: string;
};

export type RequestStatus = 'pending' | 'approved' | 'requested' | 'completed';

export const REQUEST_STATUS: {
  PENDING: RequestStatus;
  APPROVED: RequestStatus;
  REQUESTED: RequestStatus;
  COMPLETED: RequestStatus;
} = {
  PENDING: 'pending',
  APPROVED: 'approved',
  COMPLETED: 'completed',
  REQUESTED: 'requested',
};

export const dummyRequestedItems: RequestedItem[] = [
  {
    id: 0,
    name: 'Penble Mouse',
    status: REQUEST_STATUS.APPROVED,
    expectedAmount: 5,
    date: '7/12/2023',
    requestedBy: 0,
    tag: ItemTypeOptions.IT,
    description: 'goofy mouse ni andrei',
    unit: 'pcs',
  },
  {
    id: 1,
    name: 'A6 Laptop',
    status: REQUEST_STATUS.PENDING,
    expectedAmount: 5,
    date: '7/12/2023',
    requestedBy: 0,
    tag: ItemTypeOptions.IT,
    description: 'laptop ko',
    unit: 'pcs',
  },
  {
    id: 2,
    name: 'Gaming Chair',
    status: REQUEST_STATUS.COMPLETED,
    expectedAmount: 5,
    date: '7/12/2023',
    requestedBy: 0,
    tag: ItemTypeOptions.Office,
    description: 'upuan sa valace',
    unit: 'pcs',
  },
];

const OfficeRequests = () => {
  const navigate = useNavigate();
  const [activeUser, setActiveUser] = useState('IT Office');
  const [items, setItems] = useState(dummyRequestedItems);

  const navigateTo = (path: string) => () => navigate(path);
  const outlet = useOutlet();

  return (
    outlet || (
      <div className="absolute flex h-full w-full flex-col gap-2 px-[16px] pb-[8px] font-khula">
        {items.length > 0 ? (
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-lg font-bold">{activeUser}'s Requests</div>

              <div className="flex justify-between">
                <div className="dropdown-bottom dropdown">
                  <label
                    tabIndex={0}
                    className=" btn-outline btn-sm btn rounded-[5px]"
                  >
                    Sort
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
                  >
                    <li>
                      <a>Item 1</a>
                    </li>
                    <li>
                      <a>Item 2</a>
                    </li>
                  </ul>
                </div>

                <NavLink
                  to="create"
                  className="btn-outline btn-sm btn rounded-[5px]"
                >
                  Add
                </NavLink>
              </div>
            </div>

            <ul className="flex flex-col overflow-clip rounded-[5px] ">
              {items.map(item => (
                <li
                  key={item.id}
                  className="flex cursor-pointer items-center justify-between p-2 odd:bg-base-100 even:bg-base-100/40"
                  onClick={navigateTo(item.id.toString())}
                >
                  {item.name}
                  <span className="badge badge-success pt-[3px]">
                    {keyPairs[item.status]}
                  </span>
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

export default OfficeRequests;
