import React, { useState } from 'react';
import * as S from './LifeCounter.style';
import { Player } from '../../Types/Player';
import { useSwipeable } from 'react-swipeable';
import AddLifeButton from '../Buttons/AddLifeButton';
import SubtractLifeButton from '../Buttons/SubtractLifeButton';
import CommanderDamageBar from '../Buttons/CommanderDamageBar';
import PlayerMenu from '../PlayerMenu/PlayerMenu';

import ExtraCounter from '../Buttons/ExtraCounter';
import CommanderTaxIcon from '../../Icons/CommanderTaxIcon';
import EnergyIcon from '../../Icons/EnergyIcon';
import ExperienceIcon from '../../Icons/ExperienceIcon';
import PoisonIcon from '../../Icons/PoisonIcon';
import PartnerTaxIcon from '../../Icons/PartnerTaxIcon';
import SettingsButton from '../Buttons/SettingsButton';

type LifeCounterProps = {
  player: Player;
  backgroundColor: string;
  opponents: Player[];
  onPlayerChange: (updatedPlayer: Player) => void;
};

const LifeCounter = ({
  backgroundColor,
  player,
  opponents,
  onPlayerChange,
}: LifeCounterProps) => {
  const handleLifeChange = (updatedLifeTotal: number) => {
    const updatedPlayer = { ...player, lifeTotal: updatedLifeTotal };
    onPlayerChange(updatedPlayer);
  };

  const [showPlayerMenu, setShowPlayerMenu] = useState(false);

  const swipeHandlers = useSwipeable({
    onSwipedUp: () =>
      player.settings.flipped ? setShowPlayerMenu(true) : null,
    onSwipedDown: () =>
      player.settings.flipped ? null : setShowPlayerMenu(true),
  });

  return (
    <S.LifeCounterWrapper backgroundColor={backgroundColor}>
      <S.LifeCounterContentContainer {...swipeHandlers}>
        <CommanderDamageBar
          lifeTotal={player.lifeTotal}
          setLifeTotal={handleLifeChange}
          opponents={opponents}
        />
        <SettingsButton
          onClick={() => {
            setShowPlayerMenu(!showPlayerMenu);
          }}
        />
        <S.LifeCountainer>
          <SubtractLifeButton
            lifeTotal={player.lifeTotal}
            setLifeTotal={handleLifeChange}
          />
          <S.LifeCounterText>{player.lifeTotal}</S.LifeCounterText>
          <AddLifeButton
            lifeTotal={player.lifeTotal}
            setLifeTotal={handleLifeChange}
          />
        </S.LifeCountainer>
        <S.ExtraCountersGrid>
          {player.settings.useCommanderDamage && (
            <ExtraCounter Icon={<CommanderTaxIcon size="8vh" />} />
          )}
          {Boolean(
            player.settings.useCommanderDamage && player.settings.usePartner
          ) && <ExtraCounter Icon={<PartnerTaxIcon size="8vh" />} />}
          {player.settings.usePoison && (
            <ExtraCounter Icon={<PoisonIcon size="8vh" />} />
          )}
          {player.settings.useEnergy && (
            <ExtraCounter Icon={<EnergyIcon size="8vh" />} />
          )}
          {player.settings.useExperience && (
            <ExtraCounter Icon={<ExperienceIcon size="8vh" />} />
          )}
        </S.ExtraCountersGrid>
      </S.LifeCounterContentContainer>

      {showPlayerMenu && (
        <PlayerMenu
          player={player}
          onPlayerChange={onPlayerChange}
          setShowPlayerMenu={setShowPlayerMenu}
        />
      )}
    </S.LifeCounterWrapper>
  );
};

export default LifeCounter;
