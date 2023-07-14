import LogItem from './LogItem';

const LogList = () => {
  return (
    <div className="rounded-[5px] bg-secondary px-[24px] py-[32px] gap-[16px] flex flex-col">
      <div className="text-[24px] font-khula color-primary font-semibold uppercase leading-none h-[24px]">
        July 3, 2023
      </div>

      <LogItem />
      <div className="w-full bg-primary/50 h-[1px]"></div>
      <LogItem />
      <div className="w-full bg-primary/50 h-[1px]"></div>
      <LogItem />
    </div>
  );
};

export default LogList;
