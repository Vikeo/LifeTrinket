import { ReactNode, useRef, useState } from 'react';
import { decrementTimeoutMs } from '../../Data/constants';
import { CounterType, Rotation } from '../../Types/Player';
import { OutlinedText } from '../Misc/OutlinedText';
import { twc } from 'react-twc';
import { RotationDivProps } from './CommanderDamage';

const ExtraCounterContainer = twc.div`
  flex
  justify-center
  items-center
  pointer-events-all
  flex-grow
`;

const StyledExtraCounterButton = twc.button`
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
  playerIndex: number;
};

const ExtraCounter = ({
  Icon,
  counterTotal,
  setCounterTotal,
  type,
  rotation,
  playerIndex,
}: ExtraCounterProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [timeoutFinished, setTimeoutFinished] = useState(false);
  const [hasPressedDown, setHasPressedDown] = useState(false);

  const isSide =
    rotation === Rotation.Side || rotation === Rotation.SideFlipped;

  const handleCountChange = (increment: number) => {
    if (!counterTotal) {
      setCounterTotal(increment, type);
      return;
    }
    setCounterTotal(counterTotal + increment, type);
  };

  const handleDownInput = () => {
    setTimeoutFinished(false);
    setHasPressedDown(true);
    timeoutRef.current = setTimeout(() => {
      setTimeoutFinished(true);
      handleCountChange(-1);
    }, decrementTimeoutMs);
  };

  const handleUpInput = () => {
    if (!(hasPressedDown && !timeoutFinished)) {
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
      <StyledExtraCounterButton
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
      </StyledExtraCounterButton>
    </ExtraCounterContainer>
  );
};

export default ExtraCounter;
