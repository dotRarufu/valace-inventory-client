import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import TopAppBar from './TopAppBar';
import DrawerLayout from './Drawer/DrawerLayout';
import { ReactNode, useContext, useEffect, useState } from 'react';
import ItemsSidebar from './Drawer/ItemsSidebar';
import { UserContext } from '../App';

export type DrawerContext = {
  setActiveDrawer: React.Dispatch<React.SetStateAction<ReactNode>>;
};

const AdminLayout = () => {
  // use context hook and pass setState to outlet 'instances'
  // get data in drawer by using useContext
  const [activeDrawer, setActiveDrawer] = useState<ReactNode>(<ItemsSidebar />);
  const user = useContext(UserContext);

  // if (user === null) return <></>;

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

export default AdminLayout;
