import TextInputField from '../../components/field/TextInputField';
import { useCallback, useEffect, useState } from 'react';
import {
  ShipmentResponse,
  ShipmentStatusOptions,
} from '../../../pocketbase-types';
import { useDrawer } from '../../hooks/useDrawer';
import toast from 'react-hot-toast';
import { toastSettings } from '../../data/toastSettings';
import { PocketbaseError } from '../../types/PocketbaseError';
import { deleteShipment, getShipment } from '../../services/shipments';

const emptyRequest: Omit<
  ShipmentResponse,
  'collectionId' | 'collectionName' | 'updated' | 'expand' | 'created'
> = {
  month: '',
  id: '',
  status: ShipmentStatusOptions.WAITING,
  created_by: '',
};

const ShipmentsSidebar = () => {
  const { activeRowId, drawerRef, setShouldUpdateTable } = useDrawer()!;
  const [fields, setFields] = useState(emptyRequest);
  const { month, created_by, status } = fields;

  // Get request info
  useEffect(() => {
    if (!activeRowId) return;

    getShipment(activeRowId)
      .then(res => {
        setFields(res);
      })
      .catch(err => {
        const error = err as PocketbaseError;
        const errorFields = Object.keys(error.data.data);
        const field =
          errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
        const message = `${field} - ${error.data.data[errorFields[0]].message}`;

        toast.error(message, toastSettings);
      });
  }, [activeRowId]);

  const clearData = useCallback(() => {
    setFields(emptyRequest);
  }, []);

  const handlePrintShipment = async () => {
    await new Promise(() => 's').then();
    // todo:

    // TODO: for record activity
    // Should never fail
    // await recordActivity(ActivityActionOptions['DELETE ACCOUNT'], {
    //   userId: user!.id,
    //   targetUserId: id,
    // });

    // toast.success(
    //   `Request ${isApproved ? 'approved' : 'declined'}`,
    //   toastSettings
    // );
    setShouldUpdateTable(true);
    drawerRef!.current!.checked = false;
  };

  const handleDeleteShipment = async () => {
    await deleteShipment(activeRowId).catch(err => {
      const error = err as PocketbaseError;
      const errorFields = Object.keys(error.data.data);
      const field =
        errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
      const message = `${field} - ${error.data.data[errorFields[0]].message}`;

      toast.error(message, toastSettings);
    });

    // TODO: for deleting request
    // Should never fail
    // await recordActivity(ActivityActionOptions['DELETE ACCOUNT'], {
    //   userId: user!.id,
    //   targetUserId: id,
    // });

    toast.success(`Request deleted`, toastSettings);
    setShouldUpdateTable(true);

    drawerRef!.current!.checked = false;
  };

  return (
    <div className="drawer-side z-[9999]">
      <label
        onClick={() => {
          drawerRef!.current!.click();
        }}
        className="drawer-overlay"
      />
      <div className="flex h-full w-[723px] flex-col gap-[8px] overflow-y-scroll bg-secondary px-[32px] pt-0 font-khula text-secondary-content">
        <div className="flex items-center justify-start pb-[16px]  pt-[32px]">
          <span className="h-[21px] text-[32px] font-semibold leading-none text-primary">
            Shipment Details
          </span>
        </div>

        <ul>
          <TextInputField
            label="Date"
            value={month}
            // todo: update the prop name
          />
          <TextInputField
            label="Created by"
            value={created_by}
            // todo: update the prop name
          />
          <TextInputField label="Status" value={status} />
        </ul>

        <div className="h-full"></div>

        <div className="flex items-center justify-end gap-[16px] py-[32px]">
          {/* <button
            onClick={() => void handlePrintShipment()}
            className="btn-primary btn px-[16px] text-[20px]  font-semibold"
          >
            <span className="h-[13px] ">Print</span>
          </button> */}

          <button
            onClick={() => void handleDeleteShipment()}
            className="btn-outline btn px-[16px] text-[20px] font-semibold  hover:btn-error"
          >
            <span className="h-[13px] ">Delete</span>
          </button>
          <label
            className="btn-outline btn px-[16px] text-[20px] font-semibold  hover:btn-error"
            onClick={() => {
              clearData();
              drawerRef!.current!.click();
            }}
          >
            <span className="h-[13px] ">Close</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ShipmentsSidebar;
