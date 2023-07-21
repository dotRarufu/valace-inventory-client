type Props = {
  label: string;
  stringContent: string;
  isUpdate?: boolean;
  dropdown: { label: string; callback?: () => void }[];
  handleChange?: React.Dispatch<React.SetStateAction<any>>;
};

const getBackgroundColor = (value: string) => {
  console.log('get bg color:', value);
  switch (value) {
    case 'Admin':
      return 'bg-[#4A000D]';

    default:
      return 'bg-primary';
  }
};

const SelectField = ({
  label,
  stringContent,

  isUpdate,
  dropdown,
  handleChange,
}: Props) => {
  return (
    <li className="flex flex-col leading-none py-[8px]">
      {!isUpdate ? (
        <div className=" flex justify-between items-center max-h-[53px] py-[8px]">
          <span className=" h-[16px] text-primary/50 text-[24px]">
            {label}:
          </span>

          <div className="h-[16px] max-w-[445px] w-full text-[24px] text-primary font-semibold ">
            {
              <span
                className={`badge h-fit text-[20px]  ${getBackgroundColor(
                  stringContent
                )} text-secondary py-[4px] px-[24px] -translate-y-[12.5%]`}
              >
                <span className="h-[13px] leading-none uppercase">
                  {stringContent}
                </span>
              </span>
            }
          </div>
        </div>
      ) : (
        <div className=" flex justify-between items-start ">
          <span className=" h-[16px] text-primary/50 text-[24px] py-[16px]">
            {label}:
          </span>

          <select
            className="select select-bordered max-w-[445px] w-full bg-primary/10 rounded-[5px] pt-[2px] text-primary text-[24px] [box-shadow:0px_0px_0px_0px_rgba(0,16,74,0.05)_inset,_0px_2px_4px_0px_rgba(0,16,74,0.05)_inset,_0px_7px_7px_0px_rgba(0,16,74,0.04)_inset,_0px_15px_9px_0px_rgba(0,_16,_74,_0.03)_inset,_0px_27px_11px_0px_rgba(0,_16,_74,_0.01)_inset,_0px_42px_12px_0px_rgba(0,_16,_74,_0.00)_inset]"
            placeholder=""
            value={stringContent}
            onChange={e =>
              handleChange &&
              handleChange(e.target.options[e.target.selectedIndex].text)
            }
          >
            {dropdown.map(({ label }) => (
              <option key={label}>{label}</option>
            ))}
          </select>
        </div>
      )}
    </li>
  );
};

export default SelectField;
