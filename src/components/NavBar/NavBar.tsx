import Item from './Item';
import Logo from './Logo';
import reportsIcon from '../../assets/reports.svg';
import itemsIcon from '../../assets/table.svg';
import activityLogIcon from '../../assets/time.svg';
import accountsIcon from '../../assets/users.svg';
import logoutIcon from '../../assets/logout.svg';
import Modal from '../Modal/Modal';
import pb from '../../lib/pocketbase';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { useContext } from 'react';

const NavBar = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext)!;

  const handleLogout = () => {
    // setUser(null);
    pb.authStore.clear();
    // navigate('/login');
  };

  return (
    <div className=" h-full  flex bg-secondary flex-col pb-[32px] grow-0 shrink-0 basis-[354px]">
      <Logo />

      <ul className="flex flex-col gap-[8px] h-full ">
        <Item label="Reports" icon={reportsIcon} id="reports" />
        <Item label="Items" icon={itemsIcon} id="items" />
        <Item label="Activity Log" icon={activityLogIcon} id="activity-log" />
        <Item label="Accounts" icon={accountsIcon} id="accounts" />
        <div className="h-full"></div>

        <label
          htmlFor="logoutConfirmation"
          className={`btn btn-ghost py-[16px] pl-[72px] justify-start rounded-none h-fit capitalize flex`}
        >
          <img src={logoutIcon} alt="Reports" className="w-[28px] h-[28px]" />
          <span className=" h-[16px]  font-khula text-[24px] font-semibold leading-none">
            Logout
          </span>
        </label>
      </ul>

      <Modal
        id="logoutConfirmation"
        content={
          <div className=" p-[32px] flex flex-col bg-secondary">
            <div className="font-semibold text-primary text-[32px] font-khula">
              Confirmation
            </div>
            <div className="font-normal text-primary text-[24px]">
              Are you sure you want to logout?
            </div>

            <div className=" flex w-full gap-[16px] pt-[16px]">
              <label
                htmlFor="logoutConfirmation"
                className="btn btn-outline flex-1 font-khula text-[20px] "
              >
                <span className="h-[13px]">Cancel</span>
              </label>
              <button
                onClick={handleLogout}
                className="btn btn-primary flex-1 font-khula text-[20px]"
              >
                <span className="h-[13px]">Confirm</span>
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default NavBar;
