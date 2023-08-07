import { createContext } from 'react';

export const DrawerContext = createContext<{
  drawerRef: React.RefObject<HTMLInputElement> | null;
  setDrawerRef: React.Dispatch<
    React.SetStateAction<React.RefObject<HTMLInputElement> | null>
  >;
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
