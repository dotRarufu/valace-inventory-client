import { ReactNode, useEffect, useState } from 'react';
import Add from '../../components/icons/Add';
import { RequestStatusOptions, UserResponse } from '../../../pocketbase-types';

import { useDrawer } from '../../hooks/useDrawer';
import { getAccounts } from '../../services/accounts';
import { toast } from 'react-hot-toast';
import { toastSettings } from '../../data/toastSettings';
import { PocketbaseError } from '../../types/PocketbaseError';
import Table, { RequestDataRow } from './Table';
import { getAllRequests, getRequest } from '../../services/request';

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
    status: RequestStatusOptions.PENDING,
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
    status: RequestStatusOptions.APPROVED,
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
    status: RequestStatusOptions['ANO PA'],
    tag: 'IT',
    unit: 'pcs',
  },
];

const Requests = () => {
  const [rowData, setRowData] = useState<RequestDataRow[]>(sampleRequests);
  const { setActiveTable, shouldUpdateTable, setShouldUpdateTable } =
    useDrawer()!;

  // Initial fetch
  useEffect(() => {
    getAllRequests()
      .then(items => {
        console.log('row data set 1');
        const newValue: RequestDataRow[] = items.map(item => ({
          amount: item.amount,
          created: item.created,
          description: item.description,
          id: item.id,
          itemName: item.item_name,
          officeName: item.officeData.username,
          status: item.status,
          unit: item.unit,
          tag: item.tag,
        }));

        console.log('row data set');
        setRowData(newValue);
      })
      .catch(err => {
        console.log("err:", err)
        const error = err as PocketbaseError;
        const errorFields = Object.keys(error.data.data);
        const field =
          errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
        const message = `${field} - ${error.data.data[errorFields[0]].message}`;

        toast.error(message, toastSettings);
      });
  }, []);

  // Update on shouldUpdate
  useEffect(() => {
    if (!shouldUpdateTable) return;
    console.log('runs update request');

    getAllRequests()
      .then(items => {
        const newValue: RequestDataRow[] = items.map(item => ({
          amount: item.amount,
          created: item.created,
          description: item.description,
          id: item.id,
          itemName: item.item_name,
          officeName: item.office,
          status: item.status,
          unit: item.unit,
          tag: item.tag,
        }));

        setRowData(newValue);
        setShouldUpdateTable(false);
      })
      .catch(err => {
        const error = err as PocketbaseError;
        const errorFields = Object.keys(error.data.data);
        const field =
          errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
        const message = `${field} - ${error.data.data[errorFields[0]].message}`;

        toast.error(message, toastSettings);
        setShouldUpdateTable(false);
      });
  }, [setShouldUpdateTable, shouldUpdateTable]);

  useEffect(() => {
    setActiveTable('requests');
  }, []);

  return (
    <div className="flex h-full flex-col gap-[16px] px-[36px] pb-[28px]  ">
      <div className="h-[752px] rounded-[5px] bg-secondary  ">
        <Table data={rowData} setData={setRowData} />
      </div>
    </div>
  );
};

export default Requests;
