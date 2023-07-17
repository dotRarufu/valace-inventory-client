import Modal from './Modal';
import qrCodeSample from '../../assets/qr.png';

const QrCodeModal = () => {
  return (
    <Modal
      id="QrCodeModal"
      content={
        <div className="bg-secondary shadow-sm border border-red-500">
          <div className="flex flex-col gap-[8px]">
            <div className="flex justify-between items-center">
              <span className=" h-[16px] text-primary/50 text-[24px] -translate-y-[6px]">
                QR Code:
              </span>

              <label
                htmlFor="QrCodeModal"
                className="btn btn-outline px-[16px] hover:btn-primary text-[20px]  font-semibold"
              >
                <span className="h-[13px] ">Download</span>
              </label>
            </div>

            <div className="bg-primary/5 py-[16px] flex justify-center rounded-[5px] ">
              <img src={qrCodeSample} className="w-[300px] h-[300px]" />
            </div>
          </div>
        </div>
      }
    ></Modal>
  );
};

export default QrCodeModal;
