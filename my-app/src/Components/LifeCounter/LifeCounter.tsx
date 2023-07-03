import React, { useState } from 'react';
import * as S from './LifeCounter.style';
import { Player } from '../../Types/Player';
import CommanderTaxButton from '../Buttons/CommanderTaxButton';
import PartnerCommanderTaxButton from '../Buttons/PartnerCommanderTaxButton copy';
import AddLifeButton from '../Buttons/AddLifeButton';
import SubtractLifeButton from '../Buttons/SubtractLifeButton';
import CommanderDamageBar from '../Buttons/CommanderDamageBar';
import PlayerMenu from '../PlayerMenu/PlayerMenu';

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
  return (
    <S.LifeCounterWrapper backgroundColor={backgroundColor}>
      <S.LifeCounterContentContainer>
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
        </S.ExtraCountersGrid>
      </S.LifeCounterContentContainer>
      <PlayerMenu player={player} onPlayerChange={onPlayerChange} />
    </S.LifeCounterWrapper>
  );
};

export default LifeCounter;
