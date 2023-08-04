export type PaginationProps = {
  handleStartClick: () => void;
  isStartEnabled: boolean;
  handlePreviousClick: () => void;
  isPreviousEnabled: boolean;
  handleNextClick: () => void;
  isNextEnabled: boolean;
  handleEndClick: () => void;
  isEndEnabled: boolean;
  currentPage: number;
  totalPage: number;
};

const Pagination = ({
  handleStartClick,
  isStartEnabled,
  handlePreviousClick,
  isPreviousEnabled,
  handleNextClick,
  isNextEnabled,
  handleEndClick,
  isEndEnabled,
  totalPage,
  currentPage,
}: PaginationProps) => {
  return (
    <div className="sticky bottom-[8px] join flex justify-center rounded-[5px]  text-[20px]  h-[32px] p-[2px] w-full ">
      <button
        onClick={handleStartClick}
        disabled={!isStartEnabled}
        className=" p-[8px] basis-[27px] join-item btn btn-sm btn-ghost btn-outline border-r-0 border-primary"
      >
        1
      </button>
      <button
        onClick={handlePreviousClick}
        disabled={!isPreviousEnabled}
        className="join-item basis-[27px] p-[8px] btn btn-sm border-x-0 btn-outline border-primary "
      >
        {'<'}
      </button>

      <button className="disabled join-item basis-[27px] p-[8px] btn btn-sm  btn-outline border-x-0 border-primary">
        {currentPage}
      </button>

      <button
        onClick={handleNextClick}
        disabled={!isNextEnabled}
        className="join-item basis-[27px] p-[8px] btn btn-sm border-x-0 btn-outline border-primary"
      >
        {'>'}
      </button>
      <button
        onClick={handleEndClick}
        disabled={!isEndEnabled}
        className="join-item basis-[27px] p-[8px] btn btn-sm btn-outline border-l-0 border-primary"
      >
        {totalPage}
      </button>
    </div>
  );
};

export default Pagination;
