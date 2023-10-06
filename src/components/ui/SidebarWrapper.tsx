import { Outlet } from 'react-router-dom';
import NavBar from '../nav-bar/NavBar';
import TopAppBar from './TopAppBar';
import Drawer from './Drawer';
import { useState } from 'react';
import { SidebarContext, SidebarStates } from '../../contexts/SidebarContext';
import { ItemDataRow } from '../../pages/items';
import useUser from '../../hooks/useUser';

export type Sidebars = 'accounts' | 'items' | 'print-qr' | 'supply-form' | 'requests';

const SidebarWrapper = () => {
  const [state, setState] = useState<SidebarStates>(null);
  const [activeTable, setActiveTable] = useState<Sidebars | null>(null);
  const [activeRowId, setActiveRowId] = useState('');
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const [drawerRef, setDrawerRef] =
    useState<React.RefObject<HTMLInputElement> | null>(null);
  const [selectedRows, setSelectedRows] = useState<ItemDataRow[]>([]);

  const sidebarContextValues = {
    drawerRef,
    setDrawerRef,
    activeTable,
    setActiveTable,
    activeRowId,
    setActiveRowId,
    shouldUpdateTable,
    setShouldUpdateTable,
    selectedRows,
    setSelectedRows,
    state,
    setState,
  };

  const { user } = useUser()!;

  return (
    <SidebarContext.Provider value={sidebarContextValues}>
      <Drawer
        body={
          <div className="flex h-screen w-screen overflow-y-clip">
            <NavBar role={user!.is_admin ? 'admin' : 'staff'} />

            <div className="relative flex  w-full flex-col gap-[28px] bg-base-100 ">
              <div className="px-[36px] pt-[28px]">
                <TopAppBar />
              </div>

              <Outlet />
            </div>
          </div>
        }
      />
    </SidebarContext.Provider>
  );
};

export default SidebarWrapper;
