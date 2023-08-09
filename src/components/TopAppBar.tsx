import { useContext, useEffect, useState } from 'react';
import adminIcon from '../assets/admin.svg';
import epochToTime from '../utils/epochToTime';
import epochToDate from '../utils/epochToDate';
import { UserContext } from '../contexts/userContext';

const TopAppBar = () => {
  const [date, setDate] = useState<number>(Date.now());
  const { user } = useContext(UserContext)!;

  useEffect(() => {
    setInterval(() => {
      const currentEpochTime = Math.floor(Date.now() / 1000);
      setDate(currentEpochTime);
    }, 1000);
  }, []);

  return (
    <div className="font-khula font-semibold text-[24px] bg-secondary w-full px-[16px] py-[16px] justify-between flex gap-[36px] items-center rounded-[5px]">
      <div className=" flex gap-[8px] items-center">
        <img src={adminIcon} alt="Admin Icon" />
        {/* improve type on user */}
        <span className="leading-none h-[16px]">
          {user?.username}
        </span>
      </div>
      <div className="flex gap-[16px]">
        <span className="leading-none h-[16px]">{epochToTime(date)}</span>
        <span className="leading-none h-[16px]">{epochToDate(date)}</span>
      </div>
    </div>
  );
};

export default TopAppBar;
