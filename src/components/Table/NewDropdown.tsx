import kebabIcon from '../../assets/kebab-horizontal.svg';
import Kebab from '../Icons/Kebab';
import fullscreenIcon from '../../assets/fullscreen.svg';
import qrIcon from '../../assets/qr.svg';
import editIcon from '../../assets/edit.svg';
import trashIcon from '../../assets/trash.svg';

const NewDropdown = () => {
  return (
    <div className="dropdown dropdown-left dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-outline btn-ghost w-[48px] h-[48px] p-[12px] hover:bg-primary/80"
      >
        <Kebab />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu menu-horizontal p-2 drop-shadow-md bg-secondary rounded-[5px] w-[535px] "
      >
        <li>
          <label
            htmlFor="my-drawer"
            className="drawer-overlay btn btn-ghost justify-between font-khula text-[20px] rounded-[5px]"
          >
            <div className=" h-[13px]">View</div>
            <img src={fullscreenIcon} />
          </label>
        </li>
        <li>
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

export default NewDropdown;
