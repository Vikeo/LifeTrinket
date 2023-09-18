import { ReactNode, useRef, useState } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { decrementTimeoutMs } from '../../Data/constants';
import { CounterType, Rotation } from '../../Types/Player';
import { OutlinedText } from '../Misc/OutlinedText';

const ExtraCounterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: all;
  flex-grow: 1;
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
  height: 100%;
`;

const IconContainer = styled.div<{
  $rotation: number;
}>`
  width: auto;

  ${(props) => {
    if (
      props.$rotation === Rotation.SideFlipped ||
      props.$rotation === Rotation.Side
    ) {
      return css`
        rotate: -90deg;
      `;
    }
  }}
`;

const TextContainer = styled.div`
  position: absolute;
  translate: -50%;
  top: 50%;
  left: 50%;
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
