import { FiArrowRight } from 'react-icons/fi';
import qrSample from '../../../assets/qr.png';
import { NavLink } from 'react-router-dom';
const UtilizeReceipt = () => {
  return (
    <div className="absolute flex h-full w-full flex-col gap-2 px-[16px] pb-[8px] font-khula">
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <img className="aspect-square rounded-[5px]" src={qrSample} />
        <span className=" w-full max-w-[286px] break-all text-center font-khula text-lg font-semibold leading-tight">
          550e8400-e29b-41d4-a716-446655440000
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
