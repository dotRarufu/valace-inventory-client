import { useEffect, useRef, useState } from 'react';
import { useDrawer } from '../../hooks/useDrawer';
import PrintQrCodeItem from './PrintQrCodeItem';
import { generateCoutout } from './utils/generateCutout';
import toast from 'react-hot-toast';

export type PrintItemRequest = {
  id: string;
  amount: number;
};

const PrintQrSidebar = () => {
  const { selectedRows } = useDrawer()!;
  const [printItems, setPrintItems] = useState<PrintItemRequest[]>([]);
  const anchorDownloadRef = useRef<HTMLAnchorElement>(null);

  // Update print items
  useEffect(() => {
    setPrintItems(selectedRows.map(r => ({ id: r.id, amount: 1 })));
  }, [selectedRows]);

  const handleGenerateCutout = async () => {
    try {
      const items = printItems.filter(i => i.amount !== 0);

      const res = await generateCoutout({
        items,
      });

      anchorDownloadRef.current!.href = res;
      anchorDownloadRef.current!.download = 'qrcodes.pdf';
      anchorDownloadRef.current!.click();
    } catch (err) {
      toast.error('Failed to prepare QR Code cutout');
    }
  };

  return (
    <div className="drawer-side z-[9999]">
      <a ref={anchorDownloadRef} className="hidden" target="_blank" />
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <div className="flex h-full w-[723px] flex-col gap-[8px] overflow-y-scroll bg-secondary px-[32px] pt-0 font-khula text-secondary-content">
        <div className="flex items-center justify-start pb-[16px]  pt-[32px]">
          <span className="h-[21px] text-[32px] font-semibold leading-none text-primary">
            Print QR Code
          </span>
        </div>

        <ul className="flex flex-1 flex-col gap-4 overflow-y-scroll px-4">
          {selectedRows.map(row => (
            <PrintQrCodeItem
              key={row.id}
              row={row}
              setPrintItems={setPrintItems}
            />
          ))}
        </ul>

        <div className="flex items-center justify-end gap-[16px] py-[32px]">
          <button
            onClick={() => void handleGenerateCutout()}
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

export default PrintQrSidebar;
