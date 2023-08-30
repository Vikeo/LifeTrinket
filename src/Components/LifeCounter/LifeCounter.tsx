import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { theme } from '../../Data/theme';
import { Player, Rotation } from '../../Types/Player';
import LifeCounterButton from '../Buttons/LifeCounterButton';
import SettingsButton from '../Buttons/SettingsButton';
import CommanderDamageBar from '../Counters/CommanderDamageBar';
import ExtraCountersBar from '../Counters/ExtraCountersBar';
import { OutlinedText } from '../Misc/OutlinedText';
import PlayerMenu from '../PlayerMenu/PlayerMenu';
import { Skull } from '../../Icons/generated';
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

const PlayerNoticeWrapper = styled.div<{
  rotation: Rotation;
  backgroundColor: string;
}>`
  z-index: 1;
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.backgroundColor};
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
        rotate: ${props.rotation - 90}deg;
      `;
    }
  }}
`;

const DynamicText = styled.div<{ rotation: Rotation }>`
  font-size: 8vmin;
  ${(props) => {
    if (
      props.rotation === Rotation.SideFlipped ||
      props.rotation === Rotation.Side
    ) {
      return css`
        rotate: ${props.rotation - 180}deg;
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

export const LoseGameButton = styled.button<{ rotation: Rotation }>`
  position: absolute;
  flex-grow: 1;
  border: none;
  outline: none;
  cursor: pointer;
  top: 12vmin;
  right: 6vmax;
  background-color: #43434380;
  border-radius: 15px;

  ${(props) => {
    if (props.rotation === Rotation.SideFlipped) {
      return css`
        right: auto;
        top: 6vmax;
        left: 12vmin;
        rotate: ${props.rotation}deg;
      `;
    } else if (props.rotation === Rotation.Side) {
      return css`
        right: auto;
        top: 6vmax;
        left: 12vmin;
        rotate: ${props.rotation - 180}deg;
      `;
    }
  }}
`;

interface LifeCounterProps {
  backgroundColor: string;
  player: Player;
  opponents: Player[];
  onPlayerChange: (updatedPlayer: Player) => void;
  resetCurrentGame: () => void;
}

const hasCommanderDamageReached21 = (player: Player) => {
  const commanderDamageTotal = player.commanderDamage.reduce(
    (totalDamage, commander) => totalDamage + commander.damageTotal,
    0
  );
  const partnerDamageTotal = player.commanderDamage.reduce(
    (totalDamage, commander) => totalDamage + commander.partnerDamageTotal,
    0
  );
  return commanderDamageTotal >= 21 || partnerDamageTotal >= 21;
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
    const updatedPlayer = {
      ...player,
      lifeTotal: updatedLifeTotal,
      hasLost: false,
    };
    setRecentDifference(recentDifference + difference);
    onPlayerChange(updatedPlayer);
    setKey(Date.now());
  };

  const setGameLost = () => {
    const updatedPlayer = { ...player, hasLost: true };
    onPlayerChange(updatedPlayer);
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

  player.settings.rotation === Rotation.SideFlipped ||
    player.settings.rotation === Rotation.Side;

  const size =
    player.settings.rotation === Rotation.SideFlipped ||
    player.settings.rotation === Rotation.Side
      ? 15
      : 30;

  const fontSize =
    player.settings.rotation === Rotation.SideFlipped ||
    player.settings.rotation === Rotation.Side
      ? `${size}vmax`
      : `${size}vmin`;

  const strokeWidth =
    player.settings.rotation === Rotation.SideFlipped ||
    player.settings.rotation === Rotation.Side
      ? `${size / 20}vmax`
      : `${size / 20}vmin`;

  return (
    <LifeCounterContentWrapper backgroundColor={backgroundColor}>
      <LifeCounterWrapper rotation={player.settings.rotation}>
        {player.isStartingPlayer && !showStartingPlayer && (
          <PlayerNoticeWrapper
            rotation={player.settings.rotation}
            backgroundColor={theme.palette.primary.main}
          >
            <DynamicText rotation={player.settings.rotation}>
              You start!
            </DynamicText>
          </PlayerNoticeWrapper>
        )}

        {player.hasLost && (
          <PlayerNoticeWrapper
            rotation={player.settings.rotation}
            backgroundColor={'#00000070'}
          />
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
        {(player.lifeTotal < 1 || hasCommanderDamageReached21(player)) && (
          <LoseGameButton
            rotation={player.settings.rotation}
            onClick={setGameLost}
          >
            <Skull size="5vmin" color="black" opacity={0.5} />
          </LoseGameButton>
        )}
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
