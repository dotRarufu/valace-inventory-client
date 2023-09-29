import { NavLink } from 'react-router-dom';
import { FiBox, FiClipboard, FiSend, FiTruck, FiUser } from 'react-icons/fi';

const OfficeBottomNavBar = () => {
  return (
    <div className="">
      <div className="join w-full rounded-[5px] bg-primary">
        <NavLink
          to="requests"
          className={({ isActive }) =>
            `btn-primary join-item btn flex h-fit flex-1 flex-col py-1 text-primary-content ${
              isActive ? 'text-info' : ''
            }`
          }
        >
          <FiClipboard size="1.5rem" />

          <span className="text-xs">Requests</span>
        </NavLink>
        <NavLink
          to="utilize"
          className={({ isActive }) =>
            `btn-primary join-item btn flex h-fit flex-1 flex-col py-1 text-primary-content ${
              isActive ? 'text-info' : ''
            }`
          }
        >
          <FiSend size="1.5rem" />

          <span className="text-xs">Utilize</span>
        </NavLink>

        <NavLink
          to="profile"
          className={({ isActive }) =>
            `btn-primary join-item btn flex h-fit flex-1 flex-col py-1 text-primary-content ${
              isActive ? 'text-info' : ''
            }`
          }
        >
          <FiUser size="1.5rem" />

          <span className="text-xs">Profile</span>
        </NavLink>
      </div>
    </div>
  );
};

export default OfficeBottomNavBar;
