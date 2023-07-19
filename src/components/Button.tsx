import { FC, ReactNode } from 'react';

interface Props {
  label?: string;
  icon?: ReactNode;
  handleClick?: () => void;
}

const Button: FC<Props> = ({ label, icon, handleClick }) => {
  return (
    <button
      onClick={() => handleClick && handleClick()}
      className="btn btn-secondary hover:btn-primary px-[16px] text-[20px] font-semibold"
    >
      {icon}
      {label}
    </button>
  );
};

export default Button;
