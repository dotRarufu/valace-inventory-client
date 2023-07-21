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
  setActiveRowId: React.Dispatch<React.SetStateAction<string>>;
  shouldUpdateTable: boolean;
  setShouldUpdateTable: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminLayout = () => {
  const user = useContext(UserContext);
  const [isDrawerInEdit, setIsDrawerInEdit] = useState(false);
  const [activeTable, setActiveTable] = useState<'accounts' | 'items' | null>(
    null
  );
  const [activeRowId, setActiveRowId] = useState('');
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);

  return (
    <DrawerLayout
      // todo: move in context
      activeTable={activeTable}
      isDrawerInEdit={isDrawerInEdit}
      setIsDrawerInEdit={setIsDrawerInEdit}
      activeRowId={activeRowId}
      setShouldUpdateTable={setShouldUpdateTable}
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
              setActiveRowId,
              shouldUpdateTable,
              setShouldUpdateTable,
            }}
          />
        </div>
      </div>
    </DrawerLayout>
  );
};

export default AdminLayout;
