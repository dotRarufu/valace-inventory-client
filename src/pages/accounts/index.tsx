import { ReactNode, useEffect, useState } from 'react';
import Add from '../../components/icons/Add';
import { UserResponse } from '../../../pocketbase-types';
import Table from './Table';
import { useDrawer } from '../../hooks/useDrawer';
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
    setState,
    drawerRef,
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

      <div
        className="tooltip-primary tooltip tooltip-left  absolute bottom-[16px] right-[16px] z-[1]"
        data-tip="Account"
      >
        <label
          onClick={() => {
            setActiveTable('accounts');
            setState('inAdd');
            drawerRef!.current!.click();
          }}
          // htmlFor="my-drawer"
          tabIndex={0}
          className="btn-primary btn-circle btn-lg btn px-[16px]"
        >
          <Add />
        </label>
      </div>
    </div>
  );
};

export default Accounts;
