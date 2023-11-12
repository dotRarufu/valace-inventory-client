import Kebab from '../../components/icons/Kebab';
import fullscreenIcon from '../../assets/fullscreen.svg';
import editIcon from '../../assets/edit.svg';
import trashIcon from '../../assets/trash.svg';
import { useDrawer } from '../../hooks/useDrawer';
import { toast } from 'react-hot-toast';
import { toastSettings } from '../../data/toastSettings';
import { PocketbaseError } from '../../types/PocketbaseError';
import {
  getRequestNoOffice,
  judgeRequest,
  removeRequest,
} from '../../services/request';
import { useContext, useEffect, useState } from 'react';
import {
  ActivityActionOptions,
  RequestResponse,
  RequestStatusOptions,
} from '../../../pocketbase-types';
import { recordActivity } from '../../services/logger';
import { UserContext } from '../../contexts/UserContext';

type Props = {
  position?: 'top' | 'bottom';
  id: string;
};

const ActionDropdown = ({ position, id }: Props) => {
  const { user } = useContext(UserContext)!;
  const {
    setActiveTable,
    // setState,
    drawerRef,
    setActiveRowId,
    setShouldUpdateTable,
  } = useDrawer()!;

  const handleViewClick = () => {
    setActiveTable('requests');
    setActiveRowId(id);
    // setState(null);
    drawerRef!.current!.click();
  };
  const [requestData, setRequestData] = useState<RequestResponse | null>(null);

  useEffect(() => {
    getRequestNoOffice(id)
      .then(d => {
        setRequestData(d);
      })
      .catch(err => {
        console.log('error getting request data:', err);
      });
  }, [id]);

  const handleDeleteRequest = async () => {
    // TODO: for deleting request
    // Should never fail
    await recordActivity(ActivityActionOptions['DELETE REQUEST'], {
      userId: user!.id,
      requestId: id,
    });

    await removeRequest(id).catch(err => {
      const error = err as PocketbaseError;
      const errorFields = Object.keys(error.data.data);
      const field =
        errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
      const message = `${field} - ${error.data.data[errorFields[0]].message}`;

      toast.error(message, toastSettings);
    });

    toast.success(`Request deleted`, toastSettings);
    setShouldUpdateTable(true);
  };

  const handleManageClick = async () => {
    await judgeRequest(id).catch(err => {
      const error = err as PocketbaseError;
      const errorFields = Object.keys(error.data.data);
      const field =
        errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
      const message = `${field} - ${error.data.data[errorFields[0]].message}`;

      toast.error(message, toastSettings);
    });

    // Should never fail
    await recordActivity(ActivityActionOptions['APPROVE REQUEST'], {
      userId: user!.id,
      requestId: id,
    });

    toast.success(`Request approved`, toastSettings);
    setShouldUpdateTable(true);
  };

  return (
    <div
      className={`dropdown-end dropdown ${
        position === 'top' ? 'dropdown-top' : 'dropdown-bottom'
      }`}
    >
      <label
        tabIndex={0}
        className="btn-ghost btn-outline btn h-[48px] w-[48px] p-[12px] hover:bg-primary/80"
      >
        <Kebab />
      </label>

      <ul
        tabIndex={0}
        className="dropdown-content menu z-[1] w-52 rounded-[5px] bg-secondary p-2 drop-shadow-md"
      >
        <li>
          <label
            onClick={handleViewClick}
            className="btn-ghost btn drawer-overlay justify-between rounded-[5px] font-khula text-[20px]"
          >
            <div className="h-[13px]">View</div>
            <img src={fullscreenIcon} />
          </label>
        </li>
        {/* <li>
          <label
            onClick={() => void handleManageClick(false)}
            className="btn-ghost btn drawer-overlay justify-between rounded-[5px] font-khula text-[20px]"
          >
            <div className="h-[13px]">Decline</div>
            <img src={fullscreenIcon} />
          </label>
        </li> */}
        {requestData?.status === RequestStatusOptions.PENDING && (
          <li>
            <label
              onClick={() => void handleManageClick()}
              className="btn-ghost btn drawer-overlay justify-between rounded-[5px] font-khula text-[20px] "
            >
              <div className="h-[13px]">Approve</div>
              <img src={editIcon} />
            </label>
          </li>
        )}
        <li>
          <label
            onClick={() => void handleDeleteRequest()}
            className="btn-ghost btn drawer-overlay justify-between rounded-[5px] font-khula text-[20px]"
          >
            <div className="h-[13px]">Delete</div>
            <img src={trashIcon} />
          </label>
        </li>
      </ul>
    </div>
  );
};

export default ActionDropdown;
