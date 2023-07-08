import { useState, useEffect, useRef } from 'react';
import * as S from './LifeCounter.style';
import { Player } from '../../Types/Player';
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
    const difference = updatedLifeTotal - player.lifeTotal;
    const updatedPlayer = { ...player, lifeTotal: updatedLifeTotal };
    setRecentDifference(recentDifference + difference);
    onPlayerChange(updatedPlayer);
    setKey(Date.now());
  };

  const [showPlayerMenu, setShowPlayerMenu] = useState(false);
  const [recentDifference, setRecentDifference] = useState(0);
  const [key, setKey] = useState(Date.now());

  useEffect(() => {
    const timer = setTimeout(() => {
      setRecentDifference(0);
    }, 3000);

    return () => clearTimeout(timer);
  }, [recentDifference]);

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => {
      // player.settings.flipped ? setShowPlayerMenu(true) : null;
    },
    onSwipedDown: () => {
      // player.settings.flipped ? null : setShowPlayerMenu(true);
    },
  });

  return (
    <S.LifeCounterWrapper backgroundColor={backgroundColor}>
      <S.LifeCounterContentContainer
        {...swipeHandlers}
        rotation={player.settings.rotation}
      >
        <CommanderDamageBar
          lifeTotal={player.lifeTotal}
          opponents={opponents}
          player={player}
          onPlayerChange={onPlayerChange}
          setLifeTotal={handleLifeChange}
        />
        <SettingsButton
          onClick={() => {
            setShowPlayerMenu(!showPlayerMenu);
          }}
        />
        <div>{player.key}</div>
        <S.LifeCountainer>
          <SubtractLifeButton
            lifeTotal={player.lifeTotal}
            setLifeTotal={handleLifeChange}
          />
          <S.LifeCounterText>
            {player.lifeTotal}
            {recentDifference !== 0 && (
              <S.RecentDifference key={key}>
                {recentDifference > 0 ? '+' : ''}
                {recentDifference}
              </S.RecentDifference>
            )}
          </S.LifeCounterText>
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
          opponents={opponents}
          onPlayerChange={onPlayerChange}
          setShowPlayerMenu={setShowPlayerMenu}
        />
      )}
    </S.LifeCounterWrapper>
  );
};

export default LifeCounter;
