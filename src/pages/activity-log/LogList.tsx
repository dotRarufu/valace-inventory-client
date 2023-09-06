import { ReactNode, useEffect, useState } from 'react';
import LogItem from './LogItem';
import { ActivityResponse } from '../../../pocketbase-types';
import { getActivityData, getPaginatedActivities } from '../../services/logger';
import { toast } from 'react-hot-toast';
import { toastSettings } from '../../data/toastSettings';
import { dateToDateFilterString } from './utils/dateToDateFilterString';
import { PocketbaseError } from '../../types/PocketbaseError';

type Props = {
  date: Date;
};

export type ActivityData = {
  name: string;
  action: string;
  details?: [string, string] | undefined;
  date: string;
  icon?: ReactNode;
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
        activities.map(async activity => await getActivityData(activity))
      );

      setActivitiesData(data);
    };

    getActivitiesData().catch(err => {
      const error = err as PocketbaseError;
      const errorFields = Object.keys(error.data.data);
      const field =
        errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
      const message = `${field} - ${error.data.data[errorFields[0]].message}`;

      toast.error(message, toastSettings);
    });
  }, [activities, maxPage]);

  // Get date activities, initial
  useEffect(() => {
    if (maxPage !== null) return;

    const getActivities = async () => {
      const min = dateToDateFilterString(date);
      const limitDate = new Date(date);
      limitDate.setDate(date.getDate() + 1);
      const max = dateToDateFilterString(limitDate);

      const resActivities = await getPaginatedActivities(min, max, 1, 3);

      setMaxPage(resActivities.totalPages);
      setActivities(resActivities.items);
    };

    getActivities().catch(err => {
      const error = err as PocketbaseError;
      const errorFields = Object.keys(error.data.data);
      const field =
        errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
      const message = `${field} - ${error.data.data[errorFields[0]].message}`;

      toast.error(message, toastSettings);
    });
  }, [date, maxPage]);

  // Get date activities, per current page change
  useEffect(() => {
    if (currentPage === 1) return;
    if (reachedLastPage) return;
    if (maxPage !== null && currentPage > maxPage) return;

    const getActivities = async () => {
      const min = dateToDateFilterString(date);
      const limitDate = new Date(date);
      limitDate.setDate(date.getDate() + 1);
      const max = dateToDateFilterString(limitDate);

      const resActivities = await getPaginatedActivities(
        min,
        max,
        currentPage,
        3
      );

      setReachedLastPage(maxPage !== null && currentPage >= maxPage);
      setCurrentPage(resActivities.page);
      setActivities(old => [...old, ...resActivities.items]);
    };

    getActivities().catch(err => {
      const error = err as PocketbaseError;
      const errorFields = Object.keys(error.data.data);
      const field =
        errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
      const message = `${field} - ${error.data.data[errorFields[0]].message}`;

      toast.error(message, toastSettings);
    });
  }, [currentPage, date, maxPage, reachedLastPage]);

  const handleClick = () => {
    if (maxPage !== null && currentPage > maxPage) return;

    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex flex-col gap-[16px] rounded-[5px] bg-secondary px-[24px] py-[32px]">
      <div className="color-primary h-[24px] font-khula text-[24px] font-semibold uppercase leading-none">
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
            <div className="h-[1px] w-full bg-primary/20" />
          )}
        </div>
      ))}

      {activitiesData.length === 0 && (
        <div className="font-khula text-[20px] font-semibold text-secondary-content/70">
          No activities on this day
        </div>
      )}

      {maxPage !== null && currentPage < maxPage && (
        <button onClick={handleClick} className="btn-ghost btn">
          Show more
        </button>
      )}
    </div>
  );
};

export default LogList;
