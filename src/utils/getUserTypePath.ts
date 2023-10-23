import { UserTypeOptions } from '../../pocketbase-types';

export const getUserTypePath = (type: UserTypeOptions) => {
  switch (type) {
    case UserTypeOptions.ADMIN:
      return '/admin';
    case UserTypeOptions.STAFF:
      return '/staff';
    case UserTypeOptions.OFFICE:
      return '/office';
    case UserTypeOptions.OFFICER:
      return '/officer';

    default:
      console.error('unknown user type');
      return '';
  }
};
