import { ReactNode, useEffect, useRef } from 'react';
import Sidebar from '../../pages/accounts/Sidebar';
import ItemsSidebar from '../../pages/items/ItemsSidebar';
import { useDrawer } from '../../hooks/useDrawer';
import PrintQrSidebar from '../../pages/items/PrintQrSidebar';
import { Sidebars } from './SidebarWrapper';
import SupplyFormSidebar from '../../pages/items/SupplyFormSidebar';
import RequestsSidebar from '../../pages/requests/RequestsSidebar';
import ShipmentsSidebar from '../../pages/shipments/ShipmentsSidebar';

type Props = {
  body: ReactNode;
};

const renderSidebar = (activeTable: Sidebars | null) => {
  switch (activeTable) {
    case 'accounts':
      return <Sidebar />;
    case 'items':
      return <ItemsSidebar />;
    case 'print-qr':
      return <PrintQrSidebar />;
    case 'supply-form':
      return <SupplyFormSidebar />;
    case 'requests':
      return <RequestsSidebar />;
    case 'shipments':
      return <ShipmentsSidebar />;

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
        onChange={e => {
          console.log('checked:', e.target.checked);
        }}
      />
      <div className="drawer-content">{body}</div>
      {renderSidebar(activeTable)}
    </div>
  );
};

export default Drawer;
