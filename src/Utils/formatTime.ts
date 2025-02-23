export const formatTime = ({
  time,
}: {
  time: { hours: number; minutes: number; seconds: number };
}) => {
  const h = time.hours.toString().padStart(2, '0');
  const m = time.minutes.toString().padStart(2, '0');
  const s = time.seconds.toString().padStart(2, '0');

  if (time.hours > 0) {
    return `${h}:${m}:${s}`;
  } else if (time.minutes > 0) {
    return `${m}:${s}`;
  } else {
    return s;
  }
};
