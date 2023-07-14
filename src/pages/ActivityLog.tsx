import Dropdown from '../components/Dropdown';
import LogList from '../components/ActivityLog/LogList';
import SearchBar from '../components/SearchBar';
import Calendar from 'react-calendar';
import calendar from '../assets/calendar.svg';
import Button from '../components/Button';

const ActivityLog = () => {
  return (
    <div className="overflow-y-scroll flex flex-col gap-[16px] pb-[28px] px-[36px]">
      <div className="flex justify-between ">
        <Dropdown
          label={<Button label="Date" icon={calendar} />}
          content={{
            type: 'ReactNode',
            body: (
              <div className="bg-base-secondary">
                <Calendar
                  allowPartialRange={true}
                  // goToRangeStartOnSelect={true}
                  selectRange={true}
                  className="rounded-[5px] p-4"
                />
              </div>
            ),
          }}
        />

        <SearchBar />
      </div>

      <LogList />
      <LogList />
    </div>
  );
};

export default ActivityLog;
