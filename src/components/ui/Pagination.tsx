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
}: PaginationProps) => {
  const [inputValue, setInputValue] = useState<string>(currentPage.toString());

  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

  const handleInputChange = (value: string) => {
    const re = /^[0-9\b]+$/;

    console.log('val:', value);

    if (value === '') {
      setInputValue('');
      handleChangePage(1);
      return;
    }

    if (re.test(value)) {
      if (Number(value) > totalPage) return;
      console.log('change page!');
      setInputValue(value);
      handleChangePage(Number(value));
    }
  };

  return (
    <div className="sticky  flex items-center gap-[16px] rounded-[5px]  text-[20px] px-[16px] h-[32px] p-[2px] w-full ">
      <div className="text-base text-base-content/75">
        {/* todo: fix for pages with non 8 rows */}
        {(currentPage - 1) * 8 || 1} - {(currentPage - 1) * 8 + 8} of{' '}
        {totalPage * 8} items
      </div>
      <div className="text-base">
        <input
          onInput={e => handleInputChange(e.currentTarget.value)}
          pattern="[0-9]*"
        
          value={inputValue}
          className="input input-sm input-bordered w-[32px] aspect-square p-1 text-center bg-secondary rounded-[5px]"
        />
        {' of '}
        {totalPage}
      </div>
      <div className="join">
        <button
          onClick={handleStartClick}
          disabled={!isStartEnabled}
          className=" p-[8px] basis-[27px] join-item btn btn-sm btn-ghost btn-outline border-r-0 border-primary"
        >
          {'<<'}
        </button>
        <button
          onClick={handlePreviousClick}
          disabled={!isPreviousEnabled}
          className="join-item basis-[27px] p-[8px] btn btn-sm border-x-0 btn-outline border-primary "
        >
          {'<'}
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
