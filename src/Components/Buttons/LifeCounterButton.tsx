import { useEffect, useRef, useState } from 'react';
import { TwcComponentProps, twc } from 'react-twc';
import { lifeLongPressMultiplier } from '../../Data/constants';
import { Player, Rotation } from '../../Types/Player';
import { MAX_TAP_MOVE_DISTANCE } from './CommanderDamage';
import { checkContrast } from '../../Utils/checkContrast';

type RotationButtonProps = TwcComponentProps<'div'> & {
  $align?: string;
  $rotation?: number;
};

const LifeCounterButtonTwc = twc.button`
  h-full
  w-full
  flex
  font-semibold
  bg-transparent
  border-none
  outline-none
  cursor-pointer
  justify-center
  items-center
  select-none
  webkit-user-select-none
  opacity-50
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
  player: Player;
  setLifeTotal: (lifeTotal: number) => void;
  operation: 'add' | 'subtract';
  increment: number;
};

const LifeCounterButton = ({
  player,
  setLifeTotal,
  operation,
  increment,
}: LifeCounterButtonProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [timeoutFinished, setTimeoutFinished] = useState(false);
  const [hasPressedDown, setHasPressedDown] = useState(false);
  const downPositionRef = useRef({ x: 0, y: 0 });

  const [iconColor, setIconColor] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const contrast = checkContrast(player.color, '#00000080');

    if (contrast === 'Fail') {
      setIconColor('light');
    } else {
      setIconColor('dark');
    }
  }, [player.color]);

  const handleLifeChange = (increment: number) => {
    setLifeTotal(player.lifeTotal + increment);
  };

  const handleDownInput = (event: React.PointerEvent<HTMLButtonElement>) => {
    downPositionRef.current = { x: event.clientX, y: event.clientY };
    setTimeoutFinished(false);
    setHasPressedDown(true);
    timeoutRef.current = setTimeout(() => {
      handleLifeChange(increment * lifeLongPressMultiplier);
      setTimeoutFinished(true);
    }, 500);
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
    handleLifeChange(operation === 'add' ? 1 : -1);
    setHasPressedDown(false);
  };

  const handleLeaveInput = () => {
    setTimeoutFinished(true);
    clearTimeout(timeoutRef.current);
    setHasPressedDown(false);
  };

  const fontSize =
    player.settings.rotation === Rotation.SideFlipped ||
    player.settings.rotation === Rotation.Side
      ? '8vmax'
      : '12vmin';

  return (
    <LifeCounterButtonTwc
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
        $rotation={player.settings.rotation}
        $align={operation === 'add' ? 'right' : 'left'}
        data-contrast={iconColor}
        className="data-[contrast=dark]:text-icons-dark
        data-[contrast=light]:text-icons-light"
      >
        {operation === 'add' ? '\u002B' : '\u2212'}
      </TextContainer>
    </LifeCounterButtonTwc>
  );
};

export default LifeCounterButton;
