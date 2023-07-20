export const getUserPath = (id?: number) => {
  switch (id) {
    case 0:
      return 'admin';

    case 1:
      return 'user';

    default:
      return 'unauthorized';
  }
};
