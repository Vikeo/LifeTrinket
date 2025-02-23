import { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import { NegativeStopWatch } from './NegativeStopWatch';
import { twc } from 'react-twc';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Time } from './Time';

export const TimerWrapper = twc.div`
absolute z-50 top-0 w-screen flex items-center flex-col 
`;

export const TimerStyle = twc.div`
flex gap-2 bg-interface-recentDifference-background py-1 px-4 rounded-full
`;

const TIMER_MINUTES = 50;

export const Timer = () => {
  // Set the default expiry time to 50 minutes from now.
  const defaultExpiry = new Date();
  defaultExpiry.setMinutes(defaultExpiry.getMinutes() + TIMER_MINUTES);

  const [hasStarted, setHasStarted] = useState(false);

  // Initialize the timer using the useTimer hook.
  const { seconds, minutes, hours, isRunning, start, pause, restart } =
    useTimer({
      expiryTimestamp: defaultExpiry,
      onExpire: () => console.warn('Timer expired'),
      autoStart: false,
    });

  // Function to restart the timer for 50 minutes.
  const handleRestart = () => {
    const time = new Date();
    time.setMinutes(time.getMinutes() + TIMER_MINUTES);
    restart(time);
  };

  const handleStart = () => {
    setHasStarted(true);
    start();
  };

  const handlePause = () => {
    setHasStarted(false);
    pause();
  };

  if (hasStarted && !isRunning) {
    return <NegativeStopWatch autoStart />;
  }

  return (
    <TimerWrapper>
      <TimerStyle>
        <Time
          time={{
            hours,
            minutes,
            seconds,
          }}
        />
        <div>
          {!isRunning && (
            <button onClick={handleStart}>
              <PlayArrowIcon />
            </button>
          )}
          {isRunning && (
            <button onClick={handlePause}>
              <PauseIcon />
            </button>
          )}
          <button onClick={handleRestart}>
            <RestartAltIcon />
          </button>
        </div>
      </TimerStyle>
    </TimerWrapper>
  );
};
