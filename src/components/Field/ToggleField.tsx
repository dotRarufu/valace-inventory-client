import { ReactNode, useState } from 'react';

type Props = {
  label: string;
  initialIsChecked: boolean;
  stringContent?: string;
  elementContent?: ReactNode;
  isUpdate?: boolean;
  values: {
    checkedLabel: string;
    uncheckedLabel: string;
    callback?: (isChecked: boolean) => void;
  };
};

const ToggleField = ({
  label,
  initialIsChecked,
  stringContent,
  elementContent,
  isUpdate,
  values,
}: Props) => {
  const [isChecked, setIsChecked] = useState(initialIsChecked);

  return (
    <li className="flex flex-col leading-none py-[8px]">
      {!isUpdate ? (
        <div className=" flex justify-between items-center max-h-[53px] py-[8px]">
          <span className=" h-[16px] text-primary/50 text-[24px]">{label}</span>
          :
          <div className="h-[16px] max-w-[445px] w-full text-[24px] text-primary font-semibold ">
            {stringContent || elementContent}
          </div>
        </div>
      ) : (
        <div className=" flex justify-between items-start   ">
          <span className=" h-[16px] text-primary/50 text-[24px] py-[12px] ">
            {label}:
          </span>

          <div className="max-w-[445px] w-full  flex items-center gap-[8px] py-[8px] px-[16px] ">
            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={isChecked}
              onChange={e => setIsChecked(e.target.checked)}
            />
            <span className="uppercase text-[24px] text-primary font-semibold h-[16px]">
              {isChecked ? values.checkedLabel : values.uncheckedLabel}
            </span>
          </div>
        </div>
      )}
    </li>
  );
};

export default ToggleField;
