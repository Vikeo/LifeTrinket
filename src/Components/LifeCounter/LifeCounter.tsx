import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { css, keyframes  } from 'styled-components';
import { Player, Rotation } from '../../Types/Player';
import LifeCounterButton from '../Buttons/LifeCounterButton';
import SettingsButton from '../Buttons/SettingsButton';
import CommanderDamageBar from '../Counters/CommanderDamageBar';
import ExtraCountersBar from '../Counters/ExtraCountersBar';
import PlayerMenu from '../PlayerMenu/PlayerMenu';
import { OutlinedText } from '../Misc/OutlinedText';

const LifeCounterContentWrapper = styled.div<{
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
    max-height: 100vmin;
  }
`;

const LifeCounterWrapper = styled.div<{
  rotation: Rotation;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  z-index: 1;

  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        flex-direction: row;
        rotate: ${props.rotation - 90}deg;
      `;
    }

    return css`
      flex-direction: column;
      rotate: ${props.rotation}deg;
    `;
  }}
`;

const LifeCountainer = styled.div<{
  rotation: Rotation;
}>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;

  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        flex-direction: column-reverse;
      `;
    }
  }}
`;

const StartingPlayer = styled.div<{
  rotation: Rotation;
}>`
  z-index: 1;
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 8vmin;
  background: turquoise;
  pointer-events: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -ms-user-select: none;
  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        flex-direction: column-reverse;
      `;
    }
  }}
`;

const LifeCounterTextContainer = styled.p<{
  rotation: Rotation;
}>`
  margin: 0;
  padding: 0;
  pointer-events: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -ms-user-select: none;
  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        rotate: 270deg;
        margin-right: 25%;
      `;
    }
  }}
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
  font-variant-numeric: tabular-nums;
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 8vmin;
  color: #333333;
  animation: ${fadeOut} 3s 1s ease-out forwards;
`;

interface LifeCounterProps {
  backgroundColor: string;
  player: Player;
  opponents: Player[];
  onPlayerChange: (updatedPlayer: Player) => void;
  resetCurrentGame: () => void;
}

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
  const [showStartingPlayer, setShowStartingPlayer] = useState(
    localStorage.getItem('playing') === 'true'
  );
  const [key, setKey] = useState(Date.now());

  useEffect(() => {
    const timer = setTimeout(() => {
      setRecentDifference(0);
    }, 3_000);

    return () => clearTimeout(timer);
  }, [recentDifference]);

  useEffect(() => {
    if (!showStartingPlayer) {
      const playingTimer = setTimeout(() => {
        localStorage.setItem('playing', 'true');
        setShowStartingPlayer(localStorage.getItem('playing') === 'true');
      }, 3_000);

      return () => clearTimeout(playingTimer);
    }
  }, [showStartingPlayer]);

  const size = 30;
  const fontSize = `${size}vmin`;
  const strokeWidth = `${size / 20}vmin`;

  return (
    <LifeCounterContentWrapper backgroundColor={backgroundColor}>
      <LifeCounterWrapper rotation={player.settings.rotation}>
        {player.isStartingPlayer && !showStartingPlayer && (
          <StartingPlayer rotation={player.settings.rotation}>
            You start!
          </StartingPlayer>
        )}

        <CommanderDamageBar
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
        <LifeCountainer rotation={player.settings.rotation}>
          <LifeCounterButton
            lifeTotal={player.lifeTotal}
            setLifeTotal={handleLifeChange}
            rotation={player.settings.rotation}
            operation="subtract"
            increment={-1}
          />
          <LifeCounterTextContainer rotation={player.settings.rotation}>
            <OutlinedText fontSize={fontSize} strokeWidth={strokeWidth}>
              {player.lifeTotal}
            </OutlinedText>
            {recentDifference !== 0 && (
              <RecentDifference key={key}>
                {recentDifference > 0 ? '+' : ''}
                {recentDifference}
              </RecentDifference>
            )}
          </LifeCounterTextContainer>
          <LifeCounterButton
            lifeTotal={player.lifeTotal}
            setLifeTotal={handleLifeChange}
            rotation={player.settings.rotation}
            operation="add"
            increment={1}
          />
        </LifeCountainer>
        <ExtraCountersBar player={player} onPlayerChange={onPlayerChange} />
      </LifeCounterWrapper>
      {showPlayerMenu && (
        <PlayerMenu
          player={player}
          opponents={opponents}
          onPlayerChange={onPlayerChange}
          setShowPlayerMenu={setShowPlayerMenu}
          resetCurrentGame={resetCurrentGame}
        />
      )}
    </LifeCounterContentWrapper>
  );
};

export default LifeCounter;
