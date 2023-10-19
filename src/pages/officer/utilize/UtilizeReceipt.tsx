import { useEffect, useRef } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { qrCode } from '../../../services/qrCodeStyling';
const UtilizeReceipt = () => {
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);

  // Display QR Code
  useEffect(() => {
    if (containerRef.current === null) return;

    qrCode.append(containerRef.current);
  }, []);

  // Set QR Code data
  useEffect(() => {
    qrCode.update({
      data: id,
    });
  }, [id]);

  return (
    <div className="absolute flex h-full w-full flex-col gap-2 px-[16px] pb-[8px] font-khula">
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div ref={containerRef} className="aspect-square  rounded-[5px]" />
        <span className=" w-full max-w-[286px] break-all text-center font-khula text-lg font-semibold leading-tight">
          {id}
        </span>
        <span className=" w-full max-w-[286px] text-center font-khula text-lg font-semibold leading-tight">
          To claim the item, show this to a stock officer. Blablabla
        </span>
        {/* <div className="join">
          <input
            type="text"
            placeholder="Type here"
            className="input-bordered input-primary input join-item w-full max-w-xs"
          />
          <button className="btn-primary join-item  btn">
            <FiArrowRight className="h-[20px] w-[20px]  text-primary-content" />
          </button>
        </div> */}
      </div>
      <div className="h-full" />
      <NavLink to="/office/utilize" className="btn-primary join-item  btn">
        OK
      </NavLink>
    </div>
  );
};

export default UtilizeReceipt;
