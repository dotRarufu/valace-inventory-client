import TextInputField from '../../components/field/TextInputField';
import { useCallback, useEffect, useState } from 'react';
import {
  RequestRecord,
  RequestStatusOptions,
  RequestTagOptions,
} from '../../../pocketbase-types';
import { useDrawer } from '../../hooks/useDrawer';
import toast from 'react-hot-toast';
import { toastSettings } from '../../data/toastSettings';
import { PocketbaseError } from '../../types/PocketbaseError';
import TextAreaField from '../../components/field/TextAreaField';
import {
  getRequest,
  judgeRequest,
  removeRequest,
} from '../../services/request';

const emptyRequest: RequestRecord = {
  amount: 0,
  description: '',
  item_name: '',
  office: '',
  tag: RequestTagOptions.IT,
  unit: '',
  status: RequestStatusOptions['ANO PA'],
};

const RequestsSidebar = () => {
  const { state, activeRowId, drawerRef, setShouldUpdateTable } = useDrawer()!;
  const [fields, setFields] = useState(emptyRequest);
  const { amount, description, item_name, office, tag, unit, status } = fields;

  // Get request info
  useEffect(() => {
    if (!activeRowId) return;

    getRequest(activeRowId)
      .then(res => {
        const newFields: RequestRecord = {
          amount: res.amount,
          description: res.description,
          item_name: res.item_name,
          office: res.office,
          tag: res.tag,
          unit: res.unit,
          status: res.status,
        };

        console.log('newFields:', newFields);
        console.log('activeRowId:', activeRowId);

        setFields(newFields);
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

  const handleJudgeRequest = async (isApproved: boolean) => {
    await judgeRequest(activeRowId, isApproved).catch(err => {
      const error = err as PocketbaseError;
      const errorFields = Object.keys(error.data.data);
      const field =
        errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
      const message = `${field} - ${error.data.data[errorFields[0]].message}`;

      toast.error(message, toastSettings);
    });

    // TODO: for record activity
    // Should never fail
    // await recordActivity(ActivityActionOptions['DELETE ACCOUNT'], {
    //   userId: user!.id,
    //   targetUserId: id,
    // });

    toast.success(
      `Request ${isApproved ? 'approved' : 'declined'}`,
      toastSettings
    );
    setShouldUpdateTable(true);
    drawerRef!.current!.checked = false;
  };

  const handleDeleteRequest = async () => {
    await removeRequest(activeRowId).catch(err => {
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

          clearData();
        }}
        className="drawer-overlay"
      />
      <div className="flex h-full w-[723px] flex-col gap-[8px] overflow-y-scroll bg-secondary px-[32px] pt-0 font-khula text-secondary-content">
        <div className="flex items-center justify-start pb-[16px]  pt-[32px]">
          <span className="h-[21px] text-[32px] font-semibold leading-none text-primary">
            Request Details
          </span>
        </div>

        <ul>
          <TextInputField
            label="Office"
            value={office}
            // todo: update the prop name
          />
          <TextInputField
            label="Item"
            value={item_name}
            // todo: update the prop name
          />
          <TextInputField label="Amount" value={amount.toString()} />
          <TextInputField label="Unit" value={unit} />
          <TextAreaField label="Description" value={description} />
          <TextInputField label="Tag" value={tag} />
          <TextInputField label="Status" value={status || 'no tag'} />
        </ul>

        <div className="h-full"></div>

        <div className="flex items-center justify-end gap-[16px] py-[32px]">
          <button
            onClick={() => void handleJudgeRequest(true)}
            className="btn-primary btn px-[16px] text-[20px]  font-semibold"
          >
            <span className="h-[13px] ">Approve</span>
          </button>
          <button
            onClick={() => void handleJudgeRequest(false)}
            className="btn-outline btn px-[16px] text-[20px] font-semibold  hover:btn-error"
          >
            <span className="h-[13px] ">Decline</span>
          </button>
          <button
            onClick={() => void handleDeleteRequest()}
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

export default RequestsSidebar;
