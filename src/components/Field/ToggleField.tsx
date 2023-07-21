type Props = {
  label: string;
  stringContent: boolean;
  isUpdate?: boolean;
  values: {
    checkedLabel: string;
    uncheckedLabel: string;
    callback?: (isChecked: boolean) => void;
  };
  handleChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const ToggleField = ({
  label,
  stringContent,
  isUpdate,
  values,
  handleChange,
}: Props) => {
  return (
    <li className="flex flex-col leading-none py-[8px]">
      {!isUpdate ? (
        <div className=" flex justify-between items-center max-h-[53px] py-[8px]">
          <span className=" h-[16px] text-primary/50 text-[24px]">{label}</span>
          :
          <div className="h-[16px] max-w-[445px] w-full text-[24px] text-primary font-semibold ">
            <a
              className={`${
                stringContent ? 'text-success' : 'text-error'
              } text-[24px] font-semibold uppercase h-[16px] leading-none`}
            >
              {stringContent ? values.checkedLabel : values.uncheckedLabel}
            </a>
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
              checked={stringContent}
              onChange={e => handleChange(e.target.checked)}
            />
            <span className="uppercase text-[24px] text-primary font-semibold h-[16px]">
              {stringContent ? values.checkedLabel : values.uncheckedLabel}
            </span>
          </div>
        </div>
      )}
    </li>
  );
};

export default ToggleField;
