import { useEffect, useState } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { StockItem } from '../../officer/stocks/Stocks';
import { FiSearch } from 'react-icons/fi';
import { getAllRequests } from '../../../services/request';
import { getAllItems } from '../../../services/item';
import { toast } from 'react-hot-toast';
import { toastSettings } from '../../../data/toastSettings';
import { PocketbaseError } from '../../../types/PocketbaseError';

const OfficeUtilize = () => {
  const [items, setItems] = useState<StockItem[] | null>(null);
  const navigate = useNavigate();
  const outlet = useOutlet();
  const navigateTo = (path: string) => () => navigate(path);

  useEffect(() => {
    getAllItems()
      .then(items => {
        const stockItems: StockItem[] = items.items.map(
          (item): StockItem => ({
            description: item.remarks,
            name: item.name,
            id: item.id,
            remaining: item.quantity,
            tag: item.type,
            total: item.total,
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

  return (
    <div className="absolute flex h-full w-full flex-col gap-2 px-[16px] pb-[8px] font-khula">
      {items.length > 0 ? (
        <div className="flex w-full flex-col gap-4">
          <div className="join w-full">
            <input
              type="text"
              placeholder="Type here"
              className="input-bordered input-primary input join-item w-full "
            />
            <button className=" btn-primary join-item  btn">
              <FiSearch className="h-[20px] w-[20px]  text-primary-content" />
            </button>
          </div>

          <ul className="flex flex-col overflow-clip rounded-[5px]">
            {items.map(item => (
              <li
                key={item.id}
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
            There are no stocks
          </span>
        </div>
      )}
    </div>
  );
};

export default OfficeUtilize;
