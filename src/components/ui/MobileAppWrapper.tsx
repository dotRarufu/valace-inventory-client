import { ReactNode } from 'react';

import BottomNavBar from '../../pages/officer/BottomNavBar';
import { Outlet } from 'react-router-dom';
import TopAppBar from '../../pages/officer/TopAppBar';

const MobileAppWrapper = () => {
  return (
    <div className="mx-auto flex h-screen w-full max-w-[480px] flex-col gap-[16px]  bg-secondary">
      <TopAppBar />
      <div className="relative  flex h-full flex-col overflow-y-scroll  font-khula text-secondary-content">
        <Outlet />
      </div>

      <BottomNavBar />
    </div>
  );
};

export default MobileAppWrapper;
