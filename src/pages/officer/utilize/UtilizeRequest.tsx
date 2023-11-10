import { FiArrowLeft } from 'react-icons/fi';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import {
  deleteBorrowed,
  getBorrowedItem,
  recordUtilizee,
  recordUtilizer,
  updateItem,
} from '../../../services/item';
import { toast } from 'react-hot-toast';
import { toastSettings } from '../../../data/toastSettings';
import {
  BorrowResponse,
  ItemResponse,
  UserResponse,
} from '../../../../pocketbase-types';
import useUser from '../../../hooks/useUser';

export type UtilizationRequest = {
  id: number;
  itemId: number;
  utilizerId: number;
  amount: number;
};

const UtilizeRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [utilizationRequest, setUtilizationRequest] = useState<
    | (BorrowResponse & { officeData: UserResponse; itemData: ItemResponse })
    | null
    | undefined
  >(null);
  const [amountGiven, setAmountGiven] = useState(0);
  const { user } = useUser();

  useEffect(() => {
    if (!id) return;

    getBorrowedItem(id)
      .then(d => {
        setUtilizationRequest(d);
      })
      .catch(() => {
        setUtilizationRequest(undefined);
        toast.error('Failed to get borrow item data', toastSettings);
      });
  }, [id]);

  const handleDoneClick = async () => {
    if (!utilizationRequest || !id) return;

    const { item, office, location } = utilizationRequest;

    // Add record to utilizee
    const utilizee = await recordUtilizee({
      amount: amountGiven,
      item,
      location,
      office,
    });

    // Add record to utilizer
    // todo: fix utilizer id
    await recordUtilizer({
      utilizee: utilizee.id,
      item: utilizationRequest.itemData.id,
      utilizer: user!.id,
      amoun_given: amountGiven,
    });

    // Delete borrow record

    await deleteBorrowed(id);

    // Deduct amount given to item table record quantity
    await updateItem(utilizationRequest.itemData.id, {
      quantity: utilizationRequest.itemData.quantity - amountGiven,
    });

    navigate('..');
  };

  if (utilizationRequest === null)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="loading loading-ring aspect-square w-1/2" />
      </div>
    );

  return utilizationRequest !== undefined ? (
    <div className="absolute flex h-[calc(100%-32px)] w-full flex-col gap-4 p-0 px-[16px] font-khula">
      <div className="flex items-center gap-2 ">
        <NavLink to=".." className="btn-square btn-sm btn">
          <FiArrowLeft />
        </NavLink>
        <span className="h-[12px] text-lg font-semibold leading-none">
          Request {utilizationRequest?.id}
        </span>
      </div>
      <ul className="flex w-full flex-col gap-2 ">
        <li className="flex flex-col leading-none">
          <div className=" flex max-h-[53px] items-center justify-between py-[4px]">
            <span className=" h-[16px] text-lg text-primary/50">Item Name</span>

            <div className="h-[16px] text-lg font-semibold text-primary ">
              {utilizationRequest.itemData?.name}
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
                    {utilizationRequest.itemData?.type}
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
              {utilizationRequest?.officeData.name ||
                utilizationRequest?.officeData.username}
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
      </ul>

      <div className="h-full"></div>
      <div className="flex flex-col leading-none">
        <div className=" flex max-h-[53px] items-center justify-between py-[4px] ">
          <span className="h-[16px] text-lg leading-none text-base-content">
            Amount Given:
          </span>

          <input
            value={amountGiven}
            onChange={e => setAmountGiven(Number(e.target.value))}
            type="number"
            className="input-bordered input input-md w-full max-w-[96px] rounded-[5px] bg-primary/10 pt-[2px] text-primary [box-shadow:0px_0px_0px_0px_rgba(0,16,74,0.05)_inset,_0px_2px_4px_0px_rgba(0,16,74,0.05)_inset,_0px_7px_7px_0px_rgba(0,16,74,0.04)_inset,_0px_15px_9px_0px_rgba(0,_16,_74,_0.03)_inset,_0px_27px_11px_0px_rgba(0,_16,_74,_0.01)_inset,_0px_42px_12px_0px_rgba(0,_16,_74,_0.00)_inset]"
          />
        </div>
      </div>
      <button
        onClick={() => void handleDoneClick()}
        className="btn-primary btn w-full rounded-[5px]"
      >
        Done
      </button>
    </div>
  ) : (
    <div className="flex h-full  flex-col items-center justify-center ">
      <div className="flex max-w-[286px] flex-col justify-center gap-4">
        <span className=" w-full text-center font-khula text-lg font-semibold">
          Request {id} does not exist
        </span>
        <button
          onClick={() => navigate('..')}
          className="btn-primary btn w-full rounded-[5px]"
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default UtilizeRequest;
