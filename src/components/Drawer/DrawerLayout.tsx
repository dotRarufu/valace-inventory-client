import { ReactNode } from 'react';
import Sidebar from './Sidebar';

type Props = {
  children: ReactNode;
};

const DrawerLayout = ({ children }: Props) => {
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      <Sidebar />
    </div>
  );
};

export default DrawerLayout;
