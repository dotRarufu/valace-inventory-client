import {
  ActivityActionOptions,
  ActivityRecord,
  Collections,
} from '../../pocketbase-types';
import pb from '../lib/pocketbase';

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
