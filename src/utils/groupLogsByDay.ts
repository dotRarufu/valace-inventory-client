import { ActivityResponse } from '../../pocketbase-types';
import { DayLog } from '../pages/activity-log';

export const groupLogsByDay = (logs: ActivityResponse[]) => {
  const trimmedDates: string[] = logs.map(l =>
    l.created.slice(0, l.created.indexOf(' '))
  );

  // Get unique "created" values
  const days = new Set<string>();
  trimmedDates.forEach(d => days.add(d));

  const dayLogs: DayLog[] = Array.from(days).map(day => {
    const dayActivities = logs.filter(l => {
      const trimmedDate = l.created.slice(0, l.created.indexOf(' '));

      return trimmedDate === day;
    });

    return {
      date: new Date(day),
      activities: dayActivities,
    };
  });

  return dayLogs;
};
