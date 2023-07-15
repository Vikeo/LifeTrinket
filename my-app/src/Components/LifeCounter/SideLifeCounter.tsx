import { useState, useEffect } from 'react';
import * as S from './SideLifeCounter.style';
import { Player } from '../../Types/Player';
import { useSwipeable } from 'react-swipeable';
import AddLifeButton from '../Buttons/AddLifeButton';
import SubtractLifeButton from '../Buttons/SubtractLifeButton';
import CommanderDamageBar from '../Buttons/CommanderDamageBar';
import PlayerMenu from '../PlayerMenu/PlayerMenu';
import SettingsButton from '../Buttons/SettingsButton';
import ExtraCountersBar from '../Counters/ExtraCountersBar';

type SideLifeCounterProps = {
  player: Player;
  backgroundColor: string;
  opponents: Player[];
  onPlayerChange: (updatedPlayer: Player) => void;
  resetCurrentGame: () => void;
};

const SideLifeCounter = ({
  backgroundColor,
  player,
  opponents,
  onPlayerChange,
  resetCurrentGame,
}: SideLifeCounterProps) => {
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
    <S.SideLifeCounterWrapper backgroundColor={backgroundColor}>
      <S.SideLifeCounterContentContainer
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
          rotation={player.settings.rotation}
        />

        <S.SideLifeCountainer>
          <AddLifeButton
            lifeTotal={player.lifeTotal}
            setLifeTotal={handleLifeChange}
            rotation={player.settings.rotation}
          />
          <S.SideLifeCounterText>
            {player.lifeTotal}
            {recentDifference !== 0 && (
              <S.SideRecentDifference key={key}>
                {recentDifference > 0 ? '+' : ''}
                {recentDifference}
              </S.SideRecentDifference>
            )}
          </S.SideLifeCounterText>

          <SubtractLifeButton
            lifeTotal={player.lifeTotal}
            setLifeTotal={handleLifeChange}
            rotation={player.settings.rotation}
          />
        </S.SideLifeCountainer>
        <ExtraCountersBar player={player} onPlayerChange={onPlayerChange} />
      </S.SideLifeCounterContentContainer>
      {showPlayerMenu && (
        <PlayerMenu
          player={player}
          opponents={opponents}
          onPlayerChange={onPlayerChange}
          setShowPlayerMenu={setShowPlayerMenu}
          resetCurrentGame={resetCurrentGame}
        />
      )}
    </S.SideLifeCounterWrapper>
  );
};

export default SideLifeCounter;
