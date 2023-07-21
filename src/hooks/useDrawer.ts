import { DrawerContext } from '../components/AdminLayout';
import { useContext } from 'react';

export const useDrawer = () => {
  return useContext(DrawerContext);
};
