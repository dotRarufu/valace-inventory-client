import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import TopAppBar from './TopAppBar';
import DrawerLayout from './Drawer/DrawerLayout';
import { ReactNode, useContext, useEffect, useState } from 'react';
import ItemsSidebar from './Drawer/ItemsSidebar';
import { UserContext } from '../App';

export type DrawerContext = {
  activeTable: 'accounts' | 'items' | null;
  setActiveTable: React.Dispatch<
    React.SetStateAction<'accounts' | 'items' | null>
  >;
  isDrawerInEdit: boolean;
  setIsDrawerInEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminLayout = () => {
  // use context hook and pass setState to outlet 'instances'
  // get data in drawer by using useContext
  // const [activeDrawer, setActiveDrawer] = useState<ReactNode>(<ItemsSidebar />);
  const user = useContext(UserContext);
  const [isDrawerInEdit, setIsDrawerInEdit] = useState(false);
  const [activeTable, setActiveTable] = useState<'accounts' | 'items' | null>(
    null
  );

  return (
    <DrawerLayout
      activeTable={activeTable}
      isDrawerInEdit={isDrawerInEdit}
      setIsDrawerInEdit={setIsDrawerInEdit}
    >
      <div className="h-screen w-screen flex overflow-y-clip">
        <NavBar />
        <div className="bg-base-100 w-full  gap-[28px] flex flex-col relative ">
          <div className="pt-[28px] px-[36px]">
            <TopAppBar />
          </div>

          <Outlet
            context={{
              activeTable,
              setActiveTable,
              isDrawerInEdit,
              setIsDrawerInEdit,
            }}
          />
        </div>
      </div>
    </DrawerLayout>
  );
};

export default AdminLayout;
