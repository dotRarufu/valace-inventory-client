import QRCodeStyling from 'qr-code-styling';
import { useEffect, useRef, useState } from 'react';
import { qrCodeValAceLogo } from '../../assets/qrCodeValaceLogo';
import { useDrawer } from '../../hooks/useDrawer';

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  data: 'https://www.google.com/search?client=firefox-b-d&q=uuid+example',
  margin: 0,
  qrOptions: {
    typeNumber: 0,
    mode: 'Byte',
    errorCorrectionLevel: 'Q',
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 0,
  },
  dotsOptions: {
    type: 'rounded',
    color: '#00104a',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  image: qrCodeValAceLogo,

  cornersSquareOptions: {
    color: '#00104a',
  },
  cornersDotOptions: {
    color: '#00104a',
  },
});

const QrCode = () => {
  const [shouldDownload, setShouldDownload] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeRowId } = useDrawer()!;

  useEffect(() => {
    if (shouldDownload) {
      const downloadQr = async () => {
        await qrCode.download({
          extension: 'png',
        });

        setShouldDownload(false);
      };

      void downloadQr();
    }
  }, [shouldDownload]);

  useEffect(() => {
    if (containerRef.current === null) return;

    qrCode.append(containerRef.current);
  }, []);

  useEffect(() => {
    const address = import.meta.env.VITE_URL || 'isUndefined';
    const route = 'user';
    const query = '?id=';
    console.log('url:', `${address}/${route}${query}${activeRowId}`);
    qrCode.update({
      data: `${address}/${route}${query}${activeRowId}`,
    });
  }, [activeRowId]);

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex justify-between items-center">
        <span className=" h-[16px] text-primary/50 text-[24px] -translate-y-[6px]">
          QR Code:
        </span>

        <label
          htmlFor="QrCodeModal"
          className="btn btn-outline px-[16px] hover:btn-primary text-[20px]  font-semibold"
        >
          <span onClick={() => setShouldDownload(true)} className="h-[13px] ">
            Download
          </span>
        </label>
      </div>

      <div className="bg-primary/5 py-[16px] flex justify-center rounded-[5px] ">
        <div ref={containerRef} className="w-[300px] h-[300px]" />
      </div>
    </div>
  );
};

export default QrCode;
