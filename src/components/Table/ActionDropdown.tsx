import Kebab from '../Icons/Kebab';
import fullscreenIcon from '../../assets/fullscreen.svg';
import qrIcon from '../../assets/qr.svg';
import editIcon from '../../assets/edit.svg';
import trashIcon from '../../assets/trash.svg';
import { useDrawer } from '../../hooks/useDrawer';
import Sidebar2 from '../Drawer/Sidebar2';
import ItemsSidebar from '../Drawer/ItemsSidebar';

const ActionDropdown = () => {
  const { setActiveDrawer } = useDrawer();

  const handleClick1 = () => {
    console.log('ste active drawer to sidebar 2');
    setActiveDrawer(<Sidebar2 />);
  };
  const handleClick2 = () => {
    console.log('ste active drawer to sidebar 1');
    setActiveDrawer(<ItemsSidebar />);
  };

  return (
    <div className="dropdown dropdown-end">
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
        <li onClick={handleClick1}>
          <label
            htmlFor="my-drawer"
            className="drawer-overlay btn btn-ghost justify-between font-khula text-[20px] rounded-[5px]"
          >
            <div className=" h-[13px]">View</div>
            <img src={fullscreenIcon} />
          </label>
        </li>
        <li onClick={handleClick2}>
          <label
            htmlFor="my-drawer"
            className="drawer-overlay btn btn-ghost justify-between font-khula text-[20px] rounded-[5px]"
          >
            <div className=" h-[13px]">Edit</div>
            <img src={editIcon} />
          </label>
        </li>
        <li>
          <label
            htmlFor="my-drawer"
            className="drawer-overlay btn btn-ghost justify-between font-khula text-[20px] rounded-[5px]"
          >
            <div className=" h-[13px]">Delete</div>
            <img src={trashIcon} />
          </label>
        </li>
        <li>
          <label
            htmlFor="my-drawer"
            className="drawer-overlay btn btn-ghost justify-between font-khula text-[20px] rounded-[5px]"
          >
            <div className=" h-[13px]">Print QR</div>
            <img src={qrIcon} />
          </label>
        </li>
      </ul>
    </div>
  );
};

export default ActionDropdown;
