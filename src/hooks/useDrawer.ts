import { useContext } from 'react';
import { SidebarContext } from '../contexts/SidebarContext';

export const useDrawer = () => {
  return useContext(SidebarContext);
};
