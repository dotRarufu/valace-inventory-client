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
import { PocketbaseError } from '../../types/PocketbaseError';
import { generateCoutout } from './utils/generateCutout';

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
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const handleViewClick = () => {
    setActiveTable('items');
    setActiveRowId(id);
    setState(null);
    drawerRef!.current!.click();
  };

  const handleEditClick = () => {
    setActiveTable('items');

    setActiveRowId(id);
    setState('inEdit');
    drawerRef!.current!.click();
  };

  const handleDeleteClick = () => {
    void deleteRow();
  };

  const handlePrintClick = async () => {
    try {
      const res = await generateCoutout({
        items: [{ id, amount: 1 }],
      });

      downloadRef.current!.href = res;
      downloadRef.current!.download = `qr-code-${id}.pdf`;
      downloadRef.current!.click();
    } catch (err) {
      console.log(err)
      const error = err as PocketbaseError;
      const errorFields = Object.keys(error.data.data);
      const field =
        errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
      const message = `${field} - ${error.data.data[errorFields[0]].message}`;

      toast.error(message, toastSettings);
    }
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
      const error = err as PocketbaseError;
      const errorFields = Object.keys(error.data.data);
      const field =
        errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
      const message = `${field} - ${error.data.data[errorFields[0]].message}`;

      toast.error(message, toastSettings);
    }
  };

  return (
    <div
      className={`dropdown-end dropdown ${
        position === 'top' ? 'dropdown-top' : 'dropdown-bottom'
      }`}
    >
      <a ref={downloadRef} className="hidden" />
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
            // htmlFor="my-drawer"
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
            // htmlFor="my-drawer"
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
            onClick={() => void handlePrintClick()}
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
