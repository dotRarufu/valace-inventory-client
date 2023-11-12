import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useOutlet } from 'react-router-dom';
import {
  RequestStatusOptions,
  RequestTagOptions,
} from '../../../../pocketbase-types';
import { getAllRequests } from '../../../services/request';
import { PocketbaseError } from '../../../types/PocketbaseError';
import { toast } from 'react-hot-toast';
import { toastSettings } from '../../../data/toastSettings';
import {
  SortOrder,
  sortArrayByProperty,
} from '../../../utils/sortArrayByProperty';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { toTitleCase } from '../../../utils/toTitleCase';

export type RequestedItem = {
  id: string;
  name: string;
  status: RequestStatusOptions;
  expectedAmount: number;
  tag: RequestTagOptions;
  requestedBy: string;
  date: string;
  description: string;
  unit: string;
};

export type RequestStatus = 'pending' | 'approved' | 'requested' | 'completed';

// eslint-disable-next-line react-refresh/only-export-components
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

const OfficeRequests = () => {
  const navigate = useNavigate();
  const [activeUser] = useState('IT Office');
  const [items, setItems] = useState<RequestedItem[] | null>(null);
  const [sort, setSort] = useState<SortOrder>('asc');

  const navigateTo = (path: string) => () => navigate(path);
  const outlet = useOutlet();

  useEffect(() => {
    getAllRequests()
      .then(items => {
        const stockItems: RequestedItem[] = items.map(
          (item): RequestedItem => ({
            date: item.created,
            description: item.description,
            expectedAmount: item.amount,
            id: item.id,
            name: item.item_name,
            requestedBy: item.office,
            status: item.status,
            tag: item.tag,
            unit: item.unit,
          })
        );
        setItems(stockItems);
      })
      .catch(err => {
        const error = err as PocketbaseError;
        const errorFields = Object.keys(error.data.data);
        const field =
          errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
        const message = `${field} - ${error.data.data[errorFields[0]].message}`;

        toast.error(message, toastSettings);
      });
  }, []);

  if (outlet) return outlet;

  if (items === null)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="loading loading-ring aspect-square w-1/2" />
      </div>
    );

  const sortItems = () => {
    const order = sort === 'asc' ? 'desc' : 'asc';
    const sorted = sortArrayByProperty(items, 'name', order);

    setSort(order);
    setItems(sorted);
  };

  const getSortIcon = () => {
    if (sort === 'asc') return <FiArrowDown />;
    else return <FiArrowUp />;
  };

  return (
    <div className="absolute flex h-full w-full flex-col gap-2 px-[16px] pb-[8px] font-khula">
      {items.length > 0 ? (
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="text-lg font-bold">{activeUser}'s Requests</div>

            <div className="flex justify-between">
              <div className="dropdown-bottom dropdown">
                <button
                  onClick={() => sortItems()}
                  className=" btn-outline btn-sm btn flex items-center justify-center  rounded-[5px]"
                >
                  <span className="pt-1">Sort</span> {getSortIcon()}
                </button>
              </div>

              <NavLink
                to="create"
                className="btn-outline btn-sm btn rounded-[5px]"
              >
                Add
              </NavLink>
            </div>
          </div>

          <ul className="flex flex-col overflow-clip rounded-[5px]">
            {items.map(item => (
              <li
                key={item.id}
                className="flex cursor-pointer items-center justify-between p-2 odd:bg-base-100 even:bg-base-100/40"
                onClick={navigateTo(item.id.toString())}
              >
                {item.name}
                <div className="flex gap-2">
                  <span className="badge badge-success pt-[3px]">
                    {item.expectedAmount}
                  </span>
                  <span className="badge badge-success pt-[3px]">
                    {toTitleCase(item.status) || ''}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
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

            <div className="flex h-full items-center justify-center">
              <span className=" w-[75%] text-center font-khula text-lg font-semibold">
                You have no requests
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficeRequests;
