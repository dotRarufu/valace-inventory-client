import QRCodeStyling from 'qr-code-styling';
import { useEffect, useState } from 'react';

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
  image:
    'data:image/png;base64,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',

  cornersSquareOptions: {
    color: '#00104a',
  },
  cornersDotOptions: {
    color: '#00104a',
  },
});

const QrCodeTest = () => {
  const [shouldDownload, setShouldDownload] = useState(false);

  useEffect(() => {
    if (shouldDownload) {
      const downloadQr = async () => {
        console.log('download');

        await qrCode.download({
          extension: 'png',
        });

        setShouldDownload(false);
      };

      downloadQr().catch(err => {
        console.log('err:', err);
      });
    }
  }, [shouldDownload]);

  return (
    <>
      QrCodeTest
      <button
        onClick={() => setShouldDownload(true)}
        className="btn btn-primary"
      >
        Download QR
      </button>
    </>
  );
};

export default QrCodeTest;
