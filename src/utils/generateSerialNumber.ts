export const generateSerialNumber = (currentLength: number) => {
  return (
    new Date().getFullYear().toString() +
    '-' +
    currentLength.toString().padStart(4, '0')
  );
};
