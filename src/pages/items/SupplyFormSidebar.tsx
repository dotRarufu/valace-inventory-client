import { useEffect, useRef, useState } from 'react';
import { useDrawer } from '../../hooks/useDrawer';
import PrintQrCodeItem from './PrintQrCodeItem';
import { generateCoutout } from './utils/generateCutout';
import toast from 'react-hot-toast';
import { PocketbaseError } from '../../types/PocketbaseError';
import { toastSettings } from '../../data/toastSettings';
import { PrintItemRequest } from './PrintQrSidebar';
import RestockItem from './RestockItem';
import { ItemRecord } from '../../../pocketbase-types';

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

const sampleRequests: RequestItem[] = [
  {
    name: 'Mouse',
    description: 'Penble',
    requestedBy: 'Andrei',
    id: 'asdsa',
    isIncluded: false,
  },
  {
    name: 'A6 Laptop',
    description: 'Goofy',
    requestedBy: 'Me',
    id: '13dsa',
    isIncluded: false,
  },
];

const SupplyFormSidebar = () => {
  const { selectedRows } = useDrawer()!;
  const [printItems, setPrintItems] = useState<RestockItemRequest[]>([]);
  const [requestedItems, setRequestedItems] =
    useState<RequestItem[]>(sampleRequests);
  const anchorDownloadRef = useRef<HTMLAnchorElement>(null);

  // Update print items
  useEffect(() => {
    setPrintItems(selectedRows.map(r => ({ id: r.id, amount: 1 })));
  }, [selectedRows]);

  const handlePrintSupplyForm = async () => {
    try {
      const items = printItems.filter(i => i.amount !== 0);
      console.log(requestedItems.map(s => s.isIncluded));
      const a = requestedItems.filter(b => b.isIncluded === true);

      console.log({ restock: items, requests: a });

      await new Promise(() => {
        console.log();
      }).then();
      // const res = await generateCoutout({
      //   items,
      // });

      // anchorDownloadRef.current!.href = res;
      // anchorDownloadRef.current!.download = 'qrcodes.pdf';
      // anchorDownloadRef.current!.click();
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
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
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
