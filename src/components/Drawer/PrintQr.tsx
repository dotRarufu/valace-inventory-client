const PrintQr = () => {
  return (
    <div className="drawer-side z-[9999]">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <div className="px-[32px] w-[723px] pt-0 h-full bg-secondary text-secondary-content font-khula flex flex-col gap-[8px] overflow-y-scroll">
        <div className="flex justify-start pt-[32px] pb-[16px]  items-center">
          <span className="font-semibold h-[21px] text-[32px] leading-none text-primary">
            Print QR Code
          </span>
        </div>

        <div>wip</div>

        <div className="h-full"></div>

        <div className="flex justify-end items-center gap-[16px] py-[32px]">
          <button className="btn btn-primary px-[16px] text-[20px]  font-semibold">
            <span className="h-[13px] ">Print</span>
          </button>
          <label
            htmlFor="my-drawer"
            className="btn btn-outline px-[16px] hover:btn-error text-[20px]  font-semibold"
          >
            <span className="h-[13px] ">Close</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PrintQr;
