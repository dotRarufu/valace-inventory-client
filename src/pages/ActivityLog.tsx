import LogList from '../components/ActivityLog/LogList';
import SearchBar from '../components/SearchBar';
import DateDropdown, { ValuePiece } from '../components/DateDropdown';
import pb from '../lib/pocketbase';
import { useEffect, useState } from 'react';
import { ActivityResponse, Collections } from '../../pocketbase-types';

export type DayLog = {
  date: Date;
  activities: ActivityResponse[];
};

const groupLogsByDay = (logs: ActivityResponse[]) => {
  const trimmedDates: ActivityResponse[] = logs.map(l => ({
    ...l,
    created: l.created.slice(0, l.created.indexOf(' ')),
  }));

  // Get unique "created" values
  const days = new Set<string>();
  trimmedDates.map(d => days.add(d.created));

  const dayLogs: DayLog[] = Array.from(days).map(day => {
    const dayActivities = trimmedDates.filter(l => l.created === day);

    return {
      date: new Date(day),
      activities: dayActivities,
    };
  });

  return dayLogs;
};

const dateToDateFilterString = (date: Date) => {
  const year = date.getFullYear().toString().padStart(4, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const ActivityLog = () => {
  const [dayLogs, setDayLogs] = useState<DayLog[]>([]);
  const [dateFilter, setDateFilter] = useState<
    ValuePiece | [ValuePiece, ValuePiece] | undefined
  >();

  useEffect(() => {
    const getActivities = async () => {
      if (
        //todo: improve type to not do this
        Array.isArray(dateFilter) &&
        dateFilter[0] !== null &&
        dateFilter[1] !== null &&
        dateFilter !== undefined &&
        dateFilter !== null
      ) {
        const min = dateToDateFilterString(dateFilter[0]);
        const max = dateToDateFilterString(dateFilter[1]);

        const activities = await pb
          .collection(Collections.Activity)
          .getList<ActivityResponse>(1, 10, {
            filter: `created > "${min}" && created < "${max}"`,
          });

        const dayLogs = groupLogsByDay(activities.items);

        setDayLogs(dayLogs);
      }
    };

    void getActivities();
  }, [dateFilter]);

  useEffect(() => {
    console.log('dayLogs:', dayLogs);
  }, [dayLogs]);

  return (
    <div className="overflow-y-scroll flex flex-col gap-[16px] pb-[28px] px-[36px]">
      <div className="flex justify-between ">
        <DateDropdown setDateFilter={setDateFilter} />

        <SearchBar />
      </div>

      {dayLogs.map((d, index) => {
        // console.log(index, '| daylog:', d);

        return <LogList key={index} data={d} />;
      })}
    </div>
  );
};

export default ActivityLog;
