import { FiArrowLeft } from 'react-icons/fi';
import { NavLink, useNavigate, useOutlet, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

export type UtilizationRequest = {
  id: number;
  itemId: number;
  utilizerId: number;
  amount: number;
};

export const dummyUtilizationRequests: UtilizationRequest[] = [
  {
    amount: 2,
    id: 0,
    itemId: 0,
    utilizerId: 0,
  },
  {
    amount: 5,
    id: 1,
    itemId: 2,
    utilizerId: 0,
  },
  {
    amount: 10,
    id: 2,
    itemId: 1,
    utilizerId: 1,
  },
];

const UtilizeRequest = () => {
  const { id } = useParams();
  const [utilizationRequest, setUtilizationRequest] =
    useState<UtilizationRequest | null>(null);

  useEffect(() => {
    const res = dummyUtilizationRequests.filter(d => d.id === Number(id));

    if (res.length === 0) return;

    const data = res[0];

    setUtilizationRequest(data);
  }, [id]);

  const navigate = useNavigate();
  const navigateTo = (path: string) => () => navigate(path);

  // h-[100vh-46px-66px-32px]

  return utilizationRequest !== null ? (
    <div className="absolute flex h-[calc(100%-32px)] w-full flex-col gap-4 p-0 px-[16px] font-khula">
      <div className="flex items-center gap-2 ">
        <NavLink to=".." className="btn-square btn-sm btn">
          <FiArrowLeft />
        </NavLink>
        <span className="h-[12px] text-lg font-semibold leading-none">
          Request
          {utilizationRequest?.id}
        </span>
      </div>
      <ul className="flex w-full flex-col gap-2 ">
        <li className="flex flex-col leading-none">
          <div className=" flex max-h-[53px] items-center justify-between py-[4px]">
            <span className=" h-[16px] text-lg text-primary/50">Item Name</span>

            <div className="h-[16px] text-lg font-semibold text-primary ">
              {utilizationRequest?.itemId}
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
                    {utilizationRequest?.itemId}
                  </span>
                </span>
              }
            </div>
          </div>
        </li>
        <li className="flex flex-col leading-none">
          <div className=" flex max-h-[53px] items-center justify-between py-[4px]">
            <span className=" h-[16px] text-lg text-primary/50">
              Requested by:
            </span>

            <div className="h-[16px] text-lg font-semibold text-primary ">
              {utilizationRequest?.utilizerId}
            </div>
          </div>
        </li>
        <li className="flex flex-col leading-none">
          <div className=" flex max-h-[53px] items-center justify-between py-[4px]">
            <span className=" h-[16px] text-lg text-primary/50">Amount:</span>

            <div className="h-[16px] text-lg font-semibold text-primary ">
              {utilizationRequest?.amount}
            </div>
          </div>
        </li>
        <li className="flex flex-col leading-none">
          <div className=" flex max-h-[53px] items-center justify-between py-[4px] ">
            <span className="h-[16px] text-lg leading-none text-primary/50">
              Description:
            </span>

            <div className="line-clamp-1 max-w-[50%] text-lg font-semibold text-primary ">
              {/* {itemData?.description}
               */}
              Hmm. Were having trouble finding that site. We cant connect to the
              server at loremipsum.io. If you entered the right address, you
              can: Try again later Check your network connection Check
            </div>
          </div>
        </li>
      </ul>

      <div className="h-full"></div>
      <div className="flex flex-col leading-none">
        <div className=" flex max-h-[53px] items-center justify-between py-[4px] ">
          <span className="h-[16px] text-lg leading-none text-base-content">
            Amount Given:
          </span>

          <input
            type="number"
            className="input-bordered input input-md w-full max-w-[96px] rounded-[5px] bg-primary/10 pt-[2px] text-primary [box-shadow:0px_0px_0px_0px_rgba(0,16,74,0.05)_inset,_0px_2px_4px_0px_rgba(0,16,74,0.05)_inset,_0px_7px_7px_0px_rgba(0,16,74,0.04)_inset,_0px_15px_9px_0px_rgba(0,_16,_74,_0.03)_inset,_0px_27px_11px_0px_rgba(0,_16,_74,_0.01)_inset,_0px_42px_12px_0px_rgba(0,_16,_74,_0.00)_inset]"
          />
        </div>
      </div>
      <button className="btn-primary btn w-full rounded-[5px]">Done</button>
    </div>
  ) : (
    <div className="flex h-full  flex-col items-center justify-center ">
      <div className="flex max-w-[286px] flex-col justify-center gap-4">
        <span className=" w-full text-center font-khula text-lg font-semibold">
          Request {id} does not exist
        </span>
        <button
          onClick={navigateTo('..')}
          className="btn-primary btn w-full rounded-[5px]"
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default UtilizeRequest;
