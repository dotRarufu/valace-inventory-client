import { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { NavLink, useParams } from 'react-router-dom';
import { RequestStatus, RequestedItem, dummyRequestedItems } from './Requests';

export const keyPairs: { [REQUEST_STATUS: string]: string } = {
  pending: 'Pending',
  approved: 'Approved',
  requested: 'Requested',
  completed: 'Completed',
};

export const STAGE_NAMES = Object.values(keyPairs);

const RequestInfo = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState<
    (RequestedItem & { statusIndex: number }) | null
  >(null);

  useEffect(() => {
    const data = dummyRequestedItems.filter(d => d.id === Number(id))[0];

    const a = STAGE_NAMES.findIndex(v => v === keyPairs[data.status]);
    const newValue = { ...data, statusIndex: a };

    setItemData(newValue);

    // only run once
  }, []);

  if (itemData === null) return <div>loader here | empty item data</div>;

  return (
    <div className="absolute flex h-[calc(100%-32px)] w-full flex-col gap-4 p-0 px-[16px] font-khula">
      <div className="flex items-center gap-2 ">
        <NavLink to=".." className="btn-square btn-sm btn">
          <FiArrowLeft />
        </NavLink>
        <span className="h-[12px] text-lg font-semibold leading-none">
          {itemData.name}
        </span>
      </div>
      <ul className="steps">
        {STAGE_NAMES.map((name, index) => (
          <li
            key={name}
            className={`step ${
              index <= itemData.statusIndex ? 'step-primary' : ''
            }`}
          >
            {name}
          </li>
        ))}
      </ul>

      <ul className="flex w-full flex-col gap-2 ">
        <li className="flex flex-col leading-none">
          <div className=" flex max-h-[53px] items-center justify-between py-[4px]">
            <span className=" h-[16px] text-lg text-primary/50">
              Expected amount:
            </span>

            <div className="h-[16px] text-lg font-semibold text-primary ">
              {itemData.expectedAmount}
            </div>
          </div>
        </li>
        <li className="flex flex-col leading-none">
          <div className=" flex max-h-[53px] items-center justify-between py-[4px]">
            <span className=" h-[16px] text-lg text-primary/50">
              Unit:
            </span>

            <div className="h-[16px] text-lg font-semibold text-primary ">
              {itemData.unit}
            </div>
          </div>
        </li>
        <li className="flex flex-col leading-none">
          <div className=" flex max-h-[53px] items-center justify-between py-[4px]">
            <span className=" h-[16px] text-lg text-primary/50">
              Expected amount:
            </span>

            <div className="h-[16px] text-lg font-semibold text-primary ">
              {itemData.expectedAmount}
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
                    {itemData.tag}
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
              {itemData.requestedBy}
            </div>
          </div>
        </li>
        <li className="flex flex-col leading-none">
          <div className=" flex max-h-[53px] items-center justify-between py-[4px] ">
            <span className="h-[16px] text-lg leading-none text-primary/50">
              Description:
            </span>

            <div className="line-clamp-1 max-w-[50%] text-lg font-semibold text-primary ">
              {itemData.description}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default RequestInfo;
