import { ReactNode, useRef, useState } from 'react';
import { twc } from 'react-twc';
import { decrementTimeoutMs } from '../../Data/constants';
import { CounterType, Rotation } from '../../Types/Player';
import { OutlinedText } from '../Misc/OutlinedText';
import { MAX_TAP_MOVE_DISTANCE, RotationDivProps } from './CommanderDamage';

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

const IconContainer = twc.div<RotationDivProps>((props) => [
  'w-auto',
  props.$rotation === Rotation.SideFlipped || props.$rotation === Rotation.Side
    ? 'rotate-[-90deg]'
    : '',
]);

const TextContainer = twc.div`
  absolute
  top-1/2
  left-1/2
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
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [timeoutFinished, setTimeoutFinished] = useState(false);
  const [hasPressedDown, setHasPressedDown] = useState(false);
  const downPositionRef = useRef({ x: 0, y: 0 });

  const handleCountChange = (increment: number) => {
    if (!counterTotal) {
      setCounterTotal(increment, type);
      return;
    }
    setCounterTotal(counterTotal + increment, type);
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
        <IconContainer $rotation={rotation}>
          {Icon}
          <TextContainer>
            <OutlinedText
              fontSize={fontSize}
              fontWeight={fontWeight}
              strokeWidth={strokeWidth}
            >
              {counterTotal ? counterTotal : undefined}
            </OutlinedText>
          </TextContainer>
        </IconContainer>
      </ExtraCounterButton>
    </ExtraCounterContainer>
  );
};

export default ExtraCounter;
