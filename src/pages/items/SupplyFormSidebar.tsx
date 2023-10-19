import { useEffect, useRef, useState } from 'react';
import { useDrawer } from '../../hooks/useDrawer';

import toast from 'react-hot-toast';
import { PocketbaseError } from '../../types/PocketbaseError';
import { toastSettings } from '../../data/toastSettings';

import RestockItem from './RestockItem';

import { generateSupplyForm } from './utils/generateSupplyForm';
import { getApprovedRequests } from '../../services/request';
import { createShipment, createShipmentItems } from '../../services/shipments';
import useUser from '../../hooks/useUser';

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
      await createShipment({
        created_by: user!.id,
        month: new Date().getMonth().toLocaleString(),
      });

      await createShipmentItems(restocks, requests);

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

      <div className="flex h-full w-[723px] flex-col gap-[8px] overflow-y-scroll bg-secondary px-[32px] pt-0 font-khula text-secondary-content">
        <div className="flex items-center justify-start pb-[16px]  pt-[32px]">
          <span className="h-[21px] text-[32px] font-semibold leading-none text-primary">
            Generate Supply Form
          </span>
        </div>

        <h2 className="h-[16px] text-base font-semibold leading-none text-primary">
          Restock
        </h2>

        <ul className="flex h-fit flex-col gap-4 overflow-y-scroll">
          {selectedRows.map(row => (
            // <li className="border border-red-500">{row.id}</li>
            <RestockItem key={row.id} row={row} setPrintItems={setPrintItems} />
          ))}
        </ul>

        {/* <div className="h-[2px] w-full bg-base-content" /> */}

        <h2 className="h-[16px] text-base font-semibold leading-none text-primary">
          Include Approved Requested Items
        </h2>

        <ul className="flex h-fit flex-col gap-2 overflow-y-scroll">
          {requestedItems.map(row => (
            <li
              key={row.id}
              className="flex items-center justify-between border border-primary py-2 pr-4"
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
                className="checkbox"
                onClick={() => {
                  setRequestedItems(old =>
                    old.map(o =>
                      o.id === row.id ? { ...o, isIncluded: !o.isIncluded } : o
                    )
                  );
                }}
              />
            </li>
            // <RestockItem key={row.id} row={row} setPrintItems={setPrintItems} />
          ))}
        </ul>

        <div className="form-control border border-red-500">
          <label className="label cursor-pointer">
            <span className="label-text">Create shipment for this request</span>
            <input type="checkbox" className="toggle-primary toggle" />
          </label>
        </div>
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
