import Kebab from '../../components/icons/Kebab';
import fullscreenIcon from '../../assets/fullscreen.svg';
import qrCodeIcon from '../../assets/qr.svg';
import editIcon from '../../assets/edit.svg';
import trashIcon from '../../assets/trash.svg';
import { useDrawer } from '../../hooks/useDrawer';
import { useContext, useRef } from 'react';
import { ActivityActionOptions } from '../../../pocketbase-types';
import { UserContext } from '../../contexts/UserContext';
import { toast } from 'react-hot-toast';
import { toastSettings } from '../../data/toastSettings';
import { removeItem } from '../../services/item';
import { recordActivity } from '../../services/logger';

type Props = {
  position?: 'top' | 'bottom';
  id: string;
};

const ActionDropdown = ({ position, id }: Props) => {
  const { user } = useContext(UserContext)!;
  const {
    setActiveRowId,
    setShouldUpdateTable,
    setActiveTable,
    drawerRef,
    setState,
  } = useDrawer()!;
  const donwloadRef = useRef<HTMLAnchorElement>(null);

  const handleViewClick = () => {
    setActiveTable('items');
    setActiveRowId(id);
    setState(null);
    console.log('handleViewClick');
  };

  const handleEditClick = () => {
    setActiveTable('items');
    setActiveRowId(id);
    setState('inEdit');
  };

  const handleDeleteClick = () => {
    void deleteRow();
  };

  const handlePrintClick = () => {
    console.log('handle print click');
    // setShouldGenerateCutout(true);
  };

  const deleteRow = async () => {
    try {
      await removeItem(id);
      await recordActivity(ActivityActionOptions['DELETE ITEM'], {
        userId: user!.id,
        itemId: id,
      });

      setShouldUpdateTable(true);

      toast.success(`Item deleted`, toastSettings);
    } catch (err) {
      toast.error(`Item not deleted`, toastSettings);
    }
  };

  return (
    <div
      className={`dropdown-end dropdown ${
        position === 'top' ? 'dropdown-top' : 'dropdown-bottom'
      }`}
    >
      <a ref={donwloadRef} className="hidden" />
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
            htmlFor="my-drawer"
            onClick={handleViewClick}
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
            className="btn-ghost btn drawer-overlay justify-between rounded-[5px] font-khula text-[20px]"
          >
            <div className=" h-[13px]">Edit</div>
            <img src={editIcon} />
          </label>
        </li>
        <li>
          <label
            onClick={handleDeleteClick}
            className="btn-ghost btn drawer-overlay justify-between rounded-[5px] font-khula text-[20px]"
          >
            <div className=" h-[13px]">Delete</div>
            <img src={trashIcon} />
          </label>
        </li>
        <li>
          <label
            onClick={handlePrintClick}
            className="btn-ghost btn drawer-overlay justify-between rounded-[5px] font-khula text-[20px]"
          >
            <div className=" h-[13px]">Print</div>
            <img src={qrCodeIcon} />
          </label>
        </li>
      </ul>
    </div>
  );
};

export default ActionDropdown;
