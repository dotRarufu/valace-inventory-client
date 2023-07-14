const Pagination = () => {
  return (
    <div className="sticky bottom-[8px] join flex justify-center rounded-[5px]  text-[20px]  h-[32px] p-[2px] w-full ">
      <button className=" p-[8px] basis-[27px] join-item btn btn-sm btn-ghost btn-outline border-r-0 border-primary">
        «
      </button>
      <button className="join-item basis-[27px] p-[8px] btn btn-sm border-x-0 btn-outline border-primary ">
        1
      </button>
      <button className="join-item basis-[27px] p-[8px] btn btn-sm border-x-0 btn-outline border-primary ">
        2
      </button>
      <button className="join-item basis-[27px] p-[8px] btn btn-sm  btn-outline border-x-0 border-primary">
        ...
      </button>
      <button className="join-item  basis-[27px] p-[8px] btn btn-sm border-x-0 btn-outline border-primary">
        99
      </button>
      <button className="join-item basis-[27px] p-[8px] btn btn-sm border-x-0 btn-outline border-primary">
        100
      </button>
      <button className="join-item basis-[27px] p-[8px] btn btn-sm btn-outline border-l-0 border-primary">
        »
      </button>
    </div>
  );
};

export default Pagination;
