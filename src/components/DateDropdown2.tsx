import { Calendar as CalendarIcon } from '../components/Icons/Calendar';
import ChevronDown from './Icons/ChevronDown';
import { useEffect, useRef, useState } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import ChevronUp from './Icons/ChevronUp';
import epochToDate from '../utils/epochToDate';
import 'react-datepicker/dist/react-datepicker.css';

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

const DateDropdown = () => {
  const [calendarDateRange, setCalendarDateRange] = useState<
    ValuePiece | [ValuePiece, ValuePiece] | undefined
  >();
  const [dateRange, setDateRange] = useState<
    ValuePiece | [ValuePiece, ValuePiece] | undefined
  >(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [shouldShowDateRangeLabel, setShouldShowDateRangeLabel] =
    useState(true);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleApplyClick = () => {
    setDateRange(calendarDateRange);
    setCalendarDateRange(null);
    setIsOpen(!isOpen);

    if (detailsRef.current !== null) {
      detailsRef.current.open = !isOpen;
    }

    setShouldShowDateRangeLabel(true);
  };

  useEffect(() => {
    if (isOpen) {
      setShouldShowDateRangeLabel(false);
      setCalendarDateRange(dateRange);
      return;
    }

    setShouldShowDateRangeLabel(true);
  }, [dateRange, isOpen]);

  const getDateLabel = () => {
    if (dateRange instanceof Array) {
      // todo: remove non different dates
      //   const unique = [...new Set(dateRange)];
      const nonNullDateRange = dateRange.filter(d => d instanceof Date);
      const milliseconds = nonNullDateRange.map(d => d!.getTime());
      const seconds = milliseconds.map(ms => Math.floor(ms / 1000));
      const stringDate = seconds.map(s => epochToDate(s));
      const template = stringDate.map((label, index) => (
        <span key={index}>{label}</span>
      ));

      return template;
    }

    if (dateRange !== null && dateRange !== undefined) {
      const milliseconds = dateRange.getTime();
      const seconds = Math.floor(milliseconds / 1000);
      const stringDate = epochToDate(seconds);
      const template = <span>{stringDate}</span>;

      return template;
    }
  };

  useEffect(() => {
    console.log('calendar date range:', calendarDateRange);
  }, [calendarDateRange]);

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
  };

  return (
    <details ref={detailsRef} className="dropdown">
      <summary
        onClick={() => setIsOpen(!isOpen)}
        className="btn  btn-secondary hover:btn-primary px-[16px] text-[20px] focus:outline-0"
      >
        <CalendarIcon />
        <span className="font-khula font-semibold h-[13px]">Date</span>
        {shouldShowDateRangeLabel && getDateLabel()}
        {isOpen ? <ChevronDown /> : <ChevronUp />}
      </summary>
      <div
        tabIndex={0}
        className="dropdown-content z-[1] rounded-[5px]  overflow-clip w-fit shadow  pb-[8px]"
      >
        <div className="bg-secondary flex flex-col rounded-[5px] border border-red-500">
          <div className="p-[0px] ">
            <DatePicker
              calendarClassName="!border-0 !w-full !border !border-red-500"
              // dayClassName={() => '!bg-success'}
              // renderCustomHeader={() => (
              //   <div className="flex gap-[16px] px-[8px] ">
              //     <div className="flex-1 w-full flex ">
              //       <button
              //         onClick={() => setCalendarDateRange([null, null])}
              //         className="btn btn-sm btn-ghost w-full flex-1 hover:btn-error"
              //       >
              //         {'<'}
              //       </button>
              //       <button
              //         onClick={() => setCalendarDateRange([null, null])}
              //         className="btn btn-sm btn-ghost w-full flex-1 hover:btn-error"
              //       >
              //         {'>'}
              //       </button>
              //     </div>

              //     <button
              //       onClick={() => setCalendarDateRange([null, null])}
              //       className="btn btn-sm btn-ghost w-full flex-1 hover:btn-error"
              //     >
              //       Clear
              //     </button>
              //     <button
              //       onClick={handleApplyClick}
              //       className="btn btn-sm btn-outline w-full flex-1 hover:btn-primary "
              //     >
              //       Apply
              //     </button>
              //   </div>
              // )}
              formatWeekDay={d => d.slice(0, 1).toLocaleUpperCase()}
              // dayClassName={() => "!bg-primary"}
              // calendarContainer={({ children, className }) => (
              //   <div className=" bg-[#f0f0f0] border border-red-500 pb-0">
              //     <CalendarContainer
              //       className={`${className || ''} !border !border-green-500`}
              //     >
              //       {/* <div className="!bg-[#f0f0f0] pt-[16px] border border-red-500">{children}</div> */}
              //       {children}
              //     </CalendarContainer>
              //   </div>
              // )}
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />
          </div>

          <div className="flex gap-[8px] px-[8px]">
            <button
              onClick={() => setCalendarDateRange([null, null])}
              className="btn btn-sm btn-ghost w-full flex-1 hover:btn-error"
            >
              Clear
            </button>
            <button
              onClick={handleApplyClick}
              className="btn btn-sm btn-outline w-full flex-1 hover:btn-primary "
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </details>
  );
};

export default DateDropdown;
