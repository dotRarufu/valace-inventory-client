import { NavLink } from 'react-router-dom';
import { FiClipboard, FiSend, FiUser } from 'react-icons/fi';

const OfficeBottomNavBar = () => {
  return (
    <div className="">
      <div className="join w-full rounded-[5px] border-t border-base-200 bg-base-200 bg-transparent shadow-md">
        <NavLink
          to="requests"
          className={({ isActive }) =>
            ` join-item btn flex h-fit flex-1 flex-col py-1  ${
              isActive ? 'btn-primary' : 'btn-ghost'
            }`
          }
        >
          <FiClipboard size="1.5rem" />

          <span className="text-xs">Requests</span>
        </NavLink>
        <NavLink
          to="utilize"
          className={({ isActive }) =>
            ` join-item btn flex h-fit flex-1 flex-col py-1  ${
              isActive ? 'btn-primary' : 'btn-ghost'
            }`
          }
        >
          <FiSend size="1.5rem" />

          <span className="text-xs">Utilize</span>
        </NavLink>

        <NavLink
          to="profile"
          className={({ isActive }) =>
            ` join-item btn flex h-fit flex-1 flex-col py-1  ${
              isActive ? 'btn-primary' : 'btn-ghost'
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
