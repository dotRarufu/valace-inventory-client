import SearchBar from '../../components/ui/SearchBar';
import DateDropdown from './DateDropdown';
import { useState } from 'react';
import { ActivityResponse } from '../../../pocketbase-types';
import LogList from './LogList';
import { getDatesBetween } from './getDatesBetween';

export type DayLog = {
  date: Date;
  activities: ActivityResponse[];
};

const ActivityLog = () => {
  const [dateFilter, setDateFilter] = useState<[Date, Date]>([
    new Date(),
    new Date(),
  ]);

  return (
    <div className="flex h-full flex-col gap-[16px] overflow-y-scroll px-[36px] pb-[28px]">
      <div className="flex justify-between">
        <DateDropdown setDateFilter={setDateFilter} dateFilter={dateFilter} />

        <SearchBar
          handleOnChange={() => {
            console.log();
          }}
          globalFilter="123"
        />
      </div>

      {getDatesBetween(dateFilter[0], dateFilter[1]).map(d => (
        <LogList key={d.toDateString()} date={d} />
      ))}
    </div>
  );
};

export default ActivityLog;
