import {
  ActivityActionOptions,
  ActivityRecord,
  ActivityResponse,
  Collections,
} from '../../pocketbase-types';
import pb from '../lib/pocketbase';
import { getActionDescription } from '../utils/getActionDescription';
import { getUser } from '../utils/getUser';
import { getItem } from './item';
import { ActivityData } from '../pages/activity-log/LogList';
import Admin from '../components/icons/Admin';
import Staff from '../components/icons/Staff';

export const recordActivity = async (
  action: ActivityActionOptions,
  info: {
    userId: string;
    newValue?: string;
    oldValue?: string;
    itemId?: string;
    targetUserId?: string;
  }
) => {
  const { userId, newValue, oldValue, itemId, targetUserId } = info;

  const data: ActivityRecord = {
    user_id: userId,
    action,
    edit_new_value: newValue,
    edit_old_value: oldValue,
    item_id: itemId,
    target_user_id: targetUserId,
  };

  await pb.collection(Collections.Activity).create(data);
};

export const getActivityData = async (activity: ActivityResponse) => {
  const {
    user_id: userId,
    item_id: itemId,
    target_user_id: targetUserId,
    action,
    edit_new_value,
    edit_old_value,
    created,
  } = activity;
  const user = await getUser(userId);
  // todo: update type: this could result in PocketbaseError
  const item = await getItem(itemId);
  const targetUser = await getUser(targetUserId);
  const actionDescription = getActionDescription(action, {
    username: user.username,
    targetName: item.name || targetUser.username,
  });

  const res: ActivityData = {
    name: user.username,
    action: actionDescription,
    details: [edit_old_value, edit_new_value],
    date: created,
    icon: user.is_admin ? <Admin /> : <Staff />,
  };

  return res;
};

export const getPaginatedActivities = async (
  min: string,
  max: string,
  page: number,
  amount: number
) => {
  const res = await pb
    .collection(Collections.Activity)
    .getList<ActivityResponse>(page, amount, {
      filter: `created >= "${min}" && created < "${max}"`,
    });

  return res;
};
