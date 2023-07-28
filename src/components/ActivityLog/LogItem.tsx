import { Fragment, ReactNode } from 'react';

type Props = {
  data: {
    name: string;
    action: string;

    details?: [string, string];
    date: string;
    icon?: ReactNode;
  };
};

const LogItem = ({ data: { name, action, details, date, icon } }: Props) => {
  return (
    <div className="flex p-[16px] pl-[0px] gap-[10px] ">
      <div className=" w-[48px] h-[48px] text-primary">{icon}</div>

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
          {new Date(date).toLocaleTimeString(undefined, {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </div>
      </div>
    </div>
  );
};

export default LogItem;
