import { ReactNode } from 'react';

import { Outlet } from 'react-router-dom';
import TopAppBar from '../../pages/officer/TopAppBar';

type Props = {
  bottomNavBar: ReactNode;
};

const MobileAppWrapper = ({ bottomNavBar }: Props) => {
  return (
    <div className="mx-auto flex h-screen w-full max-w-[480px] flex-col bg-secondary">
      <TopAppBar />

      <div className="relative  flex h-full flex-col overflow-y-scroll py-[16px] font-khula text-secondary-content ">
        <Outlet />
      </div>

      {bottomNavBar}
    </div>
  );
};

export default MobileAppWrapper;
