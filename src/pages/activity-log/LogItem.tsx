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
    <div className="flex gap-[10px] p-[16px] pl-[0px] ">
      <div className=" h-[48px] w-[48px] text-primary">{icon}</div>

      <div className="flex w-full flex-1 flex-col justify-center gap-[8px] ">
        <div className=" color-primary h-[16px] w-fit  font-khula text-[24px]  leading-none">
          <span className="font-semibold">{name}</span> {action}
        </div>
        {!details?.includes('') && (
          <div className="color-primary h-[16px] font-khula  text-[24px] leading-none">
            {details?.map((d, index) => (
              <Fragment key={index}>
                <span className="font-semibold">{d}</span>
                {index === 0 && d !== '' && details.length === 2 && '->'}
              </Fragment>
            ))}
          </div>
        )}
      </div>

      <div className=" flex items-center justify-end">
        <div className="color-primary h-[16px] font-khula  text-[24px] leading-none ">
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
