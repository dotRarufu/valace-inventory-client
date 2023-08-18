import { ReactNode, useEffect, useState } from 'react';
import Add from '../../components/icons/Add';
import { UserResponse } from '../../../pocketbase-types';
import Table from './Table';
import { useDrawer } from '../../hooks/useDrawer';
import Fab from '../../components/ui/Fab';
import { getAccounts } from '../../services/accounts';
import { toast } from 'react-hot-toast';
import { toastSettings } from '../../data/toastSettings';

export interface AccountDataRow extends UserResponse {
  actions?: ReactNode;
}

const Accounts = () => {
  const [rowData, setRowData] = useState<AccountDataRow[]>([]);
  const {
    setActiveTable,
    shouldUpdateTable,
    setShouldUpdateTable,
    setIsDrawerInAdd,
    isDrawerInAdd,
  } = useDrawer()!;

  // Initial fetch
  useEffect(() => {
    getAccounts(({ items }) => setRowData(items)).catch(() => {
      toast.error('Failed to load accounts', toastSettings);
    });
  }, []);

  // Separated for readability
  useEffect(() => {
    if (!shouldUpdateTable) return;

    getAccounts(({ items }) => {
      setRowData(items);
      setShouldUpdateTable(false);
    }).catch(() =>
      toast.error('Failed to update accounts table', toastSettings)
    );
  }, [setShouldUpdateTable, shouldUpdateTable]);

  // Set sidebar
  useEffect(() => {
    setActiveTable('accounts');
  }, [setActiveTable]);

  return (
    <div className="flex h-full flex-col gap-[16px] px-[36px] pb-[28px]  ">
      <div className="h-[752px] rounded-[5px] bg-secondary  ">
        <Table data={rowData} setData={setRowData} />
      </div>

      <Fab
        handleClick={() => setIsDrawerInAdd(!isDrawerInAdd)}
        label={<Add />}
        tooltip="Account"
      />
    </div>
  );
};

export default Accounts;
