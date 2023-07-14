import { ReactNode } from 'react';
import DrawerLayout from './Drawer/DrawerLayout';
import NavBar from './NavBar/NavBar';
import TopAppBar from './TopAppBar';

type Props = {
  children: ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <DrawerLayout>
      <div className="h-screen w-screen flex overflow-y-clip">
        <NavBar />
        <div className="bg-base-100 border w-full  gap-[28px] flex flex-col relative ">
          <div className="pt-[28px] px-[36px]">
            <TopAppBar />
          </div>

          {children}
        </div>
      </div>
    </DrawerLayout>
  );
};

export default PageLayout;
