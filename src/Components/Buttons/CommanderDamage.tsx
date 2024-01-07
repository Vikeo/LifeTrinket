import { useRef, useState } from 'react';
import { decrementTimeoutMs } from '../../Data/constants';
import { usePlayers } from '../../Hooks/usePlayers';
import { Player, Rotation } from '../../Types/Player';
import { OutlinedText } from '../Misc/OutlinedText';
import { TwcComponentProps, twc } from 'react-twc';

export type RotationDivProps = TwcComponentProps<'div'> & {
  $rotation?: number;
};

export type RotationSpanProps = TwcComponentProps<'span'> & {
  $rotation?: number;
};

export type RotationButtonProps = TwcComponentProps<'button'> & {
  $rotation?: number;
};

const CommanderDamageContainer = twc.div<RotationDivProps>((props) => [
  'flex flex-grow',
  props.$rotation === Rotation.SideFlipped || props.$rotation === Rotation.Side
    ? 'flex-col'
    : 'flex-row',
]);

const CommanderDamageButton = twc.button<RotationButtonProps>((props) => [
  'flex flex-grow border-none outline-none cursor-pointer m-0 p-0 webkit-user-select-none',
  props.$rotation === Rotation.SideFlipped || props.$rotation === Rotation.Side
    ? 'w-[6vmax] h-auto'
    : 'h-[10vmin] w-1/2',
]);

const CommanderDamageTextContainer = twc.div<RotationDivProps>((props) => [
  'relative top-1/2 left-1/2 tabular-nums pointer-events-none select-none webkit-user-select-none',
  props.$rotation === Rotation.SideFlipped || props.$rotation === Rotation.Side
    ? 'rotate-[270deg]'
    : '',
]);

const PartnerDamageSeperator = twc.div<RotationDivProps>((props) => [
  'bg-black',
  props.$rotation === Rotation.SideFlipped || props.$rotation === Rotation.Side
    ? 'w-full h-px'
    : 'w-px',
]);

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
        aria-label={`Commander damage. Player ${player.index}, opponent ${opponent.index}`}
        style={{ background: opponent.color }}
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
            aria-label={`Partner Commander damage. Player ${player.index}, opponent ${opponent.index}`}
            style={{ background: opponent.color }}
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
