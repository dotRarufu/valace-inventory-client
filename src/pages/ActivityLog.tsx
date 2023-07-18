import LogList from '../components/ActivityLog/LogList';
import SearchBar from '../components/SearchBar';
import DateDropdown from '../components/DateDropdown';
import DateDropdown2 from '../components/DateDropdown2';

const ActivityLog = () => {
  return (
    <div className="overflow-y-scroll flex flex-col gap-[16px] pb-[28px] px-[36px]">
      <div className="flex justify-between ">
        <DateDropdown />
        {/* <Dropdown
          label={<Button label="Date" icon={<CalendarIcon />} />}
          content={{
            type: 'ReactNode',
            body: (
              <div className="bg-secondary flex flex-col border border-red gap-[8px] p-[8px]">
                <Calendar
                  onChange={setDateRange}
                  allowPartialRange={true}
                  // goToRangeStartOnSelect={true}
                  selectRange={true}
                  className="p-4 !border-none"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleApplyClick}
                    className="btn btn-outline"
                  >
                    Apply
                  </button>
                </div>
              </div>
            ),
          }}
        /> */}

        <SearchBar />
      </div>

      <LogList />
      <LogList />
    </div>
  );
};

export default ActivityLog;
