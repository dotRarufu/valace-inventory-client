import { Outlet } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import TopAppBar from './TopAppBar';
import DrawerLayout from './Drawer/DrawerLayout';
import { ReactNode, useState } from 'react';
import ItemsSidebar from './Drawer/ItemsSidebar';

export type DrawerContext = {
  setActiveDrawer: React.Dispatch<React.SetStateAction<ReactNode>>;
};

const Root = () => {
  // use context hook and pass setState to outlet 'instances'
  // get data in drawer by using useContext
  const [activeDrawer, setActiveDrawer] = useState<ReactNode>(<ItemsSidebar />);

  return (
    <DrawerLayout sidebar={activeDrawer}>
      <div className="h-screen w-screen flex overflow-y-clip">
        <NavBar />
        <div className="bg-base-100 w-full  gap-[28px] flex flex-col relative ">
          <div className="pt-[28px] px-[36px]">
            <TopAppBar />
          </div>

          <Outlet context={{ setActiveDrawer }} />
        </div>
      </div>
    </DrawerLayout>
  );
};

export default Root;
