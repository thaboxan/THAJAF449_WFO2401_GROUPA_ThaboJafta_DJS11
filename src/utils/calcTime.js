export const calcTime = (secs) => {
  const mins = Math.floor(secs / 60);
  const returnedMin = mins < 10 ? `0${mins}` : `${mins}`;

  const seconds = Math.floor(secs % 60);
  const returnedSecs = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${returnedMin}:${returnedSecs}`;
};
