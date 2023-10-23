import { NavLink } from 'react-router-dom';
import { FiBox, FiSend, FiTruck, FiUser } from 'react-icons/fi';

const BottomNavBar = () => {
  return (
    <div className="">
      <div className="join w-full rounded-[5px] border-t border-base-200 bg-base-200 bg-transparent shadow-md">
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
        <NavLink
          to="stocks"
          className={({ isActive }) =>
            ` join-item btn flex h-fit flex-1 flex-col py-1  ${
              isActive ? 'btn-primary' : 'btn-ghost'
            }`
          }
        >
          <FiBox size="1.5rem" />

          <span className="text-xs">Stocks</span>
        </NavLink>
        <NavLink
          to="shipments"
          className={({ isActive }) =>
            ` join-item btn flex h-fit flex-1 flex-col py-1  ${
              isActive ? 'btn-primary' : 'btn-ghost'
            }`
          }
        >
          <FiTruck size="1.5rem" />

          <span className="text-xs">Shipments</span>
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
      </div>
    </div>
  );
};

export default BottomNavBar;
