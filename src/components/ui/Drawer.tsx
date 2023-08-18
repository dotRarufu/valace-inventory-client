import { ReactNode, useEffect, useRef } from 'react';
import Sidebar from '../../pages/accounts/Sidebar';
import ItemsSidebar from '../../pages/items/ItemsSidebar';
import { useDrawer } from '../../hooks/useDrawer';
import PrintQrSidebar from '../../pages/items/PrintQrSidebar';

type Props = {
  body: ReactNode;
};

const renderSidebar = (
  activeTable: 'accounts' | 'items' | 'print-qr' | null
) => {
  switch (activeTable) {
    case 'accounts':
      return <Sidebar />;
    case 'items':
      return <ItemsSidebar />;
    case 'print-qr':
      return <PrintQrSidebar />;

    default:
      return '';
  }
};
const Drawer = ({ body }: Props) => {
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
      <div className="drawer-content">{body}</div>
      {renderSidebar(activeTable)}
    </div>
  );
};

export default Drawer;
