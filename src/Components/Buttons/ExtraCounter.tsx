import { ReactNode, useEffect, useRef, useState } from 'react';
import { twc } from 'react-twc';
import { decrementTimeoutMs } from '../../Data/constants';
import { useAnalytics } from '../../Hooks/useAnalytics';
import { useMetrics } from '../../Hooks/useMetrics';
import { useUserActions } from '../../Hooks/useUserActions';
import { CounterType, Rotation } from '../../Types/Player';
import { OutlinedText } from '../Misc/OutlinedText';
import { MAX_TAP_MOVE_DISTANCE } from './CommanderDamage';

const EXTRA_COUNTER_DEBOUNCE = 2_000;

const ExtraCounterContainer = twc.div`
  flex
  justify-center
  items-center
  pointer-events-all
  flex-grow
`;

const ExtraCounterButton = twc.button`
  flex
  justify-center
  items-center
  relative
  flex-grow
  border-none
  outline-none
  cursor-pointer
  bg-transparent
  select-none
  h-full
  webkit-user-select-none
  `;

const IconContainer = twc.div`
  w-auto opacity-50 data-[rotation-is-side=true]:-rotate-90`;

const TextContainer = twc.div`
  absolute
  top-1/2
  left-1/2 
  data-[rotation-is-side=true]:-rotate-90
  `;

type ExtraCounterProps = {
  Icon: ReactNode;
  counterTotal?: number;
  type: CounterType;
  setCounterTotal: (updatedCounterTotal: number, type: CounterType) => void;
  rotation: number;
  isSide: boolean;
  playerIndex: number;
};

const ExtraCounter = ({
  Icon,
  counterTotal,
  setCounterTotal,
  type,
  rotation,
  isSide,
  playerIndex,
}: ExtraCounterProps) => {
  const analytics = useAnalytics();
  const metrics = useMetrics();
  const userActions = useUserActions();
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const counterTrackingTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [timeoutFinished, setTimeoutFinished] = useState(false);
  const [hasPressedDown, setHasPressedDown] = useState(false);
  const [recentCounterChange, setRecentCounterChange] = useState(0);
  const downPositionRef = useRef({ x: 0, y: 0 });

  // Track extra counter changes with debouncing
  useEffect(() => {
    if (recentCounterChange === 0) {
      clearTimeout(counterTrackingTimerRef.current);
      return;
    }

    counterTrackingTimerRef.current = setTimeout(() => {
      if (recentCounterChange > 0) {
        // Start user action first to capture measurements within its context
        userActions.trackCounterChangeAction(type, recentCounterChange, playerIndex);

        // Then push measurement and event (these will be associated with the user action)
        analytics.trackEvent('extra_counter_increased', {
          amount: recentCounterChange,
          counterType: type,
        });
        metrics.trackExtraCounterChange(recentCounterChange, type, 'increased');
      } else if (recentCounterChange < 0) {
        // Start user action first to capture measurements within its context
        userActions.trackCounterChangeAction(type, recentCounterChange, playerIndex);

        // Then push measurement and event (these will be associated with the user action)
        analytics.trackEvent('extra_counter_decreased', {
          amount: Math.abs(recentCounterChange),
          counterType: type,
        });
        metrics.trackExtraCounterChange(Math.abs(recentCounterChange), type, 'decreased');
      }
      setRecentCounterChange(0);
    }, EXTRA_COUNTER_DEBOUNCE);

    return () => {
      clearTimeout(counterTrackingTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentCounterChange, type]);

  const handleCountChange = (increment: number) => {
    if (!counterTotal) {
      setCounterTotal(increment, type);
      setRecentCounterChange(recentCounterChange + increment);
      return;
    }
    setCounterTotal(counterTotal + increment, type);
    setRecentCounterChange(recentCounterChange + increment);
  };

  const handleDownInput = (event: React.PointerEvent<HTMLButtonElement>) => {
    downPositionRef.current = { x: event.clientX, y: event.clientY };
    setTimeoutFinished(false);
    setHasPressedDown(true);
    timeoutRef.current = setTimeout(() => {
      setTimeoutFinished(true);
      handleCountChange(-1);
    }, decrementTimeoutMs);
  };

  const handleUpInput = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!(hasPressedDown && !timeoutFinished)) {
      return;
    }

    const upPosition = { x: event.clientX, y: event.clientY };

    const hasMoved =
      Math.abs(upPosition.x - downPositionRef.current.x) >
        MAX_TAP_MOVE_DISTANCE ||
      Math.abs(upPosition.y - downPositionRef.current.y) >
        MAX_TAP_MOVE_DISTANCE;

    if (hasMoved) {
      return;
    }

    clearTimeout(timeoutRef.current);
    handleCountChange(1);
    setHasPressedDown(false);
  };

  const handleLeaveInput = () => {
    setTimeoutFinished(true);
    clearTimeout(timeoutRef.current);
    setHasPressedDown(false);
  };

  const fontSize = isSide ? '4vmax' : '7vmin';
  const fontWeight = 'bold';
  const strokeWidth = isSide ? '0.4vmax' : '0.7vmin';

  const rotationIsSide =
    rotation === Rotation.SideFlipped || rotation === Rotation.Side;

  return (
    <ExtraCounterContainer>
      <ExtraCounterButton
        onPointerDown={handleDownInput}
        onPointerUp={handleUpInput}
        onPointerLeave={handleLeaveInput}
        onContextMenu={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();
        }}
        aria-label={`Player ${playerIndex} extra counter: ${type}`}
      >
        <IconContainer data-rotation-is-side={rotationIsSide}>
          {Icon}
        </IconContainer>
        <TextContainer data-rotation-is-side={rotationIsSide}>
          <OutlinedText
            fontSize={fontSize}
            fontWeight={fontWeight}
            strokeWidth={strokeWidth}
          >
            {counterTotal ? counterTotal : undefined}
          </OutlinedText>
        </TextContainer>
      </ExtraCounterButton>
    </ExtraCounterContainer>
  );
};

export default ExtraCounter;
