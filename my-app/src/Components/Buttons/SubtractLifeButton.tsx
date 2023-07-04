import { useRef, useState } from 'react';
import styled from 'styled-components';

export const StyledLifeCounterButton = styled.button<{ align?: string }>`
  width: 50%;
  height: auto;
  color: rgba(0, 0, 0, 0.4);
  font-size: 4rem;
  font-weight: 600;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0 28px;
  text-align: ${(props) => props.align || 'center'};
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

type SubtractLifeButtonProps = {
  lifeTotal: number;
  setLifeTotal: (lifeTotal: number) => void;
};

const SubtractLifeButton = ({
  lifeTotal,
  setLifeTotal,
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
      align="left"
    >
      &#8722;
    </StyledLifeCounterButton>
  );
};

export default SubtractLifeButton;
