import { FiArrowRight, FiSearch } from 'react-icons/fi';
import MobileAppWrapper from '../../../components/ui/MobileAppWrapper';
import BottomNavBar from '../BottomNavBar';
import TopAppBar from '../TopAppBar';
import { useEffect, useState } from 'react';
import {
  ItemResponse,
  ItemTypeOptions,
  RequestTagOptions,
} from '../../../../pocketbase-types';
import SearchBar from '../../../components/ui/SearchBar';
import { useNavigate, useOutlet } from 'react-router-dom';
import { getAllItems } from '../../../services/item';
import { toast } from 'react-hot-toast';
import { toastSettings } from '../../../data/toastSettings';
import { useFuzzy } from 'react-use-fuzzy';

export type StockItem = {
  name: string;
  tag: ItemTypeOptions;
  id: string;
  description: string;
  remaining: number;
  total: number;
};

const Stocks = () => {
  const [items, setItems] = useState<ItemResponse[] | null>(null);
  const navigate = useNavigate();
  const outlet = useOutlet();
  const navigateTo = (path: string) => () => navigate(path);

  const { result, keyword, search } = useFuzzy<ItemResponse>(items || [], {
    keys: ['name'],
  });

  useEffect(() => {
    getAllItems()
      .then(d => {
        setItems(d.items);
      })
      .catch(() => {
        toast.error('Failed to get item data', toastSettings);
      });
  }, []);

  if (outlet) return outlet;

  if (items === null)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="loading loading-ring aspect-square w-1/2" />
      </div>
    );

  return (
    <div className="absolute flex h-full w-full flex-col gap-2 px-[16px] pb-[8px] font-khula">
      {items.length > 0 ? (
        <div className="flex w-full flex-col gap-4">
          <div className="join">
            <input
              onChange={e => search(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input-bordered input-primary input join-item w-full"
            />
            <button className=" btn-primary join-item  btn">
              <FiSearch className="h-[20px] w-[20px]  text-primary-content" />
            </button>
          </div>

          <ul className="flex flex-col overflow-clip rounded-[5px]">
            {(keyword ? result : items).map(item => (
              <li
                key={item.id}
                onClick={navigateTo(item.id.toString())}
                className="flex cursor-pointer items-center justify-between p-2 odd:bg-base-100 even:bg-base-100/40"
              >
                {item.name}
                <div className="flex gap-2">
                  <span className="badge badge-success pt-[3px]">
                    {item.type}
                  </span>

                  <span className="badge badge-info pt-[3px]">
                    {item.quantity}
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
  );
};

export default Stocks;
