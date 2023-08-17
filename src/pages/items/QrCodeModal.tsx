import Modal from '../../components/ui/Modal';
import qrCodeSample from '../../assets/qr.png';

const QrCodeModal = () => {
  return (
    <Modal
      id="QrCodeModal"
      content={
        <div className="border border-red-500 bg-secondary shadow-sm">
          <div className="flex flex-col gap-[8px]">
            <div className="flex items-center justify-between">
              <span className=" h-[16px] -translate-y-[6px] text-[24px] text-primary/50">
                QR Code:
              </span>

              <label
                htmlFor="QrCodeModal"
                className="btn-outline btn px-[16px] text-[20px] font-semibold  hover:btn-primary"
              >
                <span className="h-[13px] ">Download</span>
              </label>
            </div>

            <div className="flex justify-center rounded-[5px] bg-primary/5 py-[16px] ">
              <img src={qrCodeSample} className="h-[300px] w-[300px]" />
            </div>
          </div>
        </div>
      }
    ></Modal>
  );
};

export default QrCodeModal;
