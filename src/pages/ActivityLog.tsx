import LogList from '../components/ActivityLog/LogList';
import SearchBar from '../components/SearchBar';
import DateDropdown from '../components/DateDropdown';
import pb from '../lib/pocketbase';
import { useEffect, useState } from 'react';
import { useDrawer } from '../hooks/useDrawer';
import { AccountDataRow } from './Accounts';
import { UserResponse } from '../../pocketbase-types';

const ActivityLog = () => {
  const [rowData, setRowData] = useState<AccountDataRow[]>([]);
  const a = useDrawer();

  console.log("usedrawer:", a)

  return (
    <div className="overflow-y-scroll flex flex-col gap-[16px] pb-[28px] px-[36px]">
      <div className="flex justify-between ">
        <DateDropdown />

        <SearchBar />
      </div>

      <LogList />
      <LogList />
    </div>
  );
};

export default ActivityLog;
