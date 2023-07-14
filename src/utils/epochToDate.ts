const epochToDate = (epoch: number) => {
  const date = new Date(epoch * 1000);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export default epochToDate;
