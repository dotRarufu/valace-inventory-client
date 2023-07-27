import { useEffect, useState } from 'react';
import { DayLog } from '../../pages/ActivityLog';
import LogItem from './LogItem';
import pb from '../../lib/pocketbase';
import {
  ActivityActionOptions,
  ActivityResponse,
  Collections,
  ItemResponse,
  UserResponse,
} from '../../../pocketbase-types';
import { dateToDateFilterString } from '../../utils/dateToDateFilterString';

type Props = {
  date: Date;
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
  data: { username?: string; targetName?: string }
) => {
  const targetName = data.targetName || '';

  switch (activity) {
    case ActivityActionOptions['ADD ITEM']:
      return `added ${targetName}`;
    case ActivityActionOptions['ADD ITEM THROUGH CSV']:
      return `added ${targetName} through CSV`;
    case ActivityActionOptions['ADD ACCOUNT']:
      return `added a new account ${targetName}`;
    case ActivityActionOptions['DELETE ACCOUNT']:
      return `removed an account ${targetName}`;
    case ActivityActionOptions['DELETE ITEM']:
      return `removed an item ${targetName}`;
    case ActivityActionOptions['EDIT ACCOUNT PASSWORD']:
      return `changed ${targetName}'s password`;
    case ActivityActionOptions['EDIT ACCOUNT USERNAME']:
      return `changed ${targetName}'s username`;
    case ActivityActionOptions['EDIT ACCOUNT ROLE']:
      return `changed ${targetName}'s role`;
    case ActivityActionOptions['EDIT ACCOUNT STATUS']:
      return `changed ${targetName}'s status`;
    case 'DOWNLOAD QR':
      return `downloaded the QR Code for ${targetName}`;
    case 'LOGIN':
      return `logged in`;
    case 'LOGOUT':
      return `logged out`;
    case 'EDIT NAME':
      return `edited the name of ${targetName}`;
    case 'EDIT QUANTITY':
      return `edited the quantity of ${targetName}`;
    case 'EDIT LOCATION':
      return `edited the location of ${targetName}`;
    case 'EDIT SUPPLIER':
      return `edited the supplier of ${targetName}`;
    case 'EDIT REMARKS':
      return `edited the remarks of ${targetName}`;
    case 'EDIT TYPE':
      return `edited the type of ${targetName}`;
    case 'EDIT IMAGES':
      return `edited the images of ${targetName}`;

    default:
      return '';
  }
};

const LogList = ({ date }: Props) => {
  const [activitiesData, setActivitiesData] = useState<ActivityData[]>([]);
  const [activities, setActivities] = useState<ActivityResponse[]>([]);
  const [maxPage, setMaxPage] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reachedLastPage, setReachedLastPage] = useState(false);

  // Get activities data
  useEffect(() => {
    const getActivitiesData = async () => {
      const data = await Promise.all(
        activities.map(async a => {
          const user = await pb
            .collection(Collections.User)
            .getOne<UserResponse>(a.user_id);

          // todo: update type: this could result in PocketbaseError
          const item = await pb
            .collection(Collections.Item)
            .getOne<ItemResponse>(a.item_id);

          const targetUser = await pb
            .collection(Collections.User)
            .getOne<UserResponse>(a.target_user_id);

          const action = getActionDescription(a.action, {
            username: user.username,
            targetName: item.name || targetUser.username,
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
  }, [activities, maxPage]);

  // Get date activities, initial
  useEffect(() => {
    if (maxPage !== null) {
      console.log('cant fetch initially again:', maxPage);
      return;
    }

    const getActivities = async () => {
      const min = dateToDateFilterString(date);
      const limitDate = new Date(date);
      limitDate.setDate(date.getDate() + 1);
      const max = dateToDateFilterString(limitDate);

      const resActivities = await pb
        .collection(Collections.Activity)
        .getList<ActivityResponse>(1, 3, {
          filter: `created >= "${min}" && created < "${max}"`,
        });
      console.log('activities:', resActivities);

      setMaxPage(resActivities.totalPages);
      setActivities(resActivities.items);
    };

    void getActivities();
  }, [date, maxPage]);

  // Get date activities, per current page change
  useEffect(() => {
    if (currentPage === 1) return;
    if (reachedLastPage) return;
    if (maxPage !== null && currentPage > maxPage) return;
    console.log('runs current page change');

    const getActivities = async () => {
      const min = dateToDateFilterString(date);
      const limitDate = new Date(date);
      limitDate.setDate(date.getDate() + 1);
      const max = dateToDateFilterString(limitDate);

      const resActivities = await pb
        .collection(Collections.Activity)
        .getList<ActivityResponse>(currentPage, 3, {
          filter: `created >= "${min}" && created < "${max}"`,
        });

      setReachedLastPage(maxPage !== null && currentPage >= maxPage);
      setCurrentPage(resActivities.page);
      setActivities(old => [...old, ...resActivities.items]);
    };

    void getActivities();
  }, [currentPage, date, maxPage, reachedLastPage]);

  const handleClick = () => {
    console.log('=====================');
    console.log('logList:', date);
    console.log('currentPage:', currentPage);
    console.log('maxPage:', maxPage);
    console.log('=====================');
    if (maxPage !== null && currentPage > maxPage) return;

    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="rounded-[5px] bg-secondary px-[24px] py-[32px] gap-[16px] flex flex-col">
      <div className="text-[24px] font-khula color-primary font-semibold uppercase leading-none h-[24px]">
        {date.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>

      {activitiesData.map((d, index) => (
        <div key={index}>
          <LogItem data={d} />
          {index !== activitiesData.length - 1 && (
            <div className="w-full bg-primary/20 h-[1px]" />
          )}
        </div>
      ))}

      {activitiesData.length === 0 && (
        <div className="font-khula text-[20px] text-secondary-content/70 font-semibold">
          No activities on this day
        </div>
      )}

      {maxPage !== null && currentPage < maxPage && (
        <button onClick={handleClick} className="btn btn-ghost">
          Show more
        </button>
      )}
    </div>
  );
};

export default LogList;
