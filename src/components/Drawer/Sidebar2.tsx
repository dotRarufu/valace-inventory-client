const Sidebar2 = () => {
  return (
    <div className="drawer-side ">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <div className="p-[32px] w-[723px] h-full bg-secondary text-secondary-content font-khula flex flex-col gap-[8px]">
        <div className="flex justify-between pt-[32px] pb-[16px] border border-red-500 items-center">
          <span className="font-semibold h-[21px] text-[32px] leading-none">
            Item Details
          </span>
          <div className="flex gap-[8px] ">
            <button className="btn btn-primary ">add</button>
            <button className="btn btn-success ">qr</button>
            <button className="btn btn-error ">delete</button>
          </div>
        </div>

        <div className="border border-red-500 flex flex-col gap-[8px]">
          <span className="text-[24px] text-primary/50 ">Images</span>
          sidebar 2 works
        </div>
      </div>
    </div>
  );
};

export default Sidebar2;
