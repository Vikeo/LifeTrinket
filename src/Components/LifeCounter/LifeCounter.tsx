import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { theme } from '../../Data/theme';
import { Player, Rotation } from '../../Types/Player';
import { LoseGameButton } from '../Buttons/LoseButton';
import SettingsButton from '../Buttons/SettingsButton';
import CommanderDamageBar from '../Counters/CommanderDamageBar';
import ExtraCountersBar from '../Counters/ExtraCountersBar';
import PlayerMenu from '../PlayerMenu/PlayerMenu';
import Health from './Health';
import { WakeLock } from '../../Types/WakeLock';

const Lmao = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

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

  overflow: hidden;
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

const hasCommanderDamageReached21 = (player: Player) => {
  const commanderDamageTotals = player.commanderDamage.map(
    (commanderDamage) => commanderDamage.damageTotal
  );

  const partnerDamageTotals = player.commanderDamage.map(
    (commanderDamage) => commanderDamage.partnerDamageTotal
  );

  return (
    commanderDamageTotals.some((damageTotal) => damageTotal >= 21) ||
    partnerDamageTotals.some((partnerDamageTotal) => partnerDamageTotal >= 21)
  );
};

const playerCanLose = (player: Player) => {
  const poisonCounter = player.extraCounters.find(
    (counter) => counter.type === 'poison'
  );

  return (
    player.lifeTotal < 1 ||
    hasCommanderDamageReached21(player) ||
    (poisonCounter && poisonCounter.value >= 10)
  );
};

type LifeCounterProps = {
  backgroundColor: string;
  player: Player;
  opponents: Player[];
  onPlayerChange: (updatedPlayer: Player) => void;
  resetCurrentGame: () => void;
  wakeLock: WakeLock;
};

const LifeCounter = ({
  backgroundColor,
  player,
  opponents,
  onPlayerChange,
  resetCurrentGame,
  wakeLock,
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
    setDifferenceKey(Date.now());
  };

  const toggleGameLost = () => {
    const updatedPlayer = { ...player, hasLost: !player.hasLost };
    onPlayerChange(updatedPlayer);
  };

  const [showPlayerMenu, setShowPlayerMenu] = useState(false);
  const [recentDifference, setRecentDifference] = useState(0);
  const [showStartingPlayer, setShowStartingPlayer] = useState(
    localStorage.getItem('playing') === 'true'
  );
  const [differenceKey, setDifferenceKey] = useState(Date.now());

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

  return (
    <LifeCounterContentWrapper backgroundColor={backgroundColor}>
      <Lmao>
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
          {playerCanLose(player) && (
            <LoseGameButton
              rotation={player.settings.rotation}
              onClick={toggleGameLost}
            />
          )}
          <Health
            player={player}
            onPlayerChange={onPlayerChange}
            differenceKey={differenceKey}
            setDifferenceKey={setDifferenceKey}
            rotation={player.settings.rotation}
          />
          <ExtraCountersBar player={player} onPlayerChange={onPlayerChange} />
        </LifeCounterWrapper>
      </Lmao>
      {showPlayerMenu && (
        <PlayerMenu
          player={player}
          opponents={opponents}
          onPlayerChange={onPlayerChange}
          setShowPlayerMenu={setShowPlayerMenu}
          resetCurrentGame={resetCurrentGame}
          wakeLock={wakeLock}
        />
      )}
    </LifeCounterContentWrapper>
  );
};

export default LifeCounter;
