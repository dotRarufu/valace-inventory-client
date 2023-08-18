import QRCodeStyling from 'qr-code-styling';
import { qrCodeValAceLogo } from '../assets/qrCodeValaceLogo';

export const qrCode = new QRCodeStyling({
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
