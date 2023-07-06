import { useState } from 'react';
import * as S from './LifeCounter.style';
import { CounterType, Player } from '../../Types/Player';
import { useSwipeable } from 'react-swipeable';
import AddLifeButton from '../Buttons/AddLifeButton';
import SubtractLifeButton from '../Buttons/SubtractLifeButton';
import CommanderDamageBar from '../Buttons/CommanderDamageBar';
import PlayerMenu from '../PlayerMenu/PlayerMenu';
import SettingsButton from '../Buttons/SettingsButton';
import ExtraCountersBar from '../Counters/ExtraCountersBar';

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
          opponents={opponents}
          player={player}
          onPlayerChange={onPlayerChange}
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
        <ExtraCountersBar player={player} onPlayerChange={onPlayerChange} />
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
