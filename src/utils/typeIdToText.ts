export const typeIdToText = (id: number) => {
  switch (id) {
    case 0:
      return 'Furniture';
    case 1:
      return 'Office Supply';
    case 2:
      return 'WIP';
    default:
      throw new Error('unknown type id');
  }
};
