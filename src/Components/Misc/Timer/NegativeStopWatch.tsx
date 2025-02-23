import { useStopwatch } from 'react-timer-hook';
import { TimerStyle, TimerWrapper } from './Timer';
import { Time } from './Time';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

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
          {!isRunning && (
            <button onClick={start}>
              <PlayArrowIcon />
            </button>
          )}
          {isRunning && (
            <button onClick={pause}>
              <PauseIcon />
            </button>
          )}
        </div>
      </TimerStyle>
    </TimerWrapper>
  );
};
