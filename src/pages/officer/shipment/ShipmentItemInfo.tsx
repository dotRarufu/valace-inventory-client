import { FiArrowLeft } from 'react-icons/fi';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { ShipmentItem, dummyItems } from './Shipment';
import { useEffect, useState } from 'react';
import { createItem, getItem, updateItem } from '../../../services/item';
import { toast } from 'react-hot-toast';
import { toastSettings } from '../../../data/toastSettings';
import {
  checkAndMarkShipmentAsComplete,
  getShipmentItem,
  updateShipmentItem,
} from '../../../services/shipments';
import {
  ItemRecord,
  ItemTypeOptions,
  ShipmentItemResponse,
  ShipmentItemTypeOptions,
} from '../../../../pocketbase-types';
import generateSerialNumber from '../../items/utils/generateSerialNumber';

const ShipmentItemInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itemData, setItemData] = useState<ShipmentItemResponse | null>(null);
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [propertyNumber, setPropertyNumber] = useState('');

  useEffect(() => {
    if (!id) return;

    getShipmentItem(id)
      .then(data => {
        setItemData(data);
      })
      .catch(err => {
        toast.error('Failed t get shipment item data', toastSettings);
      });
  }, [id]);

  const handleConfirmClick = async () => {
    if (!itemData || !id) return;

    if (itemData.type === ShipmentItemTypeOptions.REQUEST) {
      // todo: ask for location when user is borrowing item
      // todo: update admin client, remove location field
      const newStock: ItemRecord = {
        name: itemData.item_name,
        // todo: add field for property number
        property_number: propertyNumber,
        serial_number: await generateSerialNumber(),
        total: receivedAmount,
        type: itemData.tag as unknown as ItemTypeOptions,
        unit: itemData.unit,
      };
      await createItem(newStock);
    } else {
      const requests = [
        updateItem(itemData.restock_item_id, {
          total: receivedAmount,
          quantity: receivedAmount,
        }),
        updateShipmentItem(id, { received_amount: receivedAmount }),
      ];

      // Fail one, fail all
      await Promise.all(requests);
    }

    await checkAndMarkShipmentAsComplete(itemData.shipment);

    navigate('..');
  };

  return (
    <div className="absolute flex h-[calc(100%-32px)] w-full flex-col gap-4 p-0 px-[16px] font-khula">
      <div className="flex items-center gap-2 ">
        <NavLink to=".." className="btn-square btn-sm btn">
          <FiArrowLeft />
        </NavLink>
        <span className="h-[12px] text-lg font-semibold leading-none">
          {itemData?.item_name}
        </span>
      </div>
      <ul className="flex w-full flex-col gap-2 ">
        <li className="flex flex-col leading-none">
          <div className=" flex max-h-[53px] items-center justify-between py-[4px]">
            <span className=" h-[16px] text-lg text-primary/50">
              Expected amount:
            </span>

            <div className="h-[16px] text-lg font-semibold text-primary ">
              {itemData?.expected_amount}
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
              {itemData?.office}
            </div>
          </div>
        </li>
        <li className="flex flex-col leading-none">
          <div className=" flex max-h-[53px] items-center justify-between py-[4px] ">
            <span className="h-[16px] text-lg leading-none text-primary/50">
              Description:
            </span>

            <div className="line-clamp-1 max-w-[50%] text-lg font-semibold text-primary ">
              {'WIP'}
            </div>
          </div>
        </li>
      </ul>

      <div className="h-full"></div>
      <div className="flex flex-col leading-none">
        <div className=" flex max-h-[53px] items-center justify-between py-[4px] ">
          <span className="h-[16px] text-lg leading-none text-base-content">
            Property Number:
          </span>

          <input
            type="string"
            value={propertyNumber}
            onChange={e => setPropertyNumber(e.target.value)}
            className="input-bordered input input-md w-full max-w-[96px] rounded-[5px] bg-primary/10 pt-[2px] text-primary [box-shadow:0px_0px_0px_0px_rgba(0,16,74,0.05)_inset,_0px_2px_4px_0px_rgba(0,16,74,0.05)_inset,_0px_7px_7px_0px_rgba(0,16,74,0.04)_inset,_0px_15px_9px_0px_rgba(0,_16,_74,_0.03)_inset,_0px_27px_11px_0px_rgba(0,_16,_74,_0.01)_inset,_0px_42px_12px_0px_rgba(0,_16,_74,_0.00)_inset]"
          />
        </div>
        <div className=" flex max-h-[53px] items-center justify-between py-[4px] ">
          <span className="h-[16px] text-lg leading-none text-base-content">
            Received Amount:
          </span>

          <input
            type="number"
            value={receivedAmount}
            onChange={e => setReceivedAmount(Number(e.target.value))}
            className="input-bordered input input-md w-full max-w-[96px] rounded-[5px] bg-primary/10 pt-[2px] text-primary [box-shadow:0px_0px_0px_0px_rgba(0,16,74,0.05)_inset,_0px_2px_4px_0px_rgba(0,16,74,0.05)_inset,_0px_7px_7px_0px_rgba(0,16,74,0.04)_inset,_0px_15px_9px_0px_rgba(0,_16,_74,_0.03)_inset,_0px_27px_11px_0px_rgba(0,_16,_74,_0.01)_inset,_0px_42px_12px_0px_rgba(0,_16,_74,_0.00)_inset]"
          />
        </div>
      </div>
      <button
        className="btn-primary btn w-full rounded-[5px]"
        onClick={() => void handleConfirmClick()}
      >
        Confirm
      </button>
    </div>
  );
};

export default ShipmentItemInfo;
