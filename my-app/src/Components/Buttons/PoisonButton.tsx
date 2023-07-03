import { useRef, useState } from 'react';
import CommanderTaxIcon from '../../Icons/CommanderTaxIcon';
import PoisonIcon from '../../Icons/PoisonIcon';
import styled from 'styled-components';

export const StyledPoisonButton = styled.button`
  flex-grow: 1;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  user-select: none;
`;

const PoisonButton = () => {
  const [poisonCount, setPoisonCount] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [timeoutFinished, setTimeoutFinished] = useState(false);
  const [hasPressedDown, setHasPressedDown] = useState(false);

  const handlePoisonCountChange = (increment: number) => {
    setPoisonCount(poisonCount + increment);
  };

  const handleDownInput = () => {
    setTimeoutFinished(false);
    setHasPressedDown(true);
    timeoutRef.current = setTimeout(() => {
      setTimeoutFinished(true);
      handlePoisonCountChange(-1);
    }, 500);
  };

  const handleUpInput = () => {
    if (!(hasPressedDown && !timeoutFinished)) {
      return;
    }
    clearTimeout(timeoutRef.current);
    handlePoisonCountChange(1);
    setHasPressedDown(false);
  };

  const handleLeaveInput = () => {
    setTimeoutFinished(true);
    clearTimeout(timeoutRef.current);
    setHasPressedDown(false);
  };

  return (
    <StyledPoisonButton
      onPointerDown={handleDownInput}
      onPointerUp={handleUpInput}
      onPointerLeave={handleLeaveInput}
      onContextMenu={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
      }}
    >
      <PoisonIcon
        size="8vh"
        text={poisonCount ? poisonCount : undefined}
        color=""
      />
    </StyledPoisonButton>
  );
};

export default PoisonButton;
