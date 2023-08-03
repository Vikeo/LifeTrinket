import { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Rotation } from '../../Types/Player';

export const StyledLifeCounterButton = styled.button`
  width: 100%;
  height: 100%;
  color: rgba(0, 0, 0, 0.4);
  font-size: 4rem;
  font-weight: 600;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -ms-user-select: none;
  @media (orientation: landscape) {
    max-width: 50vmin;
    max-height: 50vmax;
  }
`;

const TextContainer = styled.div<{
  align?: string;
  rotation: number;
}>`
  position: relative;

  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      if (props.align === 'right') {
        return css`
          rotate: -90deg;
          bottom: 25%;
        `;
      }
      return css`
        rotate: -90deg;
        top: 25%;
      `;
    }

    if (props.align === 'right') {
      return css`
        left: 25%;
      `;
    }
    return css`
      right: 25%;
    `;
  }}
`;

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

  const longPressMultiplier = 10;

  const handleLifeChange = (increment: number) => {
    setLifeTotal(lifeTotal + increment);
  };

  const handleDownInput = () => {
    setTimeoutFinished(false);
    setHasPressedDown(true);
    timeoutRef.current = setTimeout(() => {
      handleLifeChange(increment * longPressMultiplier);
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

  return (
    <StyledLifeCounterButton
      onPointerDown={handleDownInput}
      onPointerUp={handleUpInput}
      onPointerLeave={handleLeaveInput}
      onContextMenu={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
      }}
    >
      <TextContainer
        rotation={rotation}
        align={operation === 'add' ? 'right' : 'left'}
      >
        {operation === 'add' ? '\u002B' : '\u2212'}
      </TextContainer>
    </StyledLifeCounterButton>
  );
};

export default LifeCounterButton;
