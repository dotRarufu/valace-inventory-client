type Props = {
  label: string;
  value: string;
  isUpdate?: boolean;
  dropdown: { label: string; callback?: () => void }[];
};

const getBackgroundColor = (value: string) => {
  switch (value) {
    case 'Admin':
      return 'bg-[#4A000D]';

    default:
      return 'bg-primary';
  }
};

const SelectField = ({ label, value, isUpdate, dropdown }: Props) => {
  return (
    <li className="flex flex-col py-[8px] leading-none">
      {!isUpdate ? (
        <div className=" flex max-h-[53px] items-center justify-between py-[8px]">
          <span className=" h-[16px] text-[24px] text-primary/50">
            {label}:
          </span>

          <div className="h-[16px] w-full max-w-[445px] text-[24px] font-semibold text-primary ">
            {
              <span
                // todo: can make this rendered by the user comp
                className={`badge h-fit text-[20px]  ${getBackgroundColor(
                  value
                )} -translate-y-[12.5%] px-[24px] py-[4px] text-secondary`}
              >
                <span className="h-[13px] uppercase leading-none">{value}</span>
              </span>
            }
          </div>
        </div>
      ) : (
        <div className=" flex items-start justify-between ">
          <span className=" h-[16px] py-[16px] text-[24px] text-primary/50">
            {label}:
          </span>

          <select
            className="select-bordered select w-full max-w-[445px] rounded-[5px] bg-primary/10 pt-[2px] text-[24px] text-primary [box-shadow:0px_0px_0px_0px_rgba(0,16,74,0.05)_inset,_0px_2px_4px_0px_rgba(0,16,74,0.05)_inset,_0px_7px_7px_0px_rgba(0,16,74,0.04)_inset,_0px_15px_9px_0px_rgba(0,_16,_74,_0.03)_inset,_0px_27px_11px_0px_rgba(0,_16,_74,_0.01)_inset,_0px_42px_12px_0px_rgba(0,_16,_74,_0.00)_inset]"
            placeholder=""
            value={value}
            onChange={() => {
              // handled by option onClick
            }}
          >
            {dropdown.map(({ label, callback }) => (
              <option value={label} onClick={callback} key={label}>
                {label[0].toUpperCase() + label.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
      )}
    </li>
  );
};

export default SelectField;
