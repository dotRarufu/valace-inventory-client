import 'react-calendar/dist/Calendar.css';
import { ReactNode } from 'react';

type Props = {
  content?: ReactNode;
  label?: ReactNode;
  tooltip?: string;
  handleClick: () => void;
};

const Fab = ({ content, label, tooltip, handleClick }: Props) => {
  return (
    <div className="dropdown dropdown-top dropdown-end  absolute bottom-[16px] right-[16px] z-[1]">
      <div
        className={
          tooltip !== undefined ? 'tooltip tooltip-left tooltip-primary ' : ''
        }
        data-tip={tooltip}
      >
        <label
          onClick={handleClick}
          htmlFor="my-drawer"
          tabIndex={0}
          className="btn btn-circle btn-lg btn-primary px-[16px] border border-red-500"
        >
          {label}
        </label>
      </div>
      <div
        tabIndex={0}
        className="dropdown-content z-[1] rounded-[5px] bg-base-secondary w-fit "
      >
        {content}
        {/* <Calendar
          allowPartialRange={true}
          // goToRangeStartOnSelect={true}
          selectRange={true}
          className="rounded-[5px] p-4"
        /> */}
      </div>
    </div>
  );
};

export default Fab;
