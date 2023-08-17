import { ReactNode, useEffect, useState } from 'react';
import Add from '../../components/icons/Add';
import { UserResponse } from '../../../pocketbase-types';
import AccountsTable from './AccountsTable';
import { useDrawer } from '../../hooks/useDrawer';
import Fab from '../../components/ui/Fab';
import { getAccounts } from '../../services/accounts';

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
    void getAccounts(({ items }) => setRowData(items));
  }, []);

  // Separated for readability
  useEffect(() => {
    if (!shouldUpdateTable) return;

    void getAccounts(({ items }) => {
      setRowData(items);
      setShouldUpdateTable(false);
    });
  }, [setShouldUpdateTable, shouldUpdateTable]);

  const handleFabClick = () => {
    setActiveTable('accounts');
    setIsDrawerInAdd(!isDrawerInAdd);
  };

  return (
    <div className="flex h-full flex-col gap-[16px] px-[36px] pb-[28px]  ">
      <div className="h-[752px] rounded-[5px] bg-secondary  ">
        <AccountsTable data={rowData} setData={setRowData} />
      </div>

      <Fab handleClick={handleFabClick} label={<Add />} tooltip="Account" />
    </div>
  );
};

export default Accounts;
