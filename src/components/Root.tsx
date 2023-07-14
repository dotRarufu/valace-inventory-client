import { Outlet } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import TopAppBar from './TopAppBar';
import DrawerLayout from './Drawer/DrawerLayout';

const Root = () => {
  return (
    <DrawerLayout>
      <div className="h-screen w-screen flex overflow-y-clip">
        <NavBar />
        <div className="bg-base-100 w-full  gap-[28px] flex flex-col relative ">
          <div className="pt-[28px] px-[36px]">
            <TopAppBar />
          </div>

          <Outlet />
        </div>
      </div>
    </DrawerLayout>
  );
};

export default Root;
