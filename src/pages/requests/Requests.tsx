import { ReactNode, useEffect, useState } from 'react';
import Add from '../../components/icons/Add';
import { UserResponse } from '../../../pocketbase-types';

import { useDrawer } from '../../hooks/useDrawer';
import { getAccounts } from '../../services/accounts';
import { toast } from 'react-hot-toast';
import { toastSettings } from '../../data/toastSettings';
import { PocketbaseError } from '../../types/PocketbaseError';
import Table, { RequestDataRow } from './Table';

export interface AccountDataRow extends UserResponse {
  actions?: ReactNode;
}
const sampleRequests: RequestDataRow[] = [
  {
    amount: 1,
    created: 'now',
    description: 'goofy mouse',
    id: '123dsf',
    itemName: 'Penble Mouse',
    officeName: 'IT Office',
    status: false,
    tag: 'IT',
    unit: 'pcs',
  },
  {
    amount: 1,
    created: 'now',
    description: 'goofy mouse',
    id: '123dsf',
    itemName: 'Penble Mouse',
    officeName: 'IT Office',
    status: false,
    tag: 'IT',
    unit: 'pcs',
  },
  {
    amount: 1,
    created: 'now',
    description: 'goofy mouse',
    id: '123dsf',
    itemName: 'Penble Mouse',
    officeName: 'IT Office',
    status: false,
    tag: 'IT',
    unit: 'pcs',
  },
];

const Requests = () => {
  const [rowData, setRowData] = useState<RequestDataRow[]>(sampleRequests);
  const { setActiveTable, shouldUpdateTable, setShouldUpdateTable } =
    useDrawer()!;

  // Initial fetch
  // useEffect(() => {
  //   getAccounts(({ items }) => setRowData(items)).catch(err => {
  //     const error = err as PocketbaseError;
  //     const errorFields = Object.keys(error.data.data);
  //     const field =
  //       errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
  //     const message = `${field} - ${error.data.data[errorFields[0]].message}`;

  //     toast.error(message, toastSettings);
  //   });
  // }, []);

  // Separated for readability
  // useEffect(() => {
  //   if (!shouldUpdateTable) return;

  //   getAccounts(({ items }) => {
  //     setRowData(items);
  //     setShouldUpdateTable(false);
  //   }).catch(err => {
  //     const error = err as PocketbaseError;
  //     const errorFields = Object.keys(error.data.data);
  //     const field =
  //       errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
  //     const message = `${field} - ${error.data.data[errorFields[0]].message}`;

  //     toast.error(message, toastSettings);
  //   });
  // }, [setShouldUpdateTable, shouldUpdateTable]);

  // Set sidebar
  useEffect(() => {
    setActiveTable('accounts');
  }, [setActiveTable]);

  return (
    <div className="flex h-full flex-col gap-[16px] px-[36px] pb-[28px]  ">
      <div className="h-[752px] rounded-[5px] bg-secondary  ">
        <Table data={rowData} setData={setRowData} />
      </div>
    </div>
  );
};

export default Requests;
