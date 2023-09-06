import { useEffect, useState } from 'react';

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
  handleChangePage: (page: number) => void;
  totalItemCount: number;
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
  handleChangePage,
  totalItemCount,
}: PaginationProps) => {
  const [inputValue, setInputValue] = useState<string>(currentPage.toString());

  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

  const handleInputChange = (value: string) => {
    const re = /^[0-9\b]+$/;

    if (value === '') {
      setInputValue('');
      handleChangePage(1);
      return;
    }

    if (re.test(value)) {
      if (Number(value) > totalPage) return;

      setInputValue(value);
      handleChangePage(Number(value));
    }
  };

  const isInLastPage = currentPage === totalPage;
  const totalCount = totalItemCount;
  const currentPageStartItemCount = (currentPage - 1) * 8 || 1;
  const currentPageLastItemCount = isInLastPage
    ? (currentPage - 1) * 8 + 8 - (totalCount % 8)
    : (currentPage - 1) * 8 + 8;

  return (
    <div className="sticky  flex h-[32px] w-full items-center  gap-[16px] rounded-[5px] p-[2px] px-[16px] text-[20px] ">
      <div className="text-base text-base-content/75">
        {currentPageStartItemCount} - {currentPageLastItemCount} of {totalCount}{' '}
        items
      </div>
      <div className="text-base">
        <input
          onInput={e => handleInputChange(e.currentTarget.value)}
          pattern="[0-9]*"
          value={inputValue}
          className="input-bordered input input-sm aspect-square w-[32px] rounded-[5px] bg-secondary p-1 text-center"
        />
        {' of '}
        {totalPage}
      </div>
      <div className="join">
        <button
          onClick={handleStartClick}
          disabled={!isStartEnabled}
          className=" btn-ghost btn-outline btn-sm join-item btn basis-[27px] border-r-0 border-primary p-[8px]"
        >
          {'<<'}
        </button>
        <button
          onClick={handlePreviousClick}
          disabled={!isPreviousEnabled}
          className="btn-outline btn-sm join-item btn basis-[27px] border-x-0 border-primary p-[8px] "
        >
          {'<'}
        </button>
        <button
          onClick={handleNextClick}
          disabled={!isNextEnabled}
          className="btn-outline btn-sm join-item btn basis-[27px] border-x-0 border-primary p-[8px]"
        >
          {'>'}
        </button>
        <button
          onClick={handleEndClick}
          disabled={!isEndEnabled}
          className="btn-outline btn-sm join-item btn basis-[27px] border-l-0 border-primary p-[8px]"
        >
          {'>>'}
        </button>
      </div>
    </div>
    // <div className="sticky  flex items-center gap-[32px] rounded-[5px]  text-[20px] px-[16px] h-[32px] p-[2px] w-full  ">
    //   <div className="join">
    //     <button
    //       onClick={handleStartClick}
    //       disabled={!isStartEnabled}
    //       className=" p-[8px] basis-[27px] join-item btn btn-sm btn-ghost btn-outline border-r-0 border-primary"
    //     >
    //       1
    //     </button>
    //     <button
    //       onClick={handlePreviousClick}
    //       disabled={!isPreviousEnabled}
    //       className="join-item basis-[27px] p-[8px] btn btn-sm border-x-0 btn-outline border-primary "
    //     >
    //       {'<'}
    //     </button>

    //     <span className="join-item w-fit h-full text-base border-x-0 border border-primary">
    //       {currentPage} of {totalPage}
    //     </span>

    //     <button
    //       onClick={handleNextClick}
    //       disabled={!isNextEnabled}
    //       className="join-item basis-[27px] p-[8px] btn btn-sm border-x-0 btn-outline border-primary"
    //     >
    //       {'>'}
    //     </button>
    //     <button
    //       onClick={handleEndClick}
    //       disabled={!isEndEnabled}
    //       className="join-item basis-[27px] p-[8px] btn btn-sm btn-outline border-l-0 border-primary"
    //     >
    //       {totalPage}
    //     </button>
    //   </div>
    //   <div>134-543 of 1000 items</div>
    // </div>
  );
};

export default Pagination;
