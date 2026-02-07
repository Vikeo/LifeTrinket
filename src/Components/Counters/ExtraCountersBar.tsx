import { twc } from 'react-twc';
import { usePlayers } from '../../Hooks/usePlayers';
import {
  CommanderTax,
  Energy,
  Experience,
  PartnerTax,
  Poison,
} from '../../Icons/generated';
import { CounterType, Player, Rotation } from '../../Types/Player';
import { RotationDivProps } from '../Buttons/CommanderDamage';
import ExtraCounter from '../Buttons/ExtraCounter';

const Container = twc.div<RotationDivProps>((props) => [
  'flex',
  props.$rotation === Rotation.SideFlipped || props.$rotation === Rotation.Side
    ? 'h-full w-[8vmax]'
    : 'h-[20vmin] w-full',
]);

const ExtraCountersGrid = twc.div<RotationDivProps>((props) => [
  'flex absolute flex-grow pointer-events-none',
  props.$rotation === Rotation.SideFlipped || props.$rotation === Rotation.Side
    ? 'flex-col h-full w-auto overflow-y-scroll overflow-x-hidden bottom-auto right-0'
    : 'flex-row w-full overflow-x-scroll overflow-y-hidden bottom-0',
]);

type ExtraCountersBarProps = {
  player: Player;
};

const ExtraCountersBar = ({ player }: ExtraCountersBarProps) => {
  const { updatePlayer } = usePlayers();

  const handleCounterChange = (
    updatedCounterTotal: number,
    type: CounterType
  ) => {
    if (updatedCounterTotal < 0) {
      return;
    }

    const existingCounter = player.extraCounters.find(
      (counter) => counter.type === type
    );

    if (!existingCounter) {
      const newCounter = {
        type,
        value: updatedCounterTotal,
      };
      const updatedExtraCounters = [...player.extraCounters, newCounter];
      const updatedPlayer = { ...player, extraCounters: updatedExtraCounters };
      updatePlayer(updatedPlayer);
      return;
    }

    const updatedExtraCounters = player.extraCounters.map((counter) => {
      if (counter.type === type) {
        return { ...counter, value: updatedCounterTotal };
      }
      return counter;
    });

    const updatedPlayer = { ...player, extraCounters: updatedExtraCounters };
    updatePlayer(updatedPlayer);
  };

  const iconSize =
    player.settings.rotation === Rotation.SideFlipped ||
    player.settings.rotation === Rotation.Side
      ? '5vmax'
      : '10vmin';

  const {
    useCommanderDamage,
    usePartner,
    usePoison,
    useEnergy,
    useExperience,
  } = player.settings;

  const hasExtraCounters =
    useCommanderDamage || usePartner || usePoison || useEnergy || useExperience;

  if (!hasExtraCounters) {
    return null;
  }

  return (
    <Container $rotation={player.settings.rotation}>
      <ExtraCountersGrid $rotation={player.settings.rotation}>
        {useCommanderDamage && (
          <ExtraCounter
            rotation={player.settings.rotation}
            Icon={
              <CommanderTax
                size={iconSize}
                data-contrast={player.iconTheme}
                strokeWidth={0}
                stroke="transparent"
                className="data-[contrast=dark]:text-icons-dark data-[contrast=light]:text-icons-light"
              />
            }
            type={CounterType.CommanderTax}
            counterTotal={
              player.extraCounters?.find(
                (counter) => counter.type === 'commanderTax'
              )?.value
            }
            isSide={player.isSide}
            setCounterTotal={handleCounterChange}
            playerIndex={player.index}
          />
        )}
        {Boolean(useCommanderDamage && usePartner) && (
          <ExtraCounter
            rotation={player.settings.rotation}
            Icon={
              <PartnerTax
                size={iconSize}
                data-contrast={player.iconTheme}
                className="data-[contrast=dark]:text-icons-dark data-[contrast=light]:text-icons-light"
              />
            }
            type={CounterType.PartnerTax}
            counterTotal={
              player.extraCounters?.find(
                (counter) => counter.type === 'partnerTax'
              )?.value
            }
            isSide={player.isSide}
            setCounterTotal={handleCounterChange}
            playerIndex={player.index}
          />
        )}
        {usePoison && (
          <ExtraCounter
            rotation={player.settings.rotation}
            Icon={
              <Poison
                size={iconSize}
                data-contrast={player.iconTheme}
                className="data-[contrast=dark]:text-icons-dark data-[contrast=light]:text-icons-light"
              />
            }
            type={CounterType.Poison}
            counterTotal={
              player.extraCounters?.find((counter) => counter.type === 'poison')
                ?.value
            }
            isSide={player.isSide}
            setCounterTotal={handleCounterChange}
            playerIndex={player.index}
          />
        )}
        {useEnergy && (
          <ExtraCounter
            rotation={player.settings.rotation}
            Icon={
              <Energy
                size={iconSize}
                data-contrast={player.iconTheme}
                className="data-[contrast=dark]:text-icons-dark data-[contrast=light]:text-icons-light"
              />
            }
            type={CounterType.Energy}
            counterTotal={
              player.extraCounters?.find((counter) => counter.type === 'energy')
                ?.value
            }
            isSide={player.isSide}
            setCounterTotal={handleCounterChange}
            playerIndex={player.index}
          />
        )}
        {useExperience && (
          <ExtraCounter
            rotation={player.settings.rotation}
            Icon={
              <Experience
                size={iconSize}
                data-contrast={player.iconTheme}
                className="data-[contrast=dark]:text-icons-dark data-[contrast=light]:text-icons-light"
              />
            }
            type={CounterType.Experience}
            counterTotal={
              player.extraCounters?.find(
                (counter) => counter.type === 'experience'
              )?.value
            }
            isSide={player.isSide}
            setCounterTotal={handleCounterChange}
            playerIndex={player.index}
          />
        )}
      </ExtraCountersGrid>
    </Container>
  );
};

export default ExtraCountersBar;
