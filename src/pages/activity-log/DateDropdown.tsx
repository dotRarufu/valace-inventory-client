import { Calendar as CalendarIcon } from '../../components/icons/Calendar';
import ChevronDown from '../../components/icons/ChevronDown';
import { useRef, useState } from 'react';
import Calendar from 'react-calendar';
import ChevronUp from '../../components/icons/ChevronUp';
import epochToDate from '../../utils/epochToDate';

export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

type Props = {
  setDateFilter: React.Dispatch<React.SetStateAction<[Date, Date]>>;
  dateFilter: [Date, Date];
};

const DateDropdown = ({ setDateFilter, dateFilter }: Props) => {
  const [calendarDateRange, setCalendarDateRange] = useState<
    [Date, Date | null] | null
  >(null);
  const [isOpen, setIsOpen] = useState(false);

  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleApplyClick = () => {
    if (calendarDateRange === null) return;

    setDateFilter(calendarDateRange as [Date, Date]);
    setIsOpen(!isOpen);

    if (detailsRef.current !== null) {
      detailsRef.current.open = !isOpen;
    }
  };

  const getDateLabel = () => {
    // todo: remove non different dates
    // to remove 2 span item of same date
    //   const unique = [...new Set(dateRange)];

    const nonNullDateRange = dateFilter.filter(d => d instanceof Date);
    const milliseconds = nonNullDateRange.map(d => d.getTime());
    const seconds = milliseconds.map(ms => Math.floor(ms / 1000));
    const stringDate = seconds.map(s => epochToDate(s));
    const template = stringDate.map((label, index) => (
      <span key={index}>{label}</span>
    ));

    return template;
  };

  const clearCalendar = () => {
    setCalendarDateRange(null);
  };

  const shouldDisplayClearButton = () => {
    if (calendarDateRange === null) {
      return false;
    }

    const dates = calendarDateRange.filter(
      c => c instanceof Date && c !== null
    );
    return dates.length === 2;
  };

  return (
    <details ref={detailsRef} className="dropdown">
      <summary
        onClick={() => setIsOpen(!isOpen)}
        className="btn-secondary  btn px-[16px] text-[20px] hover:btn-primary focus:outline-0"
      >
        <CalendarIcon />
        <span className="h-[13px] font-khula font-semibold">Date</span>
        {!isOpen && getDateLabel()}
        {isOpen ? <ChevronDown /> : <ChevronUp />}
      </summary>
      <div
        tabIndex={0}
        className="dropdown-content z-[1] w-fit  overflow-clip rounded-[5px] shadow "
      >
        <div className="border-red flex flex-col border bg-secondary  p-[8px] pb-[16px]">
          <Calendar
            onChange={v => {
              const value = v as [Date, Date | null];
              setCalendarDateRange(value);
            }}
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
