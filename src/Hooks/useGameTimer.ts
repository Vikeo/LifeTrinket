import { useCallback, useEffect, useRef, useState } from 'react';

export const useGameTimer = (countdownMinutes: number) => {
  const [startedAt, setStartedAt] = useState<number | null>(() => {
    const saved = localStorage.getItem('timerStartedAt');
    return saved ? Number(saved) : null;
  });

  const [accumulatedMs, setAccumulatedMs] = useState<number>(() => {
    const saved = localStorage.getItem('timerAccumulatedMs');
    return saved ? Number(saved) : 0;
  });

  const [isRunning, setIsRunning] = useState<boolean>(() => {
    return localStorage.getItem('timerStartedAt') !== null;
  });

  const [elapsedMs, setElapsedMs] = useState<number>(() => {
    const savedStartedAt = localStorage.getItem('timerStartedAt');
    const savedAccumulated = localStorage.getItem('timerAccumulatedMs');
    const acc = savedAccumulated ? Number(savedAccumulated) : 0;
    if (savedStartedAt) {
      return acc + (Date.now() - Number(savedStartedAt));
    }
    return acc;
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTicking = useCallback(() => {
    clearTimer();
    intervalRef.current = setInterval(() => {
      setElapsedMs(() => {
        const currentStartedAt = Number(
          localStorage.getItem('timerStartedAt') || '0'
        );
        const currentAccumulated = Number(
          localStorage.getItem('timerAccumulatedMs') || '0'
        );
        if (currentStartedAt) {
          return currentAccumulated + (Date.now() - currentStartedAt);
        }
        return currentAccumulated;
      });
    }, 200);
  }, [clearTimer]);

  useEffect(() => {
    if (isRunning) {
      startTicking();
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [isRunning, startTicking, clearTimer]);

  const start = useCallback(() => {
    const now = Date.now();
    setStartedAt(now);
    setAccumulatedMs(0);
    setElapsedMs(0);
    setIsRunning(true);
    localStorage.setItem('timerStartedAt', String(now));
    localStorage.setItem('timerAccumulatedMs', '0');
  }, []);

  const pause = useCallback(() => {
    if (startedAt) {
      const newAccumulated = accumulatedMs + (Date.now() - startedAt);
      setAccumulatedMs(newAccumulated);
      setElapsedMs(newAccumulated);
      setStartedAt(null);
      setIsRunning(false);
      localStorage.removeItem('timerStartedAt');
      localStorage.setItem('timerAccumulatedMs', String(newAccumulated));
    }
  }, [startedAt, accumulatedMs]);

  const resume = useCallback(() => {
    const now = Date.now();
    setStartedAt(now);
    setIsRunning(true);
    localStorage.setItem('timerStartedAt', String(now));
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    setStartedAt(null);
    setAccumulatedMs(0);
    setElapsedMs(0);
    setIsRunning(false);
    localStorage.removeItem('timerStartedAt');
    localStorage.removeItem('timerAccumulatedMs');
  }, [clearTimer]);

  const togglePause = useCallback(() => {
    if (isRunning) {
      pause();
    } else {
      resume();
    }
  }, [isRunning, pause, resume]);

  const totalMs = countdownMinutes * 60000;
  const remainingMs = Math.max(0, totalMs - elapsedMs);
  const progress = Math.min(1, elapsedMs / totalMs);
  const isExpired = remainingMs <= 0 && elapsedMs > 0;

  return {
    remainingMs,
    progress,
    isRunning,
    isExpired,
    togglePause,
    start,
    reset,
  };
};
