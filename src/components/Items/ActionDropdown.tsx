import Kebab from '../Icons/Kebab';
import fullscreenIcon from '../../assets/fullscreen.svg';
import qrCodeIcon from '../../assets/qr.svg';
import editIcon from '../../assets/edit.svg';
import trashIcon from '../../assets/trash.svg';
import { useDrawer } from '../../hooks/useDrawer';
import { useContext, useEffect, useRef, useState } from 'react';
import pb from '../../lib/pocketbase';
import { ActivityActionOptions, Collections } from '../../../pocketbase-types';
import { UserContext } from '../../contexts/userContext';
import { recordActivity } from '../../utils/recordActivity';
import { toast } from 'react-hot-toast';
import { generateCoutout } from '../../utils/generateCutout';

type Props = {
  position?: 'top' | 'bottom';
  id: string;
};

const ActionDropdown = ({ position, id }: Props) => {
  const { user } = useContext(UserContext)!;
  const {
    setIsDrawerInEdit,
    setActiveRowId,
    activeRowId,
    setShouldUpdateTable,
    setActiveTable,
  } = useDrawer()!;
  const [shouldDeleteRow, setShouldDeleteRow] = useState(false);
  const donwloadRef = useRef<HTMLAnchorElement>(null);

  const handleViewClick = () => {
    setActiveTable('items');
    setActiveRowId(id);
    setIsDrawerInEdit(false);
  };

  const handleEditClick = () => {
    setActiveTable('items');
    setActiveRowId(id);
    setIsDrawerInEdit(true);
  };

  const handleDeleteClick = () => {
    setShouldDeleteRow(true);
  };
  const [shouldGenerateCutout, setShouldGenerateCutout] = useState(false);
  useEffect(() => {
    if (!shouldGenerateCutout) return;

    const generateCutout = async () => {
      const res = await generateCoutout({
        items: [
          { amount: 1, id: 'nfvjv6ihf5c0hjm' },
          { amount: 5, id: 'cho2a43pr5vjpcg' },
        ],
      });

      if (res !== undefined) {
        if (donwloadRef.current === null) return;
        donwloadRef.current.href = res;
        donwloadRef.current.download = 'test.pdf';
        // donwloadRef.current.click();
      }

      setShouldGenerateCutout(false);
    };

    void generateCutout();
  }, [shouldGenerateCutout]);

  const handlePrintClick = () => {
    console.log('handle print click');
    setShouldGenerateCutout(true);
  };

  useEffect(() => {
    if (!shouldDeleteRow) return;

    const deleteRow = async () => {
      try {
        await pb.collection(Collections.Item).update(id, {
          is_removed: true,
        });
        await recordActivity(ActivityActionOptions['DELETE ITEM'], {
          userId: user!.id,
          itemId: id,
        });
        setShouldUpdateTable(true);
        setShouldDeleteRow(false);
        toast.success(`Item deleted`, {
          duration: 7000,
          position: 'bottom-center',
          className: 'font-semibold',
        });
      } catch (err) {
        toast.error(`Item not deleted`, {
          duration: 7000,
          position: 'bottom-center',
          className: 'font-semibold',
        });
      }
    };

    void deleteRow();
  }, [activeRowId, id, setShouldUpdateTable, shouldDeleteRow, user]);

  return (
    <div
      className={`dropdown dropdown-end ${
        position === 'top' ? 'dropdown-top' : 'dropdown-bottom'
      }`}
    >
      <a ref={donwloadRef} className="hidden" />
      <label
        tabIndex={0}
        className="btn btn-outline btn-ghost w-[48px] h-[48px] p-[12px] hover:bg-primary/80"
      >
        <Kebab />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 drop-shadow-md bg-secondary rounded-[5px] w-52"
      >
        <li>
          <label
            onClick={handleViewClick}
            htmlFor="my-drawer"
            className="drawer-overlay btn btn-ghost justify-between font-khula text-[20px] rounded-[5px]"
          >
            <div className=" h-[13px]">View</div>
            <img src={fullscreenIcon} />
          </label>
        </li>
        <li>
          <label
            onClick={handleEditClick}
            htmlFor="my-drawer"
            className="drawer-overlay btn btn-ghost justify-between font-khula text-[20px] rounded-[5px]"
          >
            <div className=" h-[13px]">Edit</div>
            <img src={editIcon} />
          </label>
        </li>
        <li>
          <label
            onClick={handleDeleteClick}
            className="drawer-overlay btn btn-ghost justify-between font-khula text-[20px] rounded-[5px]"
          >
            <div className=" h-[13px]">Delete</div>
            <img src={trashIcon} />
          </label>
        </li>
        <li>
          <label
            onClick={handlePrintClick}
            className="drawer-overlay btn btn-ghost justify-between font-khula text-[20px] rounded-[5px]"
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
