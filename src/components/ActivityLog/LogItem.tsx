import adminIcon from '../../assets/admin.svg';

const LogItem = () => {
  return (
    <div className="flex p-[16px] gap-[10px] ">
      <img className=" w-[48px] h-[48px]" src={adminIcon} alt="Admin Icon" />

      <div className="w-full flex flex-col h-full justify-between">
        <div className="text-[24px] font-khula color-primary  leading-none h-[16px]  w-fit">
          <span className="font-semibold">Staff01</span> edited the name of
          table 1
        </div>

        <div className="text-[24px] font-khula color-primary  leading-none h-[16px]">
          <span className="font-semibold">Table 1</span>
          {'->'}
          <span className="font-semibold">Chair 1</span>
        </div>
      </div>

      <div className=" flex justify-end items-center">
        <div className="text-[24px] font-khula color-primary  leading-none h-[16px] ">
          9:00AM
        </div>
      </div>
    </div>
  );
};

export default LogItem;
