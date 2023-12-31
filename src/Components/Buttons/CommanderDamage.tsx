import styled from 'styled-components';
import { css } from 'styled-components';
import { Player, Rotation } from '../../Types/Player';
import { useRef, useState } from 'react';
import { OutlinedText } from '../Misc/OutlinedText';
import { decrementTimeoutMs } from '../../Data/constants';
import { usePlayers } from '../../Hooks/usePlayers';

const CommanderDamageContainer = styled.div<{
  $rotation: number;
}>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;

  ${(props) => {
    if (
      props.$rotation === Rotation.SideFlipped ||
      props.$rotation === Rotation.Side
    ) {
      return css`
        flex-direction: column;
      `;
    }
  }}
`;

const CommanderDamageButton = styled.button<{
  $backgroundColor?: string;
  $rotation: number;
}>`
  display: flex;
  flex-grow: 1;
  border: none;
  height: 10vmin;
  width: 50%;
  outline: none;
  cursor: pointer;
  background-color: ${(props) => props.$backgroundColor || 'antiquewhite'};
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
      props.$rotation === Rotation.SideFlipped ||
      props.$rotation === Rotation.Side
    ) {
      return css`
        width: 6vmax;
        height: auto;
      `;
    }
  }}
`;

const CommanderDamageTextContainer = styled.div<{
  $rotation: number;
}>`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-variant-numeric: tabular-nums;
  pointer-events: none;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -ms-user-select: none;

  ${(props) => {
    if (
      props.$rotation === Rotation.SideFlipped ||
      props.$rotation === Rotation.Side
    ) {
      return css`
        rotate: 270deg;
      `;
    }
  }}
`;

const PartnerDamageSeperator = styled.div<{
  $rotation: number;
}>`
  width: 1px;
  background-color: rgba(0, 0, 0, 1);

  ${(props) => {
    if (
      props.$rotation === Rotation.SideFlipped ||
      props.$rotation === Rotation.Side
    ) {
      return css`
        width: auto;
        height: 1px;
      `;
    }
  }}
`;

type CommanderDamageButtonComponentProps = {
  player: Player;
  opponent: Player;
  handleLifeChange: (updatedLifeTotal: number) => void;
};

type InputProps = {
  opponentIndex: number;
  isPartner: boolean;
};

export const CommanderDamage = ({
  player,
  opponent,
  handleLifeChange,
}: CommanderDamageButtonComponentProps) => {
  const { updatePlayer } = usePlayers();
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [timeoutFinished, setTimeoutFinished] = useState(false);
  const [hasPressedDown, setHasPressedDown] = useState(false);

  const isSide =
    player.settings.rotation === Rotation.Side ||
    player.settings.rotation === Rotation.SideFlipped;

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
      updatePlayer(updatedPlayer);
      handleLifeChange(player.lifeTotal - increment);
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
    updatePlayer(updatedPlayer);
    handleLifeChange(player.lifeTotal - increment);
  };

  const handleDownInput = ({ opponentIndex, isPartner }: InputProps) => {
    setTimeoutFinished(false);
    setHasPressedDown(true);
    timeoutRef.current = setTimeout(() => {
      setTimeoutFinished(true);
      handleCommanderDamageChange(opponentIndex, -1, isPartner);
    }, decrementTimeoutMs);
  };

  const handleUpInput = ({ opponentIndex, isPartner }: InputProps) => {
    if (!(hasPressedDown && !timeoutFinished)) {
      return;
    }
    clearTimeout(timeoutRef.current);
    handleCommanderDamageChange(opponentIndex, 1, isPartner);
    setHasPressedDown(false);
  };

  const handleLeaveInput = () => {
    setTimeoutFinished(true);
    clearTimeout(timeoutRef.current);
    setHasPressedDown(false);
  };

  const opponentIndex = opponent.index;
  const fontSize = isSide ? '4vmax' : '7vmin';
  const fontWeight = 'bold';
  const strokeWidth = isSide ? '0.4vmax' : '0.7vmin';

  return (
    <CommanderDamageContainer
      key={opponentIndex}
      $rotation={player.settings.rotation}
      aria-label={`Commander damage bar ${player.index}`}
    >
      <CommanderDamageButton
        key={opponentIndex}
        $rotation={player.settings.rotation}
        onPointerDown={() =>
          handleDownInput({ opponentIndex, isPartner: false })
        }
        onPointerUp={() => handleUpInput({ opponentIndex, isPartner: false })}
        onPointerLeave={handleLeaveInput}
        onContextMenu={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();
        }}
        $backgroundColor={opponent.color}
        aria-label={`Commander damage. Player ${player.index}, opponent ${opponent.index}`}
      >
        <CommanderDamageTextContainer $rotation={player.settings.rotation}>
          <OutlinedText
            fontSize={fontSize}
            fontWeight={fontWeight}
            strokeWidth={strokeWidth}
          >
            {player.commanderDamage[opponentIndex].damageTotal > 0
              ? player.commanderDamage[opponentIndex].damageTotal
              : ''}
          </OutlinedText>
        </CommanderDamageTextContainer>
      </CommanderDamageButton>

      {opponent.settings.usePartner && (
        <>
          <PartnerDamageSeperator $rotation={player.settings.rotation} />
          <CommanderDamageButton
            key={opponentIndex}
            $rotation={player.settings.rotation}
            onPointerDown={() =>
              handleDownInput({ opponentIndex, isPartner: true })
            }
            onPointerUp={() =>
              handleUpInput({ opponentIndex, isPartner: true })
            }
            onPointerLeave={handleLeaveInput}
            onContextMenu={(
              e: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              e.preventDefault();
            }}
            $backgroundColor={opponent.color}
            aria-label={`Partner Commander damage. Player ${player.index}, opponent ${opponent.index}`}
          >
            <CommanderDamageTextContainer $rotation={player.settings.rotation}>
              <OutlinedText
                fontSize={fontSize}
                fontWeight={fontWeight}
                strokeWidth={strokeWidth}
              >
                {player.commanderDamage[opponentIndex].partnerDamageTotal > 0
                  ? player.commanderDamage[opponentIndex].partnerDamageTotal
                  : ''}
              </OutlinedText>
            </CommanderDamageTextContainer>
          </CommanderDamageButton>
        </>
      )}
    </CommanderDamageContainer>
  );
};
