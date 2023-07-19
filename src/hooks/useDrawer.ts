import { useOutletContext } from 'react-router-dom';
import { DrawerContext } from '../components/Admin';

export const useDrawer = () => {
  return useOutletContext<DrawerContext>();
};
