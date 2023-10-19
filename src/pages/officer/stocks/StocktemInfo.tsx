import { FiArrowLeft } from 'react-icons/fi';
import { NavLink, useNavigate, useOutlet, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { StockItem } from './Stocks';
import { dummyStockItems } from '../../../data/dummyStockItems';
import { dummyHistoryItems } from '../../../data/dummyHistoryItems';
import { getItem } from '../../../services/item';
import { toast } from 'react-hot-toast';
import { toastSettings } from '../../../data/toastSettings';
import { ItemResponse } from '../../../../pocketbase-types';

export type HistoryItem = {
  utilizer: string;
  id: number;
  date: string;
  amount: number;
  description: string;
};

const StockItemInfo = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState<ItemResponse | null>(null);
  const [historyItems, setHistoryItems] =
    useState<HistoryItem[]>(dummyHistoryItems);

  useEffect(() => {
    if (!id) return;

    getItem(id)
      .then(d => {
        setItemData(d);
      })
      .catch(() => {
        toast.error('Failed to get item data', toastSettings);
      });
  }, [id]);

  // h-[100vh-46px-66px-32px]

  const navigate = useNavigate();

  const navigateTo = (path: string) => () => navigate(path);

  const outlet = useOutlet();

  return (
    outlet || (
      <div className="absolute flex h-[calc(100%-32px)] w-full flex-col gap-4 p-0 px-[16px] font-khula">
        <div className="flex items-center gap-2 ">
          <NavLink to=".." className="btn-square btn-sm btn">
            <FiArrowLeft />
          </NavLink>
          <span className="h-[12px] text-lg font-semibold leading-none">
            {itemData?.name}
          </span>
        </div>
        <ul className="flex w-full flex-col gap-2 ">
          <li className="flex flex-col leading-none">
            <div className=" flex max-h-[53px] items-center justify-between py-[4px]">
              <span className=" h-[16px] text-lg text-primary/50">
                Total amount:
              </span>

              <div className="h-[16px] text-lg font-semibold text-primary ">
                {itemData?.total}
              </div>
            </div>
          </li>
          <li className="flex flex-col leading-none">
            <div className=" flex max-h-[53px] items-center justify-between py-[4px]">
              <span className=" h-[16px] text-lg text-primary/50">Tag:</span>

              <div className="h-[16px] text-lg font-semibold text-primary ">
                {
                  <span className="badge h-fit -translate-y-[12.5%] bg-primary px-[24px] py-[4px] text-[16px] text-secondary">
                    <span className="h-[13px] uppercase leading-none">
                      {itemData?.type}
                    </span>
                  </span>
                }
              </div>
            </div>
          </li>
          <li className="flex flex-col leading-none">
            <div className=" flex max-h-[53px] items-center justify-between py-[4px]">
              <span className=" h-[16px] text-lg text-primary/50">
                Remaining:
              </span>

              <div className="h-[16px] text-lg font-semibold text-primary ">
                {itemData?.quantity}
              </div>
            </div>
          </li>
          <li className="flex flex-col leading-none">
            <div className=" flex max-h-[53px] items-center justify-between py-[4px] ">
              <span className="h-[16px] text-lg leading-none text-primary/50">
                Description:
              </span>

              <div className="line-clamp-1 max-w-[50%] text-lg font-semibold text-primary ">
                {itemData?.remarks}
              </div>
            </div>
          </li>
        </ul>

        <h2 className="h-[12px] text-lg font-semibold leading-none">
          Utilizers History
        </h2>
        <ul className="flex flex-col overflow-clip rounded-[5px]">
          {historyItems.map(history => (
            <li
              onClick={navigateTo(`history/${history.id.toString()}`)}
              className="flex cursor-pointer items-center justify-between p-2 odd:bg-base-100 even:bg-base-100/40"
            >
              {history.utilizer}
              <div className="flex gap-2">
                <span className="badge badge-success pt-[3px]">
                  {history.date}
                </span>
              </div>
            </li>
          ))}
        </ul>
        {/* <div className="h-full"></div>
      <div className="flex flex-col leading-none">
        <div className=" flex max-h-[53px] items-center justify-between py-[4px] ">
          <span className="h-[16px] text-lg leading-none text-base-content">
            Received Amount:
          </span>

          <input
            type="number"
            className="input-bordered input input-md w-full max-w-[96px] rounded-[5px] bg-primary/10 pt-[2px] text-primary [box-shadow:0px_0px_0px_0px_rgba(0,16,74,0.05)_inset,_0px_2px_4px_0px_rgba(0,16,74,0.05)_inset,_0px_7px_7px_0px_rgba(0,16,74,0.04)_inset,_0px_15px_9px_0px_rgba(0,_16,_74,_0.03)_inset,_0px_27px_11px_0px_rgba(0,_16,_74,_0.01)_inset,_0px_42px_12px_0px_rgba(0,_16,_74,_0.00)_inset]"
          />
        </div>
      </div>
      <button className="btn-primary btn w-full rounded-[5px]">Confirm</button> */}
      </div>
    )
  );
};

export default StockItemInfo;
