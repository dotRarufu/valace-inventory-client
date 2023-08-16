import { createContext } from 'react';
import { ItemDataRow } from '../pages/Items';

export const DrawerContext = createContext<{
  drawerRef: React.RefObject<HTMLInputElement> | null;
  setDrawerRef: React.Dispatch<
    React.SetStateAction<React.RefObject<HTMLInputElement> | null>
  >;
  activeTable: 'accounts' | 'items' | 'print-qr' | null;
  setActiveTable: React.Dispatch<
    React.SetStateAction<'accounts' | 'items' | 'print-qr' | null>
  >;
  isDrawerInEdit: boolean;
  setIsDrawerInEdit: React.Dispatch<React.SetStateAction<boolean>>;
  activeRowId: string;
  setActiveRowId: React.Dispatch<React.SetStateAction<string>>;
  shouldUpdateTable: boolean;
  setShouldUpdateTable: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDrawerInAdd: React.Dispatch<React.SetStateAction<boolean>>;
  isDrawerInAdd: boolean;
  setSelectedRows: React.Dispatch<React.SetStateAction<ItemDataRow[]>>;
  selectedRows: ItemDataRow[];
} | null>(null);
