export const formatText = (str: string = "") =>
  str
    .toLowerCase()
    .split(/[^a-z]/)
    .join(" ")
    .split(/\s{2,}/)
    .join(" ");

export const secondsToHMS = function (number = 10, isTwoDigit = false) {
  //format to a readable friendly timer
  let hour: string | number = Math.floor(number / 3600);
  let minute: string | number = Math.floor((number % 3600) / 60);
  let second: string | number = number % 60;
  if (isTwoDigit && hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (second < 10) {
    second = `0${second}`;
  }
  return `${hour}:${minute}:${second}`;
};
