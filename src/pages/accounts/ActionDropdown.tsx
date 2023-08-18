import Kebab from '../../components/icons/Kebab';
import fullscreenIcon from '../../assets/fullscreen.svg';
import editIcon from '../../assets/edit.svg';
import trashIcon from '../../assets/trash.svg';
import { useDrawer } from '../../hooks/useDrawer';
import { useContext } from 'react';
import { ActivityActionOptions } from '../../../pocketbase-types';
import { recordActivity } from '../../utils/recordActivity';
import { UserContext } from '../../contexts/UserContext';
import { toast } from 'react-hot-toast';
import { updateAccount } from '../../services/accounts';
import { toastSettings } from '../../data/toastSettings';

type Props = {
  position?: 'top' | 'bottom';
  id: string;
};

const ActionDropdown = ({ position, id }: Props) => {
  const { user } = useContext(UserContext)!;
  const { setIsDrawerInEdit, setActiveRowId, setShouldUpdateTable } =
    useDrawer()!;

  const handleViewClick = () => {
    setActiveRowId(id);
    setIsDrawerInEdit(false);
  };

  const handleEditClick = () => {
    setActiveRowId(id);
    setIsDrawerInEdit(true);
  };

  const handleRemoveAccount = () => {
    updateAccount(id, { is_removed: true }, () => {
      toast.success(`Account removed`, toastSettings);

      setShouldUpdateTable(true);

      // This should never fail
      void recordActivity(ActivityActionOptions['DELETE ACCOUNT'], {
        userId: user!.id,
        targetUserId: id,
      });
    }).catch(() => {
      toast.error(`Account not removed`, toastSettings);
    });
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
            htmlFor="my-drawer"
            className="btn-ghost btn drawer-overlay justify-between rounded-[5px] font-khula text-[20px]"
          >
            <div className="h-[13px]">View</div>
            <img src={fullscreenIcon} />
          </label>
        </li>
        <li>
          <label
            onClick={handleEditClick}
            htmlFor="my-drawer"
            className="btn-ghost btn drawer-overlay justify-between rounded-[5px] font-khula text-[20px] "
          >
            <div className="h-[13px]">Edit</div>
            <img src={editIcon} />
          </label>
        </li>
        <li>
          <label
            onClick={handleRemoveAccount}
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
