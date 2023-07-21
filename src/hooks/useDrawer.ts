import { useOutletContext } from 'react-router-dom';
import { DrawerContext } from '../components/AdminLayout';

export const useDrawer = () => {
  return useOutletContext<DrawerContext>();
};
