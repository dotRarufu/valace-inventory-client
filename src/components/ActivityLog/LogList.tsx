import { useEffect, useState } from 'react';
import { DayLog } from '../../pages/ActivityLog';
import LogItem from './LogItem';
import pb from '../../lib/pocketbase';
import {
  ActivityActionOptions,
  Collections,
  ItemResponse,
  UserResponse,
} from '../../../pocketbase-types';

type Props = {
  data: DayLog;
};

export type ActivityData = {
  name: string;
  action: string;

  details?: [string, string] | undefined;
  date: string;
  icon?: string | undefined;
};

const getActionDescription = (
  activity: ActivityActionOptions,
  data: { username?: string; itemName?: string }
) => {
  const itemName = data.itemName || '';

  switch (activity) {
    case 'ADD':
      return `added ${itemName}`;
    case 'ADD THROUGH CSV':
      return `added ${itemName} through CSV`;
    case 'DELETE':
      return `deleted ${itemName}`;
    case 'DOWNLOAD QR':
      return `downloaded the QR Code for ${itemName}`;
    case 'LOGIN':
      return `logged in`;
    case 'LOGOUT':
      return `logged out`;
    case 'EDIT NAME':
      return `edited the name of ${itemName}`;
    case 'EDIT QUANTITY':
      return `edited the quantity of ${itemName}`;
    case 'EDIT LOCATION':
      return `edited the location of ${itemName}`;
    case 'EDIT SUPPLIER':
      return `edited the supplier of ${itemName}`;
    case 'EDIT REMARKS':
      return `edited the remarks of ${itemName}`;
    case 'EDIT TYPE':
      return `edited the type of ${itemName}`;
    case 'EDIT IMAGES':
      return `edited the images of ${itemName}`;

    default:
      return '';
  }
};

const LogList = ({ data: { date, activities } }: Props) => {
  const [activitiesData, setActivitiesData] = useState<ActivityData[]>([]);

  useEffect(() => {
    const getActivitiesData = async () => {
      const data = await Promise.all(
        activities.map(async a => {
          const user = await pb
            .collection(Collections.User)
            .getOne<UserResponse>(a.user_id);

          const item = await pb
            .collection(Collections.Item)
            .getOne<ItemResponse>(a.item_id);

          const action = getActionDescription(a.action, {
            username: user.username,
            itemName: item.name,
          });

          const data: ActivityData = {
            name: user.username,
            action: action,

            details: [a.edit_old_value, a.edit_new_value],
            date: a.created,
            icon: user.avatar,
          };

          return data;
        })
      );

      setActivitiesData(data);
    };

    void getActivitiesData();
  }, [activities]);

  return (
    <div className="rounded-[5px] bg-secondary px-[24px] py-[32px] gap-[16px] flex flex-col">
      <div className="text-[24px] font-khula color-primary font-semibold uppercase leading-none h-[24px]">
        {date.toDateString()}
      </div>

      {activitiesData.map((d, index) => (
        <div key={index}>
          <LogItem data={d} />
          {index !== activitiesData.length - 1 && (
            <div className="w-full bg-primary/20 h-[1px]" />
          )}
        </div>
      ))}
    </div>
  );
};

export default LogList;
