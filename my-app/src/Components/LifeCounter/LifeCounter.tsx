import { useState } from 'react';
import * as S from './LifeCounter.style';
import { Player } from '../../Types/Player';
import CommanderTaxButton from '../Buttons/CommanderTaxButton';
import PartnerCommanderTaxButton from '../Buttons/PartnerCommanderTaxButton copy';
import AddLifeButton from '../Buttons/AddLifeButton';
import SubtractLifeButton from '../Buttons/SubtractLifeButton';
import CommanderDamageBar from '../Buttons/CommanderDamageBar';

type LifeCounterProps = {
  player: Player;
  backgroundColor: string;
  opponents: Player[];
  setIsAnyButtonsPressed: (isAnyButtonsPressed: boolean) => void;
  isAnyButtonsPressed: boolean;
};

const LifeCounter = ({
  backgroundColor,
  player,
  opponents,
  isAnyButtonsPressed,
  setIsAnyButtonsPressed,
}: LifeCounterProps) => {
  const [lifeTotal, setLifeTotal] = useState(40);

  return (
    <S.LifeCounterWrapper backgroundColor={backgroundColor}>
      <CommanderDamageBar
        lifeTotal={lifeTotal}
        setLifeTotal={setLifeTotal}
        opponents={opponents}
      />
      <S.LifeCountainer>
        <SubtractLifeButton lifeTotal={lifeTotal} setLifeTotal={setLifeTotal} />
        <S.LifeCounterText>{lifeTotal}</S.LifeCounterText>
        <AddLifeButton lifeTotal={lifeTotal} setLifeTotal={setLifeTotal} />
      </S.LifeCountainer>
      <S.ExtraCountersGrid>
        <CommanderTaxButton />
        {player.settings.usePartner && <PartnerCommanderTaxButton />}
      </S.ExtraCountersGrid>
    </S.LifeCounterWrapper>
  );
};

export default LifeCounter;
