import { useEffect, useRef, useState } from 'react';
import { useGlobalSettings } from '../../../Hooks/useGlobalSettings';
import { usePlayers } from '../../../Hooks/usePlayers';

type TouchPoint = {
  x: number;
  y: number;
  id: number;
};

const getOrientation = () => {
  return window.matchMedia('(orientation: portrait)').matches
    ? 'portrait'
    : 'landscape';
};

export const FingerGame = () => {
  const { players } = usePlayers();

  const aboutToStartTimerRef = useRef<NodeJS.Timeout | null>(null);
  const selectingPlayerTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [touchPoints, setTouchPoints] = useState<TouchPoint[]>([]);
  const [selectedTouchPoint, setSelectedTouchPoint] = useState<
    TouchPoint | undefined
  >();
  const [timerStarted, setTimerStarted] = useState(false);

  const { setPlaying, goToStart } = useGlobalSettings();

  useEffect(() => {
    //Start playing when someone is selected and any touch point is released
    if (selectedTouchPoint && touchPoints.length !== players.length) {
      aboutToStartTimerRef.current = setTimeout(() => {
        setSelectedTouchPoint(undefined);
        setPlaying(true);
      }, 500);

      setTimerStarted(true);
      return;
    }

    // If no touch point is selected, select one with a delay
    if (touchPoints.length === players.length && !selectedTouchPoint) {
      selectingPlayerTimerRef.current = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * touchPoints.length);
        const randomTouchPoint = touchPoints[randomIndex];
        setSelectedTouchPoint(randomTouchPoint);
      }, 250);
      return;
    }

    if (selectingPlayerTimerRef.current) {
      clearTimeout(selectingPlayerTimerRef.current);
    }

    return () => {
      if (aboutToStartTimerRef.current) {
        clearTimeout(aboutToStartTimerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touchPoints, players.length]);

  const handleOnTouchStart = (e: React.TouchEvent) => {
    if (selectedTouchPoint) {
      return;
    }
    //Get the first touch point id that isn't already in the touchPoints array
    const touch = Array.from(e.changedTouches).find(
      (t) => !touchPoints.find((p) => p.id === t.identifier)
    );

    if (!touch) {
      console.error('No touch found');
      return;
    }

    let { clientX, clientY } = touch;

    // Adjust coordinates for portrait mode
    if (getOrientation() === 'portrait') {
      const tempX = clientX;
      clientX = clientY;
      clientY = window.innerWidth - tempX;
    }

    const newTouchPoints = {
      x: clientX,
      y: clientY,
      id: touch.identifier,
    };

    setTouchPoints([...touchPoints, newTouchPoints]);
  };

  const handleOnTouchEnd = (e: React.TouchEvent) => {
    if (selectedTouchPoint) {
      aboutToStartTimerRef.current = setTimeout(() => {
        setSelectedTouchPoint(undefined);
        setPlaying(true);
      }, 500);
      setTimerStarted(true);
      return;
    }

    // Get the touch point that was just released
    const touch = e.changedTouches[e.changedTouches.length - 1];

    // Get the index of the touch point that was just released
    const index = touchPoints.findIndex((p) => p.id === touch.identifier);

    // Remove the touch point that was just released
    setTouchPoints([
      ...touchPoints.slice(0, index),
      ...touchPoints.slice(index + 1),
    ]);
  };

  return (
    <div
      className="absolute flex justify-center items-center w-full h-full portrait:h-[100dvw] portrait:w-[100dvh] z-50 bg-secondary-main overflow-hidden"
      onTouchStart={handleOnTouchStart}
      onTouchEnd={handleOnTouchEnd}

      // FIXEME: This code is not performant, but updates a touch point's position when it moves
      // onTouchMove={(e) => {
      //   e.preventDefault();

      //   // Get the touch point that was just moved
      //   const touch = Array.from(e.changedTouches).find((t) =>
      //     touchPoints.find((p) => p.id === t.identifier)
      //   );

      //   if (!touch) {
      //     console.error('No touch found');
      //     return;
      //   }

      //   let { clientX, clientY } = touch;

      //   // Adjust coordinates for portrait mode
      //   if (getOrientation() === 'portrait') {
      //     const tempX = clientX;
      //     clientX = clientY;
      //     clientY = window.innerWidth - tempX;
      //   }

      //   // Get the index of the touch point that was just moved
      //   const index = touchPoints.findIndex(
      //     (p) => p.id === touch.identifier
      //   );

      //   // Update the touch point that was just moved
      //   setTouchPoints([
      //     ...touchPoints.slice(0, index),
      //     { x: clientX, y: clientY, id: touch.identifier },
      //     ...touchPoints.slice(index + 1),
      //   ]);
      // }}
    >
      <button
        className="absolute flex top-4 left-4 rounded-lg px-2 py-1 justify-center bg-primary-main text-text-primary text-xs"
        onClick={goToStart}
      >
        <div className="text-xl leading-4">{'<'}&nbsp;</div>
        Back
      </button>
      {touchPoints.length !== players.length && (
        <div className="flex flex-col items-center text-[13vmin] whitespace-nowrap pointer-events-none webkit-user-select-none">
          Waiting for fingers <br />
          <div className="tabular-nums">
            {touchPoints.length}/{players.length}
          </div>
        </div>
      )}

      {touchPoints.map((point, index) => (
        <div
          key={`touch-point-${index}`}
          data-is-selected={selectedTouchPoint?.id === point.id}
          data-unloading={timerStarted}
          className="absolute rounded-full translate-x-[-50%] translate-y-[-50%] transition-all duration-1000
              h-[75px] w-[75px]
              data-[unloading=false]:data-[is-selected=true]:h-[250px] data-[unloading=false]:data-[is-selected=true]:w-[250px]
              data-[unloading=true]:h-[0px] data-[unloading=true]:w-[0px] data-[unloading=true]:duration-[400ms]
              pointer-events-none
              "
          style={{
            left: point.x,
            top: point.y,
            backgroundColor: players[index]?.color ?? 'red',
          }}
        />
      ))}
    </div>
  );
};
