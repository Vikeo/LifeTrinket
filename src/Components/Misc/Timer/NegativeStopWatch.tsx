import { useStopwatch } from 'react-timer-hook';
import { TimerStyle, TimerWrapper } from './Timer';
import { Time } from './Time';

export const NegativeStopWatch = ({
  autoStart = false,
}: {
  autoStart?: boolean;
}) => {
  // Initialize the timer using the useTimer hook.
  const { seconds, minutes, hours, isRunning, start, pause } = useStopwatch({
    autoStart,
  });

  return (
    <TimerWrapper>
      <TimerStyle>
        {'-'}
        <Time time={{ hours, minutes, seconds }} />
        <div>
          {/* Only show Start if the timer is not running */}
          {!isRunning && <button onClick={start}>Start</button>}
          {isRunning && <button onClick={pause}>Pause</button>}
        </div>
      </TimerStyle>
    </TimerWrapper>
  );
};
