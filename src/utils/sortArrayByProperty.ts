export type SortOrder = 'asc' | 'desc';

export const sortArrayByProperty = <T>(
  arr: T[],
  prop: keyof T,
  order: SortOrder
): T[] => {
  return arr.slice().sort((a, b) => {
    if (order === 'asc') {
      if (a[prop] < b[prop]) return -1;
      if (a[prop] > b[prop]) return 1;
      return 0;
    } else {
      if (a[prop] > b[prop]) return -1;
      if (a[prop] < b[prop]) return 1;
      return 0;
    }
  });
};
