import LogList from '../components/ActivityLog/LogList';
import SearchBar from '../components/SearchBar';
import DateDropdown from '../components/DateDropdown';

const ActivityLog = () => {
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
