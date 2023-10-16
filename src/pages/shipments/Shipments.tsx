import { ReactNode, useEffect, useState } from 'react';
import Add from '../../components/icons/Add';
import {
  RequestStatusOptions,
  ShipmentResponse,
  UserResponse,
} from '../../../pocketbase-types';

import { useDrawer } from '../../hooks/useDrawer';
import { getAccounts } from '../../services/accounts';
import { toast } from 'react-hot-toast';
import { toastSettings } from '../../data/toastSettings';
import { PocketbaseError } from '../../types/PocketbaseError';
import Table from './Table';
import { getAllRequests, getRequest } from '../../services/request';
import { getAllShipments } from '../../services/shipments';

export interface AccountDataRow extends UserResponse {
  actions?: ReactNode;
}

const Shipments = () => {
  const [rowData, setRowData] = useState<ShipmentResponse[]>([]);
  const { setActiveTable, shouldUpdateTable, setShouldUpdateTable } =
    useDrawer()!;

  // Initial fetch
  useEffect(() => {
    getAllShipments()
      .then(({ items }) => {
        setRowData(items);
      })
      .catch(err => {
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

    getAllShipments()
      .then(({ items }) => {
        setRowData(items);
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
    setActiveTable('shipments');
  }, []);

  return (
    <div className="flex h-full flex-col gap-[16px] px-[36px] pb-[28px]  ">
      <div className="h-[752px] rounded-[5px] bg-secondary  ">
        <Table data={rowData} setData={setRowData} />
      </div>
    </div>
  );
};

export default Shipments;
