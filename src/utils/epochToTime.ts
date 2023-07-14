const epochToTime = (epoch: number) => {
  const date = new Date(epoch * 1000);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  // const twoDigitSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  if (hours === 0) {
    hours = 12;
  }

  const hh = numberToTwoDigit(hours);
  const mm = numberToTwoDigit(minutes);
  const ss = numberToTwoDigit(seconds);

  return `${hh}:${mm}:${ss} ${amPm}`;
};

export default epochToTime;

const numberToTwoDigit = (number: number) => {
  if (number < 10) {
    return `0${number}`;
  } else {
    return number;
  }
};
