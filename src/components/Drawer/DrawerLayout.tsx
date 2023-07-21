import { ReactNode } from 'react';
import AccountsSidebar from './AccountsSidebar';
import ItemsSidebar from './ItemsSidebar';
import { useDrawer } from '../../hooks/useDrawer';

type Props = {
  children: ReactNode;
};

const DrawerLayout = ({ children }: Props) => {
  const {
    activeTable,
    isDrawerInEdit,
    setIsDrawerInEdit,
    activeRowId,
    setShouldUpdateTable,
  } = useDrawer()!;

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      {activeTable === 'accounts' ? (
        <AccountsSidebar
          isDrawerInEdit={isDrawerInEdit}
          setIsDrawerInEdit={setIsDrawerInEdit}
          activeRowId={activeRowId}
          setShouldUpdateTable={setShouldUpdateTable}
        />
      ) : (
        <ItemsSidebar
          isDrawerInEdit={isDrawerInEdit}
          setIsDrawerInEdit={setIsDrawerInEdit}
          activeRowId={activeRowId}
          setShouldUpdateTable={setShouldUpdateTable}
        />
      )}
    </div>
  );
};

export default DrawerLayout;
