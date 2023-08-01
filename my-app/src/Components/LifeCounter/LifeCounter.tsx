import { useState, useEffect } from 'react';
import { Player } from '../../Types/Player';
import { useSwipeable } from 'react-swipeable';
import AddLifeButton from '../Buttons/AddLifeButton';
import SubtractLifeButton from '../Buttons/SubtractLifeButton';
import CommanderDamageBar from '../Buttons/CommanderDamageBar';
import PlayerMenu from '../PlayerMenu/PlayerMenu';
import SettingsButton from '../Buttons/SettingsButton';
import ExtraCountersBar from '../Counters/ExtraCountersBar';
import styled, { css, keyframes } from 'styled-components';
import { Rotation } from '../../Types/Player';

export const LifeCounterWrapper = styled.div<{
  backgroundColor: string;
}>`
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.backgroundColor || 'antiquewhite'};
  @media (orientation: landscape) {
    max-width: 100vmax;
    max-height: 100min;
  }
`;

export const LifeCounterContentContainer = styled.div<{
  rotation: Rotation;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  z-index: 1;

  ${(props) =>
    css`
      rotate: ${props.rotation}deg;
    `};
`;

export const LifeCountainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const LifeCounterText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30vmin;
  text-align: center;
  text-size-adjust: auto;
  margin: 0;
  padding: 0;
  width: 100%;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
  text-shadow: -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff,
    1px 1px 0 #ffffff;
  color: #000000;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  33% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
  }
`;

export const RecentDifference = styled.span`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: none;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 8vmin;
  color: #333333;
  animation: ${fadeOut} 3s 1s ease-out forwards;
`;

type LifeCounterProps = {
  player: Player;
  backgroundColor: string;
  opponents: Player[];
  onPlayerChange: (updatedPlayer: Player) => void;
  resetCurrentGame: () => void;
};

const LifeCounter = ({
  backgroundColor,
  player,
  opponents,
  onPlayerChange,
  resetCurrentGame,
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
    <LifeCounterWrapper backgroundColor={backgroundColor}>
      <LifeCounterContentContainer
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
        <LifeCountainer>
          <SubtractLifeButton
            lifeTotal={player.lifeTotal}
            setLifeTotal={handleLifeChange}
            rotation={player.settings.rotation}
          />
          <LifeCounterText>
            {player.lifeTotal}
            {recentDifference !== 0 && (
              <RecentDifference key={key}>
                {recentDifference > 0 ? '+' : ''}
                {recentDifference}
              </RecentDifference>
            )}
          </LifeCounterText>
          <AddLifeButton
            lifeTotal={player.lifeTotal}
            setLifeTotal={handleLifeChange}
            rotation={player.settings.rotation}
          />
        </LifeCountainer>
        <ExtraCountersBar player={player} onPlayerChange={onPlayerChange} />
      </LifeCounterContentContainer>
      {showPlayerMenu && (
        <PlayerMenu
          player={player}
          opponents={opponents}
          onPlayerChange={onPlayerChange}
          setShowPlayerMenu={setShowPlayerMenu}
          resetCurrentGame={resetCurrentGame}
        />
      )}
    </LifeCounterWrapper>
  );
};

export default LifeCounter;
