import { FC, ReactNode } from 'react';

interface Props {
  label?: string;
  icon?: ReactNode;
}

const Button: FC<Props> = ({ label, icon }) => {
  return (
    <button className="btn btn-secondary hover:btn-primary px-[16px] text-[20px]  font-semibold">
      {icon}
      {label}
    </button>
  );
};

export default Button;
