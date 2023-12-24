import { CounterType, Player } from '../../Types/Player';
import ExtraCounter from '../Buttons/ExtraCounter';
import styled from 'styled-components';
import { css } from 'styled-components';
import { Rotation } from '../../Types/Player';
import {
  CommanderTax,
  Energy,
  Experience,
  PartnerTax,
  Poison,
} from '../../Icons/generated';
import { usePlayers } from '../../Hooks/usePlayers';

const Container = styled.div<{ $rotation: Rotation }>`
  width: 100%;
  height: 20vmin;
  display: flex;

  ${(props) => {
    if (
      props.$rotation === Rotation.SideFlipped ||
      props.$rotation === Rotation.Side
    ) {
      return css`
        height: 100%;
        width: 9.3vmax;
      `;
    }
  }}
`;

export const ExtraCountersGrid = styled.div<{ $rotation: Rotation }>`
  display: flex;
  position: absolute;
  width: 100%;
  flex-direction: row;
  flex-grow: 1;
  bottom: 0;
  pointer-events: none;

  ${(props) => {
    if (
      props.$rotation === Rotation.SideFlipped ||
      props.$rotation === Rotation.Side
    ) {
      return css`
        flex-direction: column-reverse;
        height: 100%;
        width: auto;
        bottom: auto;
        right: 0;
      `;
    }
  }}
`;

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
            Icon={<CommanderTax size={iconSize} opacity="0.5" color="black" />}
            type={CounterType.CommanderTax}
            counterTotal={
              player.extraCounters?.find(
                (counter) => counter.type === 'commanderTax'
              )?.value
            }
            setCounterTotal={handleCounterChange}
            playerIndex={player.index}
          />
        )}
        {Boolean(useCommanderDamage && usePartner) && (
          <ExtraCounter
            rotation={player.settings.rotation}
            Icon={<PartnerTax size={iconSize} opacity="0.5" color="black" />}
            type={CounterType.PartnerTax}
            counterTotal={
              player.extraCounters?.find(
                (counter) => counter.type === 'partnerTax'
              )?.value
            }
            setCounterTotal={handleCounterChange}
            playerIndex={player.index}
          />
        )}
        {usePoison && (
          <ExtraCounter
            rotation={player.settings.rotation}
            Icon={<Poison size={iconSize} opacity="0.5" color="black" />}
            type={CounterType.Poison}
            counterTotal={
              player.extraCounters?.find((counter) => counter.type === 'poison')
                ?.value
            }
            setCounterTotal={handleCounterChange}
            playerIndex={player.index}
          />
        )}
        {useEnergy && (
          <ExtraCounter
            rotation={player.settings.rotation}
            Icon={<Energy size={iconSize} opacity="0.5" color="black" />}
            type={CounterType.Energy}
            counterTotal={
              player.extraCounters?.find((counter) => counter.type === 'energy')
                ?.value
            }
            setCounterTotal={handleCounterChange}
            playerIndex={player.index}
          />
        )}
        {useExperience && (
          <ExtraCounter
            rotation={player.settings.rotation}
            Icon={<Experience size={iconSize} opacity="0.5" color="black" />}
            type={CounterType.Experience}
            counterTotal={
              player.extraCounters?.find(
                (counter) => counter.type === 'experience'
              )?.value
            }
            setCounterTotal={handleCounterChange}
            playerIndex={player.index}
          />
        )}
      </ExtraCountersGrid>
    </Container>
  );
};

export default ExtraCountersBar;
