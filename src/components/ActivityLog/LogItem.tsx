import { Fragment } from 'react';
import adminIcon from '../../assets/admin.svg';

type Props = {
  data: {
    name: string;
    action: string;

    details?: [string, string];
    date: string;
    icon?: string;
  };
};

const LogItem = ({ data: { name, action, details, date, icon } }: Props) => {
  return (
    <div className="flex p-[16px] gap-[10px] ">
      <img
        className=" w-[48px] h-[48px] "
        src={icon || adminIcon}
        alt="Admin Icon"
      />

      <div className="w-full flex flex-col flex-1 justify-center gap-[8px] ">
        <div className=" text-[24px] font-khula color-primary  leading-none h-[16px]  w-fit">
          <span className="font-semibold">{name}</span> {action}
        </div>

        {!details?.includes('') && (
          <div className="text-[24px] font-khula color-primary  leading-none h-[16px]">
            {details?.map((d, index) => (
              <Fragment key={index}>
                <span className="font-semibold">{d}</span>
                {index === 0 && d !== '' && details.length === 2 && '->'}
              </Fragment>
            ))}
          </div>
        )}
      </div>

      <div className=" flex justify-end items-center">
        <div className="text-[24px] font-khula color-primary  leading-none h-[16px] ">
          {date || '9:00AM'}
        </div>
      </div>
    </div>
  );
};

export default LogItem;
