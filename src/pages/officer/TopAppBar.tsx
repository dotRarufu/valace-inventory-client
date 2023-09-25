import valAceLogo from '../../assets/valace-logo.png';

const TopAppBar = () => {
  return (
    <div className="flex w-full  basis-[51px] items-center justify-between px-[16px] py-[8px] text-primary">
      <span className="flex items-center gap-[8px]">
        <span className="h-[16px] font-khula text-[24px] font-semibold leading-none">
          Borrowing System?
        </span>
      </span>
      <img className="w-[56px]" src={valAceLogo} alt="" />
    </div>
  );
};

export default TopAppBar;
