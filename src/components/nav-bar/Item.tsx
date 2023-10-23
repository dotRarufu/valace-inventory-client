import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  active?: boolean;
  icon: string | ReactNode;
  path: string;
  label: string;
  id?: string;
  callback?: () => void;
}

const Item = ({ icon, label, id, path, callback }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    callback && callback();

    if (id !== undefined) navigate(`/${path}/` + id);
  };

  const isActive = () => location.pathname.slice(1) === id;

  return (
    <li
      onClick={handleClick}
      className={`${
        isActive() ? 'bg-base-100' : ''
      } btn-ghost btn h-fit justify-start rounded-none py-[16px] pl-[72px] capitalize `}
    >
      {typeof icon === 'string' ? (
        <img src={icon} alt="Reports" className="h-[28px] w-[28px]" />
      ) : (
        icon
      )}
      <span className=" h-[16px] font-khula text-[24px] font-semibold leading-none text-base-content">
        {label}
      </span>
    </li>
  );
};

export default Item;
