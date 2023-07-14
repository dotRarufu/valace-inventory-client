import { FC } from 'react';

interface Props {
  label?: string;
  icon?: string;
}

const Button: FC<Props> = ({ label, icon }) => {
  return (
    <button className="btn btn-secondary px-[16px] text-[20px]  font-semibold">
      <img className="w-[28px]" src={icon} alt="Table Export" />
      {label}
    </button>
  );
};

export default Button;
