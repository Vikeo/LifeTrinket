import { useRef, useState } from 'react';
import { Player, Rotation } from '../../Types/Player';
import styled, { css } from 'styled-components';

const CommanderDamageGrid = styled.div<{ rotation: number }>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;

  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        flex-direction: column;
        height: 100%;
        width: auto;
      `;
    }
  }}
`;

const CommanderDamageContainer = styled.div<{
  rotation: number;
}>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;

  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        flex-direction: column;
      `;
    }
  }}
`;

const CommanderDamageButton = styled.button<{
  backgroundColor?: string;
  rotation: number;
}>`
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
  padding: 0;
  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        width: 10vmin;
        height: auto;
      `;
    }
  }}
`;

const CommanderDamageButtonText = styled.p<{
  rotation: number;
}>`
  position: relative;
  margin: auto;
  font-size: 1.5rem;
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

  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        rotate: 180deg;
        text-orientation: sideways;
        writing-mode: vertical-lr;
        height: 1rem;
        width: auto;
      `;
    }
  }}
`;

const PartnerDamageSeperator = styled.div<{
  rotation: number;
}>`
  width: 1px;
  background-color: rgba(0, 0, 0, 1);

  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        width: auto;
        height: 1px;
      `;
    }
  }}
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
    <CommanderDamageGrid rotation={player.settings.rotation}>
      {opponents.map((opponent, index) => {
        if (!opponent.settings.useCommanderDamage) {
          return null;
        }
        return (
          <CommanderDamageContainer
            key={index}
            rotation={player.settings.rotation}
          >
            <CommanderDamageButton
              key={index}
              rotation={player.settings.rotation}
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
              <CommanderDamageButtonText rotation={player.settings.rotation}>
                {player.commanderDamage[index].damageTotal > 0
                  ? player.commanderDamage[index].damageTotal
                  : ''}
              </CommanderDamageButtonText>
            </CommanderDamageButton>

            {opponent.settings.usePartner && (
              <>
                <PartnerDamageSeperator rotation={player.settings.rotation} />
                <CommanderDamageButton
                  key={index}
                  rotation={player.settings.rotation}
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
                  <CommanderDamageButtonText
                    rotation={player.settings.rotation}
                  >
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
