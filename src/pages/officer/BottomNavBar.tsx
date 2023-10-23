import { NavLink } from 'react-router-dom';
import { FiBox, FiSend, FiTruck, FiUser } from 'react-icons/fi';

const BottomNavBar = () => {
  return (
    <div className="">
      <div className="join w-full rounded-[5px] bg-primary">
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
        <NavLink
          to="stocks"
          className={({ isActive }) =>
            `btn-primary join-item btn flex h-fit flex-1 flex-col py-1 text-primary-content ${
              isActive ? 'text-info' : ''
            }`
          }
        >
          <FiBox size="1.5rem" />

          <span className="text-xs">Stocks</span>
        </NavLink>
        <NavLink
          to="shipments"
          className={({ isActive }) =>
            `btn-primary join-item btn flex h-fit flex-1 flex-col py-1 text-primary-content ${
              isActive ? 'text-info' : ''
            }`
          }
        >
          <FiTruck size="1.5rem" />

          <span className="text-xs">Shipments</span>
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
      </div>
    </div>
  );
};

export default BottomNavBar;
