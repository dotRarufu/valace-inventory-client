import { ReactNode } from 'react';
import AccountsSidebar from './AccountsSidebar';
import ItemsSidebar from './ItemsSidebar';

type Props = {
  children: ReactNode;
  activeTable: 'accounts' | 'items' | null;
  isDrawerInEdit: boolean;
  setIsDrawerInEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const DrawerLayout = ({
  children,
  activeTable,
  isDrawerInEdit,
  setIsDrawerInEdit,
}: Props) => {
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      {activeTable === 'accounts' ? (
        <AccountsSidebar
          isDrawerInEdit={isDrawerInEdit}
          setIsDrawerInEdit={setIsDrawerInEdit}
        />
      ) : (
        <ItemsSidebar
          isDrawerInEdit={isDrawerInEdit}
          setIsDrawerInEdit={setIsDrawerInEdit}
        />
      )}
    </div>
  );
};

export default DrawerLayout;
