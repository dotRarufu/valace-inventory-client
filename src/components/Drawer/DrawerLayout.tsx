import { ReactNode, useEffect, useRef } from 'react';
import AccountsSidebar from './AccountsSidebar';
import ItemsSidebar from './ItemsSidebar';
import { useDrawer } from '../../hooks/useDrawer';

type Props = {
  children: ReactNode;
};

const renderSidebar = (activeTable: 'accounts' | 'items' | null) => {
  switch (activeTable) {
    case 'accounts':
      return <AccountsSidebar />;
    case 'items':
      return <ItemsSidebar />;

    default:
      return '';
  }
};
const DrawerLayout = ({ children }: Props) => {
  const { activeTable, setDrawerRef } = useDrawer()!;

  const drawerCheckboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDrawerRef(drawerCheckboxRef);
  }, [setDrawerRef]);

  return (
    <div className="drawer drawer-end">
      <input
        ref={drawerCheckboxRef}
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content">{children}</div>
      {renderSidebar(activeTable)}
    </div>
  );
};

export default DrawerLayout;
