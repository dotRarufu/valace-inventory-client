import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  active?: boolean;
  icon: string;
  label: string;
  id?: string;
  callback?: () => void;
}

const Item = ({ icon, label, id, callback }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    callback && callback();

    if (id !== undefined) navigate('/' + id);
  };

  const isActive = () => location.pathname.slice(1) === id;

  return (
    <li
      onClick={handleClick}
      className={`${
        isActive() ? 'bg-base-100' : ''
      } btn btn-ghost py-[16px] pl-[72px] justify-start rounded-none h-fit capitalize `}
    >
      <img src={icon} alt="Reports" className="w-[28px] h-[28px]" />
      <span className=" h-[16px] text-base-content font-khula text-[24px] font-semibold leading-none">
        {label}
      </span>
    </li>
  );
};

export default Item;
