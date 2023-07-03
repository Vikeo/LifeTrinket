import React, { useState } from 'react';
import * as S from './LifeCounter.style';
import { Player } from '../../Types/Player';
import { useSwipeable } from 'react-swipeable';
import CommanderTaxButton from '../Buttons/CommanderTaxButton';
import PartnerCommanderTaxButton from '../Buttons/PartnerCommanderTaxButton copy';
import AddLifeButton from '../Buttons/AddLifeButton';
import SubtractLifeButton from '../Buttons/SubtractLifeButton';
import CommanderDamageBar from '../Buttons/CommanderDamageBar';
import PlayerMenu from '../PlayerMenu/PlayerMenu';
import PoisonButton from '../Buttons/PoisonButton';
import EnergyButton from '../Buttons/EnergyButton';
import ExperienceButton from '../Buttons/ExperienceButton';

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
          {player.settings.useCommanderDamage && <CommanderTaxButton />}
          {Boolean(
            player.settings.useCommanderDamage && player.settings.usePartner
          ) && <PartnerCommanderTaxButton />}
          {player.settings.usePoison && <PoisonButton />}
          {player.settings.useEnergy && <EnergyButton />}
          {player.settings.useExperience && <ExperienceButton />}
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
