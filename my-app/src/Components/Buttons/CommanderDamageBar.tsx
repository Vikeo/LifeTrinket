import { useRef, useState } from 'react';
import { Player } from '../../Types/Player';
import styled from 'styled-components';

const CommanderDamageGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
`;

const CommanderDamageContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
`;

const CommanderDamageButton = styled.button<{ backgroundColor?: string }>`
  display: flex;
  flex-grow: 1;
  border: none;
  height: 10vmin;
  outline: none;
  cursor: pointer;
  background-color: ${(props) => props.backgroundColor || 'antiquewhite'};
  margin: 0;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const CommanderDamageButtonText = styled.p`
  position: relative;
  margin: auto;
  font-size: 1.5rem;
  text-align: center;
  text-size-adjust: auto;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
  width: 1rem;
  text-shadow: -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff,
    1px 1px 0 #ffffff;
  color: #000000;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const VerticalSeperator = styled.div`
  width: 1px;
  background-color: rgba(0, 0, 0, 1);
`;

type CommanderDamageBarProps = {
  lifeTotal: number;
  opponents: Player[];
  player: Player;
  onPlayerChange: (updatedPlayer: Player) => void;
  setLifeTotal: (lifeTotal: number) => void;
};

const CommanderDamageBar = ({
  opponents,
  lifeTotal,
  player,
  onPlayerChange,
  setLifeTotal,
}: CommanderDamageBarProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [timeoutFinished, setTimeoutFinished] = useState(false);
  const [hasPressedDown, setHasPressedDown] = useState(false);

  const handleCommanderDamageChange = (
    index: number,
    increment: number,
    isPartner: boolean
  ) => {
    const currentCommanderDamage = player.commanderDamage[index];
    if (isPartner) {
      if (currentCommanderDamage.partnerDamageTotal === 0 && increment === -1) {
        return;
      }

      const updatedCommanderDamage = [...player.commanderDamage];
      updatedCommanderDamage[index].partnerDamageTotal += increment;

      const updatedPlayer = {
        ...player,
        commanderDamage: updatedCommanderDamage,
      };
      onPlayerChange(updatedPlayer);
      setLifeTotal(lifeTotal - increment);
      return;
    }
    if (currentCommanderDamage.damageTotal === 0 && increment === -1) {
      return;
    }

    const updatedCommanderDamage = [...player.commanderDamage];
    updatedCommanderDamage[index].damageTotal += increment;

    const updatedPlayer = {
      ...player,
      commanderDamage: updatedCommanderDamage,
    };
    onPlayerChange(updatedPlayer);
    setLifeTotal(lifeTotal - increment);
  };

  const handleDownInput = (index: number) => {
    setTimeoutFinished(false);
    setHasPressedDown(true);
    timeoutRef.current = setTimeout(() => {
      setTimeoutFinished(true);
      handleCommanderDamageChange(index, -1, false);
    }, 500);
  };

  const handleUpInput = (index: number) => {
    if (!(hasPressedDown && !timeoutFinished)) {
      return;
    }
    clearTimeout(timeoutRef.current);
    handleCommanderDamageChange(index, 1, false);
    setHasPressedDown(false);
  };

  const handleLeaveInput = () => {
    setTimeoutFinished(true);
    clearTimeout(timeoutRef.current);
    setHasPressedDown(false);
  };

  const handlePartnerDownInput = (index: number) => {
    setTimeoutFinished(false);
    setHasPressedDown(true);
    timeoutRef.current = setTimeout(() => {
      setTimeoutFinished(true);
      handleCommanderDamageChange(index, -1, true);
    }, 500);
  };

  const handlePartnerUpInput = (index: number) => {
    if (!(hasPressedDown && !timeoutFinished)) {
      return;
    }
    clearTimeout(timeoutRef.current);
    handleCommanderDamageChange(index, 1, true);
    setHasPressedDown(false);
  };

  const handlePartnerLeaveInput = () => {
    setTimeoutFinished(true);
    clearTimeout(timeoutRef.current);
    setHasPressedDown(false);
  };

  return (
    <CommanderDamageGrid>
      {opponents.map((opponent, index) => {
        if (!opponent.settings.useCommanderDamage) {
          return null;
        }
        return (
          <CommanderDamageContainer key={index}>
            <CommanderDamageButton
              key={index}
              onPointerDown={() => handleDownInput(index)}
              onPointerUp={() => handleUpInput(index)}
              onPointerLeave={handleLeaveInput}
              onContextMenu={(
                e: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ) => {
                e.preventDefault();
              }}
              backgroundColor={opponent.color}
            >
              <CommanderDamageButtonText>
                {player.commanderDamage[index].damageTotal > 0
                  ? player.commanderDamage[index].damageTotal
                  : ''}
              </CommanderDamageButtonText>
            </CommanderDamageButton>

            {opponent.settings.usePartner && (
              <>
                <VerticalSeperator />
                <CommanderDamageButton
                  key={index}
                  onPointerDown={() => handlePartnerDownInput(index)}
                  onPointerUp={() => handlePartnerUpInput(index)}
                  onPointerLeave={handlePartnerLeaveInput}
                  onContextMenu={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => {
                    e.preventDefault();
                  }}
                  backgroundColor={opponent.color}
                >
                  <CommanderDamageButtonText>
                    {player.commanderDamage[index].partnerDamageTotal > 0
                      ? player.commanderDamage[index].partnerDamageTotal
                      : ''}
                  </CommanderDamageButtonText>
                </CommanderDamageButton>
              </>
            )}
          </CommanderDamageContainer>
        );
      })}
    </CommanderDamageGrid>
  );
};

export default CommanderDamageBar;
