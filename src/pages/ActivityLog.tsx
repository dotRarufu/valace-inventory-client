import LogList from '../components/ActivityLog/LogList';
import SearchBar from '../components/SearchBar';
import DateDropdown, { ValuePiece } from '../components/DateDropdown';
import pb from '../lib/pocketbase';
import { useEffect, useState } from 'react';
import { ActivityResponse, Collections } from '../../pocketbase-types';
import { groupLogsByDay } from '../utils/groupLogsByDay';
import { dateToDateFilterString } from '../utils/dateToDateFilterString';

export type DayLog = {
  date: Date;
  activities: ActivityResponse[];
};

const getDatesBetween = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const ActivityLog = () => {
  const [dayLogs, setDayLogs] = useState<DayLog[]>([]);
  const [dateFilter, setDateFilter] = useState<
    ValuePiece | [ValuePiece, ValuePiece] | undefined
  >();
  const [dates, setDates] = useState<Date[]>([]);

  useEffect(() => {
    if (
      //todo: improve type to not do this
      Array.isArray(dateFilter) &&
      dateFilter[0] !== null &&
      dateFilter[1] !== null &&
      dateFilter !== undefined &&
      dateFilter !== null
    ) {
      const newDates = getDatesBetween(dateFilter[0], dateFilter[1]);
      setDates(newDates);
    }
  }, [dateFilter]);

  useEffect(() => {
    console.log('dayLogs:', dayLogs);
  }, [dayLogs]);

  return (
    <div className="overflow-y-scroll flex flex-col gap-[16px] pb-[28px] px-[36px] h-full">
      <div className="flex justify-between">
        <DateDropdown setDateFilter={setDateFilter} />

        <SearchBar />
      </div>

      {/* {dayLogs.map((d, index) => {
        // console.log(index, '| daylog:', d);

        return <LogList key={index} data={d} />;
      })} */}

      {dates.map(d => (
        <LogList key={d.toDateString()} date={d} />
      ))}
    </div>
  );
};

export default ActivityLog;
