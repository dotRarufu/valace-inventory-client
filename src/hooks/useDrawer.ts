import { useOutletContext } from 'react-router-dom';
import { DrawerContext } from '../components/Root';

export const useDrawer = () => {
  return useOutletContext<DrawerContext>();
};
