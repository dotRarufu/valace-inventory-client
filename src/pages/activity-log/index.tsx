import SearchBar from '../../components/ui/SearchBar';
import DateDropdown from './DateDropdown';
import { useState } from 'react';
import { ActivityResponse } from '../../../pocketbase-types';
import LogList from './LogList';
import { getDatesBetween } from './utils/getDatesBetween';

export type DayLog = {
  date: Date;
  activities: ActivityResponse[];
};

const start = new Date();
start.setHours(0);
const currentDate: [Date, Date] = [start, new Date()];

const ActivityLog = () => {
  const [dateFilter, setDateFilter] = useState<[Date, Date]>(currentDate);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex h-full flex-col gap-[16px] overflow-y-scroll px-[36px] pb-[28px]">
      <div className="flex justify-between">
        <DateDropdown setDateFilter={setDateFilter} dateFilter={dateFilter} />

        <SearchBar
          handleOnChange={text => setSearchTerm(text)}
          searchTerm={searchTerm}
        />
      </div>

      {getDatesBetween(dateFilter[0], dateFilter[1]).map(d => (
        <LogList searchTerm={searchTerm} key={d.toDateString()} date={d} />
      ))}
    </div>
  );
};

export default ActivityLog;
