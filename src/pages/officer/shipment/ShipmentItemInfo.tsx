import { FiArrowLeft } from 'react-icons/fi';
import { NavLink, useParams } from 'react-router-dom';
import { ShipmentItem, dummyItems } from './Shipment';
import { useEffect, useState } from 'react';

const ShipmentItemInfo = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState<ShipmentItem | null>(null);

  useEffect(() => {
    const data = dummyItems.filter(d => d.id === Number(id))[0];

    setItemData(data);
  }, [id]);

  // h-[100vh-46px-66px-32px]

  return (
    <div className="absolute flex h-full w-full flex-col gap-4 p-0 px-[16px] font-khula">
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
              Expected amount:
            </span>

            <div className="h-[16px] text-lg font-semibold text-primary ">
              {itemData?.expectedAmount}
            </div>
          </div>
        </li>
        <li className="flex flex-col leading-none">
          <div className=" flex max-h-[53px] items-center justify-between py-[4px]">
            <span className=" h-[16px] text-lg text-primary/50">Tag:</span>

            <div className="h-[16px] text-lg font-semibold text-primary ">
              {
                <span
                  // todo: can make this rendered by the user comp
                  className="badge h-fit -translate-y-[12.5%] bg-primary px-[24px] py-[4px] text-[16px] text-secondary"
                >
                  <span className="h-[13px] uppercase leading-none">
                    {itemData?.tag}
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
              {itemData?.requestedBy}
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
            Received Amount:
          </span>

          <input
            type="number"
            className="input-bordered input input-md w-full max-w-[96px] rounded-[5px] bg-primary/10 pt-[2px] text-primary [box-shadow:0px_0px_0px_0px_rgba(0,16,74,0.05)_inset,_0px_2px_4px_0px_rgba(0,16,74,0.05)_inset,_0px_7px_7px_0px_rgba(0,16,74,0.04)_inset,_0px_15px_9px_0px_rgba(0,_16,_74,_0.03)_inset,_0px_27px_11px_0px_rgba(0,_16,_74,_0.01)_inset,_0px_42px_12px_0px_rgba(0,_16,_74,_0.00)_inset]"
          />
        </div>
      </div>
      <button className="btn-primary btn w-full rounded-[5px]">Confirm</button>
    </div>
  );
};

export default ShipmentItemInfo;
