import { ReactNode, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { CounterType, Rotation } from '../../Types/Player';
import { OutlinedText } from '../Text/OutlinedText';

const ExtraCounterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: all;
`;

export const StyledExtraCounterButton = styled.button`
  position: relative;
  flex-grow: 1;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

export const CenteredText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 6vmin;
  font-weight: bold;
  -webkit-text-stroke: 0.4vmin #ffffff;
  -webkit-text-fill-color: #000000;
  color: #b5b2b2;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const CenteredTextOutline = styled.span`
  position: absolute;
  left: 0;
  -webkit-text-stroke: 0;
  pointer-events: none;
`;

const IconContainer = styled.div<{
  rotation: number;
}>`
  width: auto;

  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        rotate: -90deg;
      `;
    }
  }}
`;

type ExtraCounterProps = {
  Icon: ReactNode;
  counterTotal?: number;
  type: CounterType;
  setCounterTotal: (updatedCounterTotal: number, type: CounterType) => void;
  rotation: number;
};

const ExtraCounter = ({
  Icon,
  counterTotal,
  setCounterTotal,
  type,
  rotation,
}: ExtraCounterProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [timeoutFinished, setTimeoutFinished] = useState(false);
  const [hasPressedDown, setHasPressedDown] = useState(false);

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
    }, 500);
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

  return (
    <ExtraCounterContainer>
      <StyledExtraCounterButton
        onPointerDown={handleDownInput}
        onPointerUp={handleUpInput}
        onPointerLeave={handleLeaveInput}
        onContextMenu={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();
        }}
      >
        <IconContainer rotation={rotation}>
          {Icon}
          <OutlinedText
            fontSize="6vmin"
            fontWeight="bold"
            strokeWidth="0.6vmin"
          >
            {counterTotal ? counterTotal : undefined}
          </OutlinedText>
        </IconContainer>
      </StyledExtraCounterButton>
    </ExtraCounterContainer>
  );
};

export default ExtraCounter;
