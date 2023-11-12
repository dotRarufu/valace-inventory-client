import { useNavigate, useOutlet } from 'react-router-dom';
import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';

const Utilize = () => {
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const navigateTo = (path: string) => () => navigate(path);
  const outlet = useOutlet();

  if (outlet) return outlet;

  return (
    <div className="absolute flex h-full w-full flex-col gap-2 px-[16px] pb-[8px] font-khula">
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <span className=" w-full max-w-[286px] text-center font-khula text-lg font-semibold leading-tight">
          Scan a QR code from a requester, or enter their requests ID
        </span>
        <div className="join">
          <input
            value={id}
            onChange={e => setId(e.target.value)}
            type="text"
            placeholder="Type here"
            className="input-bordered input-primary input join-item w-full max-w-xs"
          />
          <button
            onClick={navigateTo(id)}
            className="btn-primary join-item  btn"
          >
            <FiArrowRight className="h-[20px] w-[20px]  text-primary-content" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Utilize;
