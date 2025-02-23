import { formatTime } from '../../../Utils/formatTime';

export const Time = ({
  time,
}: {
  time: { hours: number; minutes: number; seconds: number };
}) => {
  return <div className="tabular-nums">{formatTime({ time })}</div>;
};
