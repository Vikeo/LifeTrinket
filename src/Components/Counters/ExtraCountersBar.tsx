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

const ExtraCountersGrid = styled.div<{ rotation: number }>`
  display: flex;
  position: absolute;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
  justify-content: space-evenly;
  bottom: 0;
  width: 100%;
  pointer-events: none;

  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        flex-direction: column-reverse;
        height: 100%;
        width: auto;
        bottom: auto;
        right: -6px;
      `;
    }
  }}
`;

type ExtraCountersBarProps = {
  player: Player;
  onPlayerChange: (updatedPlayer: Player) => void;
};

const ExtraCountersBar = ({
  player,
  onPlayerChange,
}: ExtraCountersBarProps) => {
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
      onPlayerChange(updatedPlayer);
      return;
    }

    const updatedExtraCounters = player.extraCounters.map((counter) => {
      if (counter.type === type) {
        return { ...counter, value: updatedCounterTotal };
      }
      return counter;
    });

    const updatedPlayer = { ...player, extraCounters: updatedExtraCounters };
    onPlayerChange(updatedPlayer);
  };

  const iconSize = '8vmin';

  return (
    <ExtraCountersGrid rotation={player.settings.rotation}>
      {player.settings.useCommanderDamage && (
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
        />
      )}
      {Boolean(
        player.settings.useCommanderDamage && player.settings.usePartner
      ) && (
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
        />
      )}
      {player.settings.usePoison && (
        <ExtraCounter
          rotation={player.settings.rotation}
          Icon={<Poison size={iconSize} opacity="0.5" color="black" />}
          type={CounterType.Poison}
          counterTotal={
            player.extraCounters?.find((counter) => counter.type === 'poison')
              ?.value
          }
          setCounterTotal={handleCounterChange}
        />
      )}
      {player.settings.useEnergy && (
        <ExtraCounter
          rotation={player.settings.rotation}
          Icon={<Energy size={iconSize} opacity="0.5" color="black" />}
          type={CounterType.Energy}
          counterTotal={
            player.extraCounters?.find((counter) => counter.type === 'energy')
              ?.value
          }
          setCounterTotal={handleCounterChange}
        />
      )}
      {player.settings.useExperience && (
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
        />
      )}
    </ExtraCountersGrid>
  );
};

export default ExtraCountersBar;
