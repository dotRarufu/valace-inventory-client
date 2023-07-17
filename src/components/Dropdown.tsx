import 'react-calendar/dist/Calendar.css';
import { ReactNode } from 'react';

type Props = {
  label: ReactNode;
  content:
    | { type: 'ReactNode'; body: ReactNode }
    | { type: 'List'; body: { label: string; icon: string }[] };
};

const Dropdown = ({ label, content }: Props) => {
  const displayContent = () => {
    if (content.type === 'List') {
      return (
        <ul className="menu w-56 bg-secondary rounded-[5px] shadow text-[24px] font-khula px-0 gap-[16px] ">
          {content.body.map((b, index) => (
            <li key={index}>
              <a className="justify-between rounded-none px-[24px]">
                <span className="h-[16px]">{b.label}</span> <img src={b.icon} />
              </a>
            </li>
          ))}
        </ul>
      );
    }

    return content.body;
  };

  return (
    <div className="dropdown ">
      <label tabIndex={0}>{label}</label>
      <div
        tabIndex={0}
        className="dropdown-content z-[1] rounded-[5px]  w-fit "
      >
        {displayContent()}
      </div>
    </div>
  );
};

export default Dropdown;
