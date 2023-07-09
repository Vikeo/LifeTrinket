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
  padding: 0 28px;
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
  text-align: ${(props) => props.align || 'center'};
  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        rotate: -90deg;
        width: auto;
        padding: 28px 0;
        justify-content: space-between;
      `;
    }
  }}
`;

type SubtractLifeButtonProps = {
  lifeTotal: number;
  setLifeTotal: (lifeTotal: number) => void;
  rotation: number;
};

const SubtractLifeButton = ({
  lifeTotal,
  setLifeTotal,
  rotation,
}: SubtractLifeButtonProps) => {
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
      handleLifeChange(-10);
      setTimeoutFinished(true);
    }, 500);
  };

  const handleUpInput = () => {
    if (!(hasPressedDown && !timeoutFinished)) {
      return;
    }
    clearTimeout(timeoutRef.current);
    handleLifeChange(-1);
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
      <TextContainer align="left" rotation={rotation}>
        &#8722;
      </TextContainer>
    </StyledLifeCounterButton>
  );
};

export default SubtractLifeButton;
