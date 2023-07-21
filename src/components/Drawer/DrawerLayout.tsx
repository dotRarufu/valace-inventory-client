import { ReactNode } from 'react';
import AccountsSidebar from './AccountsSidebar';
import ItemsSidebar from './ItemsSidebar';

type Props = {
  children: ReactNode;
  activeTable: 'accounts' | 'items' | null;
  isDrawerInEdit: boolean;
  setIsDrawerInEdit: React.Dispatch<React.SetStateAction<boolean>>;
  activeRowId: string;
  setShouldUpdateTable: React.Dispatch<React.SetStateAction<boolean>>;
};

const DrawerLayout = ({
  children,
  activeTable,
  isDrawerInEdit,
  setIsDrawerInEdit,
  activeRowId,
  setShouldUpdateTable,
}: Props) => {
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
