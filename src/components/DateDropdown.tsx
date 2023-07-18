import { Calendar as CalendarIcon } from '../components/Icons/Calendar';
import ChevronDown from './Icons/ChevronDown';
import { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import ChevronUp from './Icons/ChevronUp';
import epochToDate from '../utils/epochToDate';

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
    setCalendarDateRange([null, null]);
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

  const clearCalendar = () => {
    // if (calendarDateRange === undefined) return;

    // if (!(calendarDateRange instanceof Array)) return;

    // if (calendarDateRange.includes(null)) {
    //   setCalendarDateRange([new Date(), new Date()]);

    //   return;
    // }

    setCalendarDateRange([null, null]);
  };

  useEffect(() => {
    console.log('calendar date range:', calendarDateRange);
  }, [calendarDateRange]);

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
        className="dropdown-content z-[1] rounded-[5px]  overflow-clip w-fit shadow "
      >
        <div className="bg-secondary flex flex-col border border-red  p-[8px]">
          <Calendar
            onChange={setCalendarDateRange}
            value={calendarDateRange}
            allowPartialRange={true}
            goToRangeStartOnSelect={true}
            selectRange={true}
            className="p-4 !border-none"
          />
          <div className="flex gap-[16px] ">
            <button
              onClick={clearCalendar}
              className="btn btn-ghost w-full flex-1 hover:btn-error"
            >
              Clear
            </button>
            <button
              onClick={handleApplyClick}
              className="btn btn-primary w-full flex-1  "
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
