import { useState } from 'react';
import Eye from '../icons/Eye';
import NoEye from '../icons/NoEye';

type Props = {
  label: string;
  value: string;
  isUpdate?: boolean;
  handleChange: React.Dispatch<React.SetStateAction<string>>;
};

const PasswordField = ({ label, value, isUpdate, handleChange }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <li className="flex flex-col py-[8px] leading-none">
      {!isUpdate ? (
        <div className=" flex max-h-[53px] items-center justify-between py-[8px]">
          <span className=" h-[16px] text-[24px] text-primary/50">
            {label}:
          </span>

          <div className="h-[16px] w-full max-w-[445px] text-[24px] font-semibold text-primary ">
            {value}
          </div>
        </div>
      ) : (
        <div className=" flex items-start justify-between ">
          <span className=" h-[16px] py-[16px] text-[24px] text-primary/50">
            {label}:
          </span>

          <div className=" relative flex w-full max-w-[445px]">
            <input
              className="input-bordered input  w-full rounded-[5px] bg-primary/10 pt-[6px] text-[24px] text-primary [box-shadow:0px_0px_0px_0px_rgba(0,16,74,0.05)_inset,_0px_2px_4px_0px_rgba(0,16,74,0.05)_inset,_0px_7px_7px_0px_rgba(0,16,74,0.04)_inset,_0px_15px_9px_0px_rgba(0,_16,_74,_0.03)_inset,_0px_27px_11px_0px_rgba(0,_16,_74,_0.01)_inset,_0px_42px_12px_0px_rgba(0,_16,_74,_0.00)_inset]"
              placeholder=""
              type={isVisible ? 'text' : 'password'}
              value={value}
              onChange={e => handleChange(e.target.value)}
            />
            <label
              onClick={() => setIsVisible(!isVisible)}
              className=" absolute right-0 flex h-full  items-center px-[8px] font-semibold"
            >
              <span className="btn-ghost btn-sm btn px-[16px] hover:btn-primary  ">
                {isVisible ? <NoEye /> : <Eye />}
              </span>
            </label>
          </div>
        </div>
      )}
    </li>
  );
};

export default PasswordField;
