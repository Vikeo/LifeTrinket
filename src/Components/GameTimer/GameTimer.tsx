import { useEffect, useRef, useState } from 'react';
import { useGameTimer } from '../../Hooks/useGameTimer';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';

const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
};

const getBarColor = (progress: number): string => {
  // Green (120) → Yellow (60) → Red (0)
  const hue = Math.round(120 * (1 - progress));
  return `hsl(${hue}, 85%, 45%)`;
};

export const GameTimer = () => {
  const { settings, playing } = useGlobalSettings();
  const { remainingMs, progress, isRunning, isExpired, togglePause, start } =
    useGameTimer(settings.countdownMinutes);

  const [dismissed, setDismissed] = useState(false);

  // Auto-start when game starts playing
  const hasStartedRef = useRef(false);
  useEffect(() => {
    if (playing && !hasStartedRef.current && !isRunning && progress === 0) {
      start();
      hasStartedRef.current = true;
    }
  }, [playing, isRunning, progress, start]);

  if (!settings.showTimer) return null;

  // "Time's Up" overlay — tap to dismiss to badge
  if (isExpired && !dismissed) {
    return (
      <button
        onClick={() => setDismissed(true)}
        className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-auto"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-red-500 text-3xl font-bold drop-shadow-lg">
            Time's Up!
          </span>
          <span className="text-white/80 text-sm text-center px-8 max-w-xs leading-relaxed">
            The active player finishes their turn, then 5 extra turns are
            played. If no winner after extra turns, most game wins takes the
            match.
          </span>
          <span className="text-white/50 text-xs mt-1">Tap to dismiss</span>
        </div>
      </button>
    );
  }

  // "Time's Up" badge — small badge at top-center after dismissal
  if (isExpired && dismissed) {
    return (
      <div className="absolute top-0 right-2 z-10 pointer-events-none">
        <div className="bg-red-600/80 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-b-md">
          Time's Up
        </div>
      </div>
    );
  }

  // Progress bar — thin bar at top of screen
  return (
    <button
      onClick={togglePause}
      className="absolute top-0 left-0 right-0 z-10 pointer-events-auto h-2 group"
      aria-label={isRunning ? 'Pause timer' : 'Resume timer'}
    >
      {/* Background track */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Fill */}
      <div
        className="absolute top-0 left-0 bottom-0 transition-all duration-200 ease-linear"
        style={{
          width: `${progress * 100}%`,
          backgroundColor: getBarColor(progress),
        }}
      />

      {/* Time label — visible on hover/tap area, always discreet */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 mt-0.5
          bg-black/60 rounded-full px-2 py-0.5 text-[10px] font-mono text-white/90
          opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
          ${!isRunning ? 'opacity-100 animate-pulse' : ''}
        `}
      >
        {formatTime(remainingMs)}
        {!isRunning && (
          <span className="ml-1 uppercase tracking-wider text-[8px] opacity-75">
            Paused
          </span>
        )}
      </div>
    </button>
  );
};
