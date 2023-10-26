import { useEffect, useRef } from 'react';
import { useDrawer } from '../../hooks/useDrawer';
import { qrCode } from '../../services/qrCodeStyling';
import { getBaseUrl } from '../../utils/getBaseUrl';

const QrCode = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeRowId } = useDrawer()!;

  // Display QR Code
  useEffect(() => {
    if (containerRef.current === null) return;

    qrCode.append(containerRef.current);
  }, []);

  // Set QR Code data
  useEffect(() => {
    const address = getBaseUrl();
    const route = 'user';
    const query = '?id=';
    qrCode.update({
      data: `${address}/${route}${query}${activeRowId}`,
    });
  }, [activeRowId]);

  const downloadQr = async () => {
    await qrCode.download({
      extension: 'png',
    });
  };

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex items-center justify-between">
        <span className=" h-[16px] -translate-y-[6px] text-[24px] text-primary/50">
          QR Code:
        </span>

        <label
          htmlFor="QrCodeModal"
          className="btn-outline btn px-[16px] text-[20px] font-semibold  hover:btn-primary"
        >
          <span onClick={() => void downloadQr()} className="h-[13px] ">
            Download
          </span>
        </label>
      </div>

      <div className="flex justify-center rounded-[5px] bg-primary/5 py-[16px] ">
        <div ref={containerRef} className="h-[300px] w-[300px]" />
      </div>
    </div>
  );
};

export default QrCode;
