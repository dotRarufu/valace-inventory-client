import { useContext, useEffect, useState } from 'react';
import adminIcon from '../../assets/admin.svg';
import epochToTime from '../../utils/epochToTime';
import epochToDate from '../../utils/epochToDate';
import { UserContext } from '../../contexts/UserContext';

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
    <div className="flex w-full items-center justify-between gap-[36px] rounded-[5px] bg-secondary px-[16px] py-[16px] font-khula text-[24px] font-semibold">
      <div className=" flex items-center gap-[8px]">
        <img src={adminIcon} alt="Admin Icon" />
        {/* improve type on user */}
        <span className="h-[16px] leading-none">{user?.username}</span>
      </div>
      <div className="flex gap-[16px]">
        <span className="h-[16px] leading-none">{epochToTime(date)}</span>
        <span className="h-[16px] leading-none">{epochToDate(date)}</span>
      </div>
    </div>
  );
};

export default TopAppBar;
