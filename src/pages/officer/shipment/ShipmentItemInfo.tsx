import { FiArrowLeft } from 'react-icons/fi';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createItem, updateItem } from '../../../services/item';
import { toast } from 'react-hot-toast';
import { toastSettings } from '../../../data/toastSettings';
import {
  checkAndMarkShipmentAsComplete,
  deleteShipmentItem,
  getShipmentItem,
  updateShipmentItem,
} from '../../../services/shipments';
import {
  ItemRecord,
  ItemTypeOptions,
  RequestStatusOptions,
  ShipmentItemResponse,
  ShipmentItemTypeOptions,
  UserResponse,
} from '../../../../pocketbase-types';
import generateSerialNumber from '../../items/utils/generateSerialNumber';
import { increaseRowCount } from '../../items/utils/increaseRowCount';
import { qrCode } from '../../../services/qrCodeStyling';
import { getBaseUrl } from '../../../utils/getBaseUrl';
import { getRequest, updateRequestStatus } from '../../../services/request';

const ShipmentItemInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itemData, setItemData] = useState<
    (ShipmentItemResponse & { officeData: UserResponse }) | null
  >(null);
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [supplier, setSupplier] = useState('');

  useEffect(() => {
    if (!id) return;

    getShipmentItem(id)
      .then(data => {
        setItemData(data);
      })
      .catch(err => {
        toast.error('Failed to get shipment item data', toastSettings);
        console.log(err);
      });
  }, [id]);

  const handleConfirmClick = async () => {
    if (!itemData || !id) return;

    if (itemData.type === ShipmentItemTypeOptions.REQUEST) {
      const newStock: ItemRecord = {
        name: itemData.item_name,
        // todo: add field for property number
        serial_number: await generateSerialNumber(),
        total: receivedAmount,
        quantity: receivedAmount,
        type: itemData.tag as unknown as ItemTypeOptions,
        unit: itemData.unit,
        supplier,
      };

      if (
        itemData.type === ShipmentItemTypeOptions.REQUEST &&
        itemData.request
      ) {
        const requestData = await getRequest(itemData.request);
        newStock.remarks = requestData.description;
      }

      console.log('serail number:', newStock.serial_number);
      const createdItem = await createItem(newStock);
      await increaseRowCount('m940ztp5mzi2wlq');
      await deleteShipmentItem(itemData.id);
      const newFormData = new FormData();
      const address = getBaseUrl();
      const route = 'user';
      const query = '?id=';

      qrCode.update({
        data: `${address}/${route}${query}${id}`,
      });
      const file = await qrCode.getRawData();

      if (file === null)
        throw new Error('could not convert qrcoderaw data to blob');

      newFormData.append('qr', file);
      console.log('recieveD:', id, itemData.id, itemData.restock_item_id);
      await updateItem(createdItem.id, newFormData);
      await updateRequestStatus(
        itemData.request,
        RequestStatusOptions.COMPLETED
      );
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
    toast.success('Item received', toastSettings);
    navigate('..');
  };

  if (itemData === null)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="loading loading-ring aspect-square w-1/2" />
      </div>
    );

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
            <span className=" h-[16px] text-lg text-primary/50">Unit:</span>

            <div className="h-[16px] text-lg font-semibold text-primary ">
              {itemData?.unit}
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
              {itemData?.officeData.name || itemData?.officeData.username}
            </div>
          </div>
        </li>
      </ul>

      <div className="h-full"></div>
      <div className="flex flex-col leading-none">
        {/* <div className=" flex max-h-[53px] items-center justify-between py-[4px] ">
          <span className="h-[16px] text-lg leading-none text-base-content">
            Property Number:
          </span>

          <input
            type="string"
            value={propertyNumber}
            onChange={e => setPropertyNumber(e.target.value)}
            className="input-bordered input input-md w-full max-w-[96px] rounded-[5px] bg-primary/10 pt-[2px] text-primary [box-shadow:0px_0px_0px_0px_rgba(0,16,74,0.05)_inset,_0px_2px_4px_0px_rgba(0,16,74,0.05)_inset,_0px_7px_7px_0px_rgba(0,16,74,0.04)_inset,_0px_15px_9px_0px_rgba(0,_16,_74,_0.03)_inset,_0px_27px_11px_0px_rgba(0,_16,_74,_0.01)_inset,_0px_42px_12px_0px_rgba(0,_16,_74,_0.00)_inset]"
          />
        </div> */}
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
        {itemData.type === ShipmentItemTypeOptions.REQUEST && (
          <div className=" flex max-h-[53px] items-center justify-between py-[4px] ">
            <span className="h-[16px] text-lg leading-none text-base-content">
              Supplier:
            </span>

            <input
              type="text"
              value={supplier}
              onChange={e => setSupplier(e.target.value)}
              className="input-bordered input input-md w-full max-w-[96px] rounded-[5px] bg-primary/10 pt-[2px] text-primary [box-shadow:0px_0px_0px_0px_rgba(0,16,74,0.05)_inset,_0px_2px_4px_0px_rgba(0,16,74,0.05)_inset,_0px_7px_7px_0px_rgba(0,16,74,0.04)_inset,_0px_15px_9px_0px_rgba(0,_16,_74,_0.03)_inset,_0px_27px_11px_0px_rgba(0,_16,_74,_0.01)_inset,_0px_42px_12px_0px_rgba(0,_16,_74,_0.00)_inset]"
            />
          </div>
        )}
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
