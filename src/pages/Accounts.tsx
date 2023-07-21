import { ReactNode, useEffect, useMemo, useState } from 'react';
import Fab from '../components/Fab';
import Add from '../components/Icons/Add';
import SearchBar from '../components/SearchBar';

import { UserResponse } from '../../pocketbase-types';
import AccountsTable from '../components/Table/AccountsTable';
import pb from '../lib/pocketbase';
import { useDrawer } from '../hooks/useDrawer';

export interface AccountDataRow extends UserResponse {
  actions?: ReactNode;
}

const Accounts = () => {
  const [rowData, setRowData] = useState<AccountDataRow[]>([]);
  const { setActiveTable, shouldUpdateTable, setShouldUpdateTable } =
    useDrawer();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setActiveTable('accounts');
  }, [setActiveTable]);

  useEffect(() => {
    const getAccounts = async () => {
      // admins are stored in user collection to store the the plain password
      const staffResult = await pb
        .collection('user')
        .getList<UserResponse>(1, 5);

      setRowData(staffResult.items);
    };

    void getAccounts();
  }, []);

  // todo; refactor this
  useEffect(() => {
    if (!shouldUpdateTable) return;

    const getAccounts = async () => {
      // admins are stored in user collection to store the the plain password
      const staffResult = await pb
        .collection('user')
        .getList<UserResponse>(1, 5);

      setRowData(staffResult.items);
      setShouldUpdateTable(false);
    };

    void getAccounts();
  }, [setShouldUpdateTable, shouldUpdateTable]);

  return (
    <div className="flex flex-col gap-[16px] pb-[28px] px-[36px] h-full  ">
      <div className="bg-secondary rounded-[5px] h-[752px]  ">
        <AccountsTable data={rowData} setData={setRowData} />
        {/* <Pagination /> */}
      </div>
      <Fab label={<Add />} tooltip="Account" />
    </div>
  );
};

export default Accounts;
