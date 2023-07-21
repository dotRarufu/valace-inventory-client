import { Outlet } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import TopAppBar from './TopAppBar';
import DrawerLayout from './Drawer/DrawerLayout';
import { createContext, useContext, useState } from 'react';
import { UserContext } from '../App';

export const DrawerContext = createContext<{
  activeTable: 'accounts' | 'items' | null;
  setActiveTable: React.Dispatch<
    React.SetStateAction<'accounts' | 'items' | null>
  >;
  isDrawerInEdit: boolean;
  setIsDrawerInEdit: React.Dispatch<React.SetStateAction<boolean>>;
  activeRowId: string;
  setActiveRowId: React.Dispatch<React.SetStateAction<string>>;
  shouldUpdateTable: boolean;
  setShouldUpdateTable: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDrawerInAdd: React.Dispatch<React.SetStateAction<boolean>>;
  isDrawerInAdd: boolean;
} | null>(null);

const AdminLayout = () => {
  const user = useContext(UserContext);
  const [isDrawerInEdit, setIsDrawerInEdit] = useState(false);
  const [isDrawerInAdd, setIsDrawerInAdd] = useState(false);
  const [activeTable, setActiveTable] = useState<'accounts' | 'items' | null>(
    null
  );
  const [activeRowId, setActiveRowId] = useState('');
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);

  return (
    <DrawerContext.Provider
      value={{
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
          <NavBar />
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
