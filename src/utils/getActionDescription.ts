import { ActivityActionOptions } from '../../pocketbase-types';

export const getActionDescription = (
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
      return `added a new account (${targetName})`;
    case ActivityActionOptions['DELETE ACCOUNT']:
      return `removed an account (${targetName})`;
    case ActivityActionOptions['DELETE ITEM']:
      return `removed an item (${targetName})`;
    case ActivityActionOptions['EDIT ACCOUNT PASSWORD']:
      return `changed ${targetName}'s password`;
    case ActivityActionOptions['EDIT ACCOUNT USERNAME']:
      return `changed ${targetName}'s username`;
    case ActivityActionOptions['EDIT ACCOUNT ROLE']:
      return `changed ${targetName}'s role`;
    case ActivityActionOptions['EDIT ACCOUNT STATUS']:
      return `changed ${targetName}'s status`;
    case ActivityActionOptions['EDIT LOCATION']:
      return `changed ${targetName}'s location`;
    case ActivityActionOptions['EDIT NAME']:
      return `changed ${targetName}'s name`;
    case ActivityActionOptions['EDIT PROPERTY NUMBER']:
      return `changed ${targetName}'s property number`;
    case ActivityActionOptions['EDIT QUANTITY']:
      return `changed ${targetName}'s quantity`;
    case ActivityActionOptions['EDIT REMARKS']:
      return `changed ${targetName}'s remarks`;
    case ActivityActionOptions['EDIT SUPPLIER']:
      return `changed ${targetName}'s supplier`;
    case ActivityActionOptions['EDIT TYPE']:
      return `changed ${targetName}'s type`;
    case ActivityActionOptions['ADD ITEM IMAGE']:
      return `added images for ${targetName}`;
    case ActivityActionOptions['DELETE ITEM IMAGE']:
      return `deleted an image for ${targetName}`;

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
