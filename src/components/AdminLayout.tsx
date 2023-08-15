import { Outlet } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import TopAppBar from './TopAppBar';
import DrawerLayout from './Drawer/DrawerLayout';
import { useState } from 'react';
import { DrawerContext } from '../contexts/drawerContext';

const AdminLayout = () => {
  const [isDrawerInEdit, setIsDrawerInEdit] = useState(false);
  const [isDrawerInAdd, setIsDrawerInAdd] = useState(false);
  const [activeTable, setActiveTable] = useState<
    'accounts' | 'items' | 'print-qr' | null
  >(null);
  const [activeRowId, setActiveRowId] = useState('');
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [drawerRef, setDrawerRef] =
    useState<React.RefObject<HTMLInputElement> | null>(null);

  return (
    <DrawerContext.Provider
      value={{
        drawerRef,
        setDrawerRef,
        activeTable,
        setActiveTable,
        isDrawerInEdit,
        setIsDrawerInEdit,
        activeRowId,
        setActiveRowId,
        shouldUpdateTable,
        setShouldUpdateTable,
        isDrawerInAdd,
        setIsDrawerInAdd,
      }}
    >
      <DrawerLayout
      // todo: move in context
      >
        <div className="h-screen w-screen flex overflow-y-clip">
          <NavBar role="admin" />
          <div className="bg-base-100 w-full  gap-[28px] flex flex-col relative ">
            <div className="pt-[28px] px-[36px]">
              <TopAppBar />
            </div>

            <Outlet />
          </div>
        </div>
      </DrawerLayout>
    </DrawerContext.Provider>
  );
};

export default AdminLayout;
