import { useRef, useState } from 'react';
import { lifeLongPressMultiplier } from '../../Data/constants';

import { TwcComponentProps, twc } from 'react-twc';
import { Rotation } from '../../Types/Player';

type RotationButtonProps = TwcComponentProps<'div'> & {
  $align?: string;
  $rotation?: number;
};

const StyledLifeCounterButton = twc.button`
  h-full
  w-full
  flex
  text-lifeCounter-text
  font-semibold
  bg-transparent
  border-none
  outline-none
  cursor-pointer
  justify-center
  items-center
  select-none
  webkit-user-select-none
  `;

const TextContainer = twc.div<RotationButtonProps>((props) => [
  'relative',
  props.$rotation === Rotation.SideFlipped || props.$rotation === Rotation.Side
    ? props.$align === 'right'
      ? '-rotate-90 bottom-1/4 top-auto'
      : '-rotate-90 top-1/4'
    : 'top-auto',
  props.$rotation === Rotation.Flipped || props.$rotation === Rotation.Normal
    ? props.$align === 'right'
      ? 'left-1/4'
      : 'right-1/4'
    : '',
]);

type LifeCounterButtonProps = {
  lifeTotal: number;
  setLifeTotal: (lifeTotal: number) => void;
  rotation: number;
  operation: 'add' | 'subtract';
  increment: number;
};

const LifeCounterButton = ({
  lifeTotal,
  setLifeTotal,
  rotation,
  operation,
  increment,
}: LifeCounterButtonProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [timeoutFinished, setTimeoutFinished] = useState(false);
  const [hasPressedDown, setHasPressedDown] = useState(false);

  const handleLifeChange = (increment: number) => {
    setLifeTotal(lifeTotal + increment);
  };

  const handleDownInput = () => {
    setTimeoutFinished(false);
    setHasPressedDown(true);
    timeoutRef.current = setTimeout(() => {
      handleLifeChange(increment * lifeLongPressMultiplier);
      setTimeoutFinished(true);
    }, 500);
  };

  const handleUpInput = () => {
    if (!(hasPressedDown && !timeoutFinished)) {
      return;
    }
    clearTimeout(timeoutRef.current);
    handleLifeChange(operation === 'add' ? 1 : -1);
    setHasPressedDown(false);
  };

  const handleLeaveInput = () => {
    setTimeoutFinished(true);
    clearTimeout(timeoutRef.current);
    setHasPressedDown(false);
  };

  const fontSize =
    rotation === Rotation.SideFlipped || rotation === Rotation.Side
      ? '8vmax'
      : '12vmin';

  return (
    <StyledLifeCounterButton
      onPointerDown={handleDownInput}
      onPointerUp={handleUpInput}
      onPointerLeave={handleLeaveInput}
      onContextMenu={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
      }}
      style={{ fontSize }}
      aria-label={`${operation === 'add' ? 'Add' : 'Subtract'} life`}
    >
      <TextContainer
        $rotation={rotation}
        $align={operation === 'add' ? 'right' : 'left'}
      >
        {operation === 'add' ? '\u002B' : '\u2212'}
      </TextContainer>
    </StyledLifeCounterButton>
  );
};

export default LifeCounterButton;
