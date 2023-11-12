import { useEffect, useRef, useState } from 'react';
import { useDrawer } from '../../hooks/useDrawer';

import toast from 'react-hot-toast';
import { PocketbaseError } from '../../types/PocketbaseError';
import { toastSettings } from '../../data/toastSettings';

import RestockItem from './RestockItem';

import { generateSupplyForm } from './utils/generateSupplyForm';
import getCurrentMonthYear from './utils/getCurrentMonthYear';
import {
  getApprovedRequests,
  updateRequestStatus,
} from '../../services/request';
import { createShipment, createShipmentItems } from '../../services/shipments';
import useUser from '../../hooks/useUser';
import { RequestStatusOptions } from '../../../pocketbase-types';

export type RestockItemRequest = {
  id: string;
  amount: number;
};

export type RequestItem = {
  id: string;
  name: string;
  description: string;
  requestedBy: string;
  isIncluded: boolean;
  // ...
};

export type GenerateSupplyFormRequest = {
  restock: RestockItemRequest[];
  requests: RequestItem[];
};

const SupplyFormSidebar = () => {
  const { user } = useUser()!;
  const { selectedRows, drawerRef } = useDrawer()!;
  const [printItems, setPrintItems] = useState<RestockItemRequest[]>([]);
  const [requestedItems, setRequestedItems] = useState<RequestItem[]>([]);
  const anchorDownloadRef = useRef<HTMLAnchorElement>(null);

  // Update print items
  useEffect(() => {
    setPrintItems(selectedRows.map(r => ({ id: r.id, amount: 1 })));
  }, [selectedRows]);

  // Update requested items
  useEffect(() => {
    getApprovedRequests()
      .then(requests => {
        const data = requests.items;

        const items: RequestItem[] = data.map(
          ({ id, description, item_name, office }) => ({
            description,
            id,
            isIncluded: false,
            name: item_name,
            requestedBy: office,
          })
        );

        setRequestedItems(items);
      })
      .catch(err => {
        console.log('Failed to get approved requests:', err);
      });
  }, [selectedRows]);

  const handlePrintSupplyForm = async () => {
    try {
      const restocks = printItems.filter(i => i.amount !== 0);

      const requests = requestedItems.filter(b => b.isIncluded === true);

      const res = await generateSupplyForm({
        restock: restocks,
        requests: requests,
      });
      const shipment = await createShipment({
        created_by: user!.id,
        month: getCurrentMonthYear(),
      });

      await createShipmentItems(restocks, requests, shipment.id);
      // todo: update request item status
      // await Promise.all(
      //   requestedItems.map(async i => await removeRequest(i.id))
      // );
      await Promise.all(
        requestedItems.map(
          async i =>
            await updateRequestStatus(i.id, RequestStatusOptions.REQUESTED)
        )
      );
      anchorDownloadRef.current!.href = res;
      anchorDownloadRef.current!.download = 'supply-form.xlsx';
      anchorDownloadRef.current!.click();
      drawerRef!.current!.click();
      toast.success('Form generated', toastSettings);
    } catch (err) {
      const error = err as PocketbaseError;
      const errorFields = Object.keys(error.data.data);
      const field =
        errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
      const message = `${field} - ${error.data.data[errorFields[0]].message}`;

      toast.error(message, toastSettings);
    }
  };

  return (
    <div className="drawer-side z-[9999]">
      <a ref={anchorDownloadRef} className="hidden" target="_blank" />
      <label htmlFor="my-drawer" className="drawer-overlay" />

      <div className="flex h-screen w-[723px] flex-col gap-[8px] overflow-clip bg-secondary px-[32px] pt-0 font-khula text-secondary-content">
        <div className="flex items-center justify-start pb-[16px]  pt-[32px]">
          <span className="h-[21px] text-[32px] font-semibold leading-none text-primary">
            Generate Supply Form
          </span>
        </div>

        <div className="grow-1 collapse-arrow collapse relative max-h-[50%] min-h-[60px] shrink-0 overflow-y-scroll rounded-[5px] text-[24px]  font-semibold [scrollbar-width:none]">
          <input type="checkbox" className="peer sticky top-0" />

          <div className="collapse-title sticky top-0 flex h-[16px] w-full items-center bg-primary  text-primary-content peer-checked:bg-base-100 peer-checked:text-base-content">
            <span className="pt-1 font-khula text-[24px] font-semibold leading-5">
              Restock
            </span>
          </div>

          <div className="collapse-content rounded-b-[5px] border border-neutral-content bg-transparent pt-4">
            <ul className="flex h-fit flex-col gap-4 ">
              {selectedRows.map(row => (
                // <li className="border border-neutral-content">{row.id}</li>
                <RestockItem
                  key={row.id}
                  row={row}
                  setPrintItems={setPrintItems}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className="collapse-arrow grow-1 collapse relative max-h-[50%] min-h-[60px] shrink-0 overflow-y-scroll rounded-[5px] text-[24px]  font-semibold [scrollbar-width:none]">
          <input type="checkbox" className="peer sticky top-0" />

          <div className="collapse-title sticky top-0 flex h-[16px] w-full items-center bg-primary  text-primary-content peer-checked:bg-base-100 peer-checked:text-base-content">
            <span className="pt-1 font-khula text-[24px] font-semibold leading-5">
              Include Approved Requested Items
            </span>
          </div>

          <div className="collapse-content rounded-b-[5px] border border-neutral-content bg-transparent pt-4">
            <ul className="flex h-fit flex-col gap-2 overflow-y-scroll">
              {requestedItems.map(row => (
                <li
                  key={row.id}
                  className="flex items-center justify-between py-2 pr-4"
                >
                  <span className="h-[16px] font-khula text-base font-semibold leading-none text-primary">
                    {row.name}
                  </span>
                  <span
                    // todo: can make this rendered by the user comp
                    className={`badge h-fit -translate-y-[12.5%]  bg-primary px-[24px] py-[4px] text-[20px] text-secondary`}
                  >
                    <span className="h-[13px] uppercase leading-none">
                      {row.requestedBy}
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    className="checkbox-primary checkbox"
                    onClick={() => {
                      setRequestedItems(old =>
                        old.map(o =>
                          o.id === row.id
                            ? { ...o, isIncluded: !o.isIncluded }
                            : o
                        )
                      );
                    }}
                  />
                </li>
                // <RestockItem key={row.id} row={row} setPrintItems={setPrintItems} />
              ))}
            </ul>
          </div>
        </div>
        <div className="grow-1 shrink-1 h-full"></div>

        <div className="flex items-center justify-end gap-[16px] py-[32px]">
          <button
            onClick={() => void handlePrintSupplyForm()}
            className="btn-primary btn px-[16px] text-[20px]  font-semibold"
          >
            <span className="h-[13px] ">Print</span>
          </button>
          <label
            htmlFor="my-drawer"
            className="btn-outline btn px-[16px] text-[20px] font-semibold  hover:btn-error"
          >
            <span className="h-[13px] ">Close</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SupplyFormSidebar;
