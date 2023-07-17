import { ReactNode } from 'react';

type Props = {
  label: string;
  stringContent?: string;
  elementContent?: ReactNode;
  isUpdate?: boolean;
};

const TextInputField = ({
  label,
  stringContent,
  elementContent,
  isUpdate,
}: Props) => {
  return (
    <li className="flex flex-col leading-none py-[8px]">
      {!isUpdate ? (
        <div className=" flex justify-between items-center max-h-[53px] py-[8px]">
          <span className=" h-[16px] text-primary/50 text-[24px]">
            {label}:
          </span>

          <div className="h-[16px] max-w-[445px] w-full text-[24px] text-primary font-semibold ">
            {stringContent || elementContent}
          </div>
        </div>
      ) : (
        <div className=" flex justify-between items-start ">
          <span className=" h-[16px] text-primary/50 text-[24px] py-[16px]">
            {label}:
          </span>

          <input
            className="input input-bordered max-w-[445px] w-full bg-primary/10 rounded-[5px] pt-[6px] text-primary text-[24px] [box-shadow:0px_0px_0px_0px_rgba(0,16,74,0.05)_inset,_0px_2px_4px_0px_rgba(0,16,74,0.05)_inset,_0px_7px_7px_0px_rgba(0,16,74,0.04)_inset,_0px_15px_9px_0px_rgba(0,_16,_74,_0.03)_inset,_0px_27px_11px_0px_rgba(0,_16,_74,_0.01)_inset,_0px_42px_12px_0px_rgba(0,_16,_74,_0.00)_inset]"
            placeholder="Bio"
          />
        </div>
      )}
    </li>
  );
};

export default TextInputField;
