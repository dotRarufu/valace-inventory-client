import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  sidebar: ReactNode;
};

const DrawerLayout = ({ children, sidebar }: Props) => {
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      {sidebar}
    </div>
  );
};

export default DrawerLayout;
