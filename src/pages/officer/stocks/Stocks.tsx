import { FiArrowRight, FiSearch } from 'react-icons/fi';
import MobileAppWrapper from '../../../components/ui/MobileAppWrapper';
import BottomNavBar from '../BottomNavBar';
import TopAppBar from '../TopAppBar';
import { useState } from 'react';
import { ItemTypeOptions } from '../../../../pocketbase-types';
import SearchBar from '../../../components/ui/SearchBar';
import { useNavigate, useOutlet } from 'react-router-dom';

export type StockItem = {
  name: string;
  tag: ItemTypeOptions;
  id: number;
  description: string;
  remaining: number;
  total: number;
};

export const dummyStockItems: StockItem[] = [
  {
    name: 'Wooden Chair',
    tag: ItemTypeOptions.Office,
    id: 0,
    remaining: 6,
    description: 'Upuan ni Andrei',
    total: 10,
  },
  {
    name: 'Goofy Mouse',
    tag: ItemTypeOptions.IT,
    id: 1,
    remaining: 0,
    description: 'Mouse ni Andrei',
    total: 20,
  },
  {
    name: 'AMD A6 Laptop',
    tag: ItemTypeOptions.IT,
    id: 2,
    remaining: 2,
    description: 'Laptop ko',
    total: 1,
  },
];

const Stocks = () => {
  const [items, setItems] = useState(dummyStockItems);
  const navigate = useNavigate();

  const navigateTo = (path: string) => () => navigate(path);

  const outlet = useOutlet();

  return (
    outlet || (
      <div className="absolute flex h-full w-full flex-col gap-2 px-[16px] font-khula">
        {items.length > 0 ? (
          <div className="flex w-full flex-col gap-4">
            <div className="join">
              <input
                type="text"
                placeholder="Type here"
                className="input-bordered input-primary input join-item w-full max-w-xs"
              />
              <button className=" btn-primary join-item  btn">
                <FiSearch className="h-[20px] w-[20px]  text-primary-content" />
              </button>
            </div>

            <ul className="flex flex-col overflow-clip rounded-[5px]">
              {items.map(item => (
                <li
                  onClick={navigateTo(item.id.toString())}
                  className="flex cursor-pointer items-center justify-between p-2 odd:bg-base-100 even:bg-base-100/40"
                >
                  {item.name}
                  <div className="flex gap-2">
                    <span className="badge badge-success pt-[3px]">
                      {item.tag}
                    </span>

                    <span className="badge badge-info pt-[3px]">
                      {item.remaining}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className=" w-[75%] text-center font-khula text-lg font-semibold">
              There is no stocks
            </span>
          </div>
        )}
      </div>
    )
  );
};

export default Stocks;
