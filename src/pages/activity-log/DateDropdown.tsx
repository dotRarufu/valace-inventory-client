import { Calendar as CalendarIcon } from '../../components/icons/Calendar';
import ChevronDown from '../../components/icons/ChevronDown';
import { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import ChevronUp from '../../components/icons/ChevronUp';
import epochToDate from '../../utils/epochToDate';

export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

type Props = {
  setDateFilter: React.Dispatch<
    React.SetStateAction<ValuePiece | [ValuePiece, ValuePiece] | undefined>
  >;
};

const DateDropdown = ({ setDateFilter }: Props) => {
  const [calendarDateRange, setCalendarDateRange] = useState<
    ValuePiece | [ValuePiece, ValuePiece] | undefined
  >();
  const [dateRange, setDateRange] = useState<
    ValuePiece | [ValuePiece, ValuePiece] | undefined
  >();
  const [isOpen, setIsOpen] = useState(false);
  const [shouldShowDateRangeLabel, setShouldShowDateRangeLabel] =
    useState(true);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  // Sync dateRange to ActivtyLog's dateFilter
  useEffect(() => {
    setDateFilter(dateRange);
  }, [dateRange, setDateFilter]);

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
      // to remove 2 span item of same date
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
    setCalendarDateRange([null, null]);
  };

  const shouldDisplayClearButton = () => {
    if (calendarDateRange instanceof Array) {
      const nonNull = calendarDateRange.filter(i => i !== null);

      return nonNull.length === 2;
    }
    return false;
  };

  return (
    <details ref={detailsRef} className="dropdown">
      <summary
        onClick={() => setIsOpen(!isOpen)}
        className="btn-secondary  btn px-[16px] text-[20px] hover:btn-primary focus:outline-0"
      >
        <CalendarIcon />
        <span className="h-[13px] font-khula font-semibold">Date</span>
        {shouldShowDateRangeLabel && getDateLabel()}
        {isOpen ? <ChevronDown /> : <ChevronUp />}
      </summary>
      <div
        tabIndex={0}
        className="dropdown-content z-[1] w-fit  overflow-clip rounded-[5px] shadow "
      >
        <div className="border-red flex flex-col border bg-secondary  p-[8px] pb-[16px]">
          <Calendar
            onChange={setCalendarDateRange}
            value={calendarDateRange}
            allowPartialRange={true}
            goToRangeStartOnSelect={true}
            selectRange={true}
            className="!border-none  p-[8px]"
          />
          <div className="flex gap-[16px] ">
            {shouldDisplayClearButton() && (
              <>
                <button
                  onClick={clearCalendar}
                  className="btn-ghost btn w-full flex-1 hover:btn-error"
                >
                  Clear
                </button>
                <button
                  onClick={handleApplyClick}
                  className="btn-primary btn w-full flex-1  "
                >
                  Apply
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </details>
  );
};

export default DateDropdown;
