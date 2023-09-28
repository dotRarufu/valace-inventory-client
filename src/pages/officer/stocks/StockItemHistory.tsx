import { FiArrowLeft } from 'react-icons/fi';
import { NavLink, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { HistoryItem, dummyHistoryItems } from './StocktemInfo';

const StockItemHistory = () => {
  const { id } = useParams();
  const [historyItem, setHistoryItem] = useState<HistoryItem | null>(null);

  useEffect(() => {
    const data = dummyHistoryItems.filter(d => d.id === Number(id))[0];

    setHistoryItem(data);
  }, [id]);

  // h-[100vh-46px-66px-32px]

  return (
    <div className="absolute flex h-[calc(100%-32px)] w-full flex-col gap-4 p-0 px-[16px] font-khula">
      <div className="flex items-center gap-2 ">
        <NavLink to="../.." className="btn-square btn-sm btn">
          <FiArrowLeft />
        </NavLink>
        <span className="h-[12px] text-lg font-semibold leading-none">
          {historyItem?.utilizer}
        </span>
      </div>
      <ul className="flex w-full flex-col gap-2 ">
        <li className="flex flex-col leading-none">
          <div className=" flex max-h-[53px] items-center justify-between py-[4px]">
            <span className=" h-[16px] text-lg text-primary/50">Amount:</span>

            <div className="h-[16px] text-lg font-semibold text-primary ">
              {historyItem?.amount}
            </div>
          </div>
        </li>

        <li className="flex flex-col leading-none">
          <div className=" flex max-h-[53px] items-center justify-between py-[4px]">
            <span className=" h-[16px] text-lg text-primary/50">
              Utilized by:
            </span>

            <div className="h-[16px] text-lg font-semibold text-primary ">
              {historyItem?.utilizer}
            </div>
          </div>
        </li>
        <li className="flex flex-col leading-none">
          <div className=" flex max-h-[53px] items-center justify-between py-[4px] ">
            <span className="h-[16px] text-lg leading-none text-primary/50">
              Description:
            </span>

            <div className="line-clamp-1 max-w-[50%] text-lg font-semibold text-primary ">
              {historyItem?.description}
            </div>
          </div>
        </li>
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
  );
};

export default StockItemHistory;
