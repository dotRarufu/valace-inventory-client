import Item from './Item';
import Logo from './Logo';
import reportsIcon from '../../assets/reports.svg';
import itemsIcon from '../../assets/table.svg';
import activityLogIcon from '../../assets/time.svg';
import accountsIcon from '../../assets/users.svg';
import logoutIcon from '../../assets/logout.svg';
import Modal from '../ui/Modal';
import pb from '../../lib/pocketbase';
import { ActivityActionOptions } from '../../../pocketbase-types';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { recordActivity } from '../../services/logger';

type Props = {
  role: 'admin' | 'staff';
};

const NavBar = ({ role }: Props) => {
  const { user } = useContext(UserContext)!;

  const handleLogout = async () => {
    // setUser(null);
    pb.authStore.clear();
    // navigate('/login');
    await recordActivity(ActivityActionOptions.LOGOUT, {
      userId: user!.id,
    });
  };

  return (
    <div className=" flex  h-full shrink-0 grow-0 basis-[354px] flex-col bg-secondary pb-[32px]">
      <Logo />

      <ul className="flex h-full flex-col gap-[8px] ">
        <Item path={role} label="Reports" icon={reportsIcon} id="reports" />
        <Item path={role} label="Items" icon={itemsIcon} id="items" />
        {role === 'admin' && (
          <>
            <Item
              path={'admin'}
              label="Activity Log"
              icon={activityLogIcon}
              id="activity-log"
            />
            <Item
              path={'admin'}
              label="Accounts"
              icon={accountsIcon}
              id="accounts"
            />
            <Item
              path={'admin'}
              label="Requests"
              icon={accountsIcon}
              id="requests"
            />
            <Item
              path={'admin'}
              label="Shipments"
              icon={accountsIcon}
              id="shipments"
            />
          </>
        )}
        <div className="h-full"></div>

        <label
          htmlFor="logoutConfirmation"
          className={`btn-ghost btn flex h-fit justify-start rounded-none py-[16px] pl-[72px] capitalize`}
        >
          <img src={logoutIcon} alt="Reports" className="h-[28px] w-[28px]" />
          <span className=" h-[16px]  font-khula text-[24px] font-semibold leading-none">
            Logout
          </span>
        </label>
      </ul>

      <Modal
        id="logoutConfirmation"
        content={
          <div className=" flex flex-col bg-secondary p-[32px]">
            <div className="font-khula text-[32px] font-semibold text-primary">
              Confirmation
            </div>
            <div className="text-[24px] font-normal text-primary">
              Are you sure you want to logout?
            </div>

            <div className=" flex w-full gap-[16px] pt-[16px]">
              <label
                htmlFor="logoutConfirmation"
                className="btn-outline btn flex-1 font-khula text-[20px] "
              >
                <span className="h-[13px]">Cancel</span>
              </label>
              <button
                onClick={() => void handleLogout()}
                className="btn-primary btn flex-1 font-khula text-[20px]"
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
