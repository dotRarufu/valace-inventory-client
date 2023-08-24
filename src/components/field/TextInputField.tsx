import { useEffect } from 'react';

type Props = {
  label: string;
  value: string;
  isUpdate?: boolean;
  handleChange?: (v: string) => void;
};

const TextInputField = ({ label, value, isUpdate, handleChange }: Props) => {
  useEffect(() => {
    // todo: causes error, fix this
    if (value !== undefined) return;
    // console.log('label:', label);
    // console.log('text input field stringContent:', value);
  }, [label, value]);

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

          <input
            className="input-bordered input w-full max-w-[445px] rounded-[5px] bg-primary/10 pt-[6px] text-[24px] text-primary [box-shadow:0px_0px_0px_0px_rgba(0,16,74,0.05)_inset,_0px_2px_4px_0px_rgba(0,16,74,0.05)_inset,_0px_7px_7px_0px_rgba(0,16,74,0.04)_inset,_0px_15px_9px_0px_rgba(0,_16,_74,_0.03)_inset,_0px_27px_11px_0px_rgba(0,_16,_74,_0.01)_inset,_0px_42px_12px_0px_rgba(0,_16,_74,_0.00)_inset]"
            placeholder=""
            onChange={e => handleChange && handleChange(e.target.value)}
            value={value}
          />
        </div>
      )}
    </li>
  );
};

export default TextInputField;
