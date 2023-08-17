import { useEffect, useRef, useState } from 'react';
import { useDrawer } from '../../hooks/useDrawer';
import PrintQrCodeItem from './PrintQrCodeItem';
import { generateCoutout } from '../../utils/generateCutout';
import toast from 'react-hot-toast';

export type PrintItemRequest = {
  id: string;
  amount: number;
};

const PrintQr = () => {
  const { selectedRows } = useDrawer()!;
  const [printItems, setPrintItems] = useState<PrintItemRequest[]>([]);
  const anchorDownloadRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    setPrintItems(selectedRows.map(r => ({ id: r.id, amount: 1 })));
  }, [selectedRows]);

  const [shouldGenerateCutout, setShouldGenerateCutout] = useState(false);
  useEffect(() => {
    if (!shouldGenerateCutout) return;

    const generateCutout = async () => {
      const res = await generateCoutout({
        items: printItems,
      });

      anchorDownloadRef.current!.href = res;
      anchorDownloadRef.current!.download = 'qrcodes.pdf';
      anchorDownloadRef.current!.click();

      setShouldGenerateCutout(false);
    };

    void generateCutout();
  }, [printItems, shouldGenerateCutout]);

  const handlePrintClick = () => {
    console.log('print items:', printItems);
    console.log('selectedrows:', selectedRows);
    setShouldGenerateCutout(true);
  };

  return (
    <div className="drawer-side z-[9999]">
      <a ref={anchorDownloadRef} className="hidden" target="_blank" />
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <div className="px-[32px] w-[723px] pt-0 h-full bg-secondary text-secondary-content font-khula flex flex-col gap-[8px] overflow-y-scroll">
        <div className="flex justify-start pt-[32px] pb-[16px]  items-center">
          <span className="font-semibold h-[21px] text-[32px] leading-none text-primary">
            Print QR Code
          </span>
        </div>

        <ul className="flex flex-col gap-4 flex-1 overflow-y-scroll px-4">
          {selectedRows.map(row => (
            <PrintQrCodeItem
              key={row.id}
              row={row}
              setPrintItems={setPrintItems}
            />
          ))}
        </ul>

        <div className="flex justify-end items-center gap-[16px] py-[32px]">
          <button
            onClick={handlePrintClick}
            className="btn btn-primary px-[16px] text-[20px]  font-semibold"
          >
            <span className="h-[13px] ">Print</span>
          </button>
          <label
            htmlFor="my-drawer"
            className="btn btn-outline px-[16px] hover:btn-error text-[20px]  font-semibold"
          >
            <span className="h-[13px] ">Close</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PrintQr;
