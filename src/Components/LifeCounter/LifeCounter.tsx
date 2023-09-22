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
import { usePlayers } from '../../Hooks/usePlayers';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';

const LifeCounterContentWrapper = styled.div<{
  $backgroundColor: string;
}>`
  position: relative;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.$backgroundColor || 'antiquewhite'};
  @media (orientation: landscape) {
    max-width: 100vmax;
    max-height: 100vmin;
  }

  overflow: hidden;
`;

const LifeCounterWrapper = styled.div<{
  $rotation: Rotation;
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
      props.$rotation === Rotation.SideFlipped ||
      props.$rotation === Rotation.Side
    ) {
      return css`
        flex-direction: row;
        rotate: ${props.$rotation - 90}deg;
      `;
    }

    return css`
      flex-direction: column;
      rotate: ${props.$rotation}deg;
    `;
  }}
`;

const PlayerNoticeWrapper = styled.div<{
  $rotation: Rotation;
  $backgroundColor: string;
}>`
  z-index: 1;
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.$backgroundColor};
  pointer-events: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -ms-user-select: none;

  ${(props) => {
    if (
      props.$rotation === Rotation.SideFlipped ||
      props.$rotation === Rotation.Side
    ) {
      return css`
        rotate: ${props.$rotation - 90}deg;
      `;
    }
  }}
`;

const DynamicText = styled.div<{ $rotation: Rotation }>`
  font-size: 8vmin;
  ${(props) => {
    if (
      props.$rotation === Rotation.SideFlipped ||
      props.$rotation === Rotation.Side
    ) {
      return css`
        rotate: ${props.$rotation - 180}deg;
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
  player: Player;
  opponents: Player[];
};

const LifeCounter = ({ player, opponents }: LifeCounterProps) => {
  const { updatePlayer, updateLifeTotal } = usePlayers();
  const { showStartingPlayer } = useGlobalSettings();

  const [showPlayerMenu, setShowPlayerMenu] = useState(false);
  const [recentDifference, setRecentDifference] = useState(0);
  const [differenceKey, setDifferenceKey] = useState(Date.now());

  useEffect(() => {
    const timer = setTimeout(() => {
      setRecentDifference(0);
    }, 3_000);

    return () => clearTimeout(timer);
  }, [recentDifference]);

  useEffect(() => {
    if (player.showStartingPlayer) {
      const playingTimer = setTimeout(() => {
        localStorage.setItem('playing', 'true');
        player.showStartingPlayer = false;
        updatePlayer(player);
      }, 3_000);

      return () => clearTimeout(playingTimer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.showStartingPlayer]);

  player.settings.rotation === Rotation.SideFlipped ||
    player.settings.rotation === Rotation.Side;

  const handleLifeChange = (updatedLifeTotal: number) => {
    const difference = updateLifeTotal(player, updatedLifeTotal);
    setRecentDifference(recentDifference + difference);
    setDifferenceKey(Date.now());
  };

  const toggleGameLost = () => {
    const updatedPlayer = { ...player, hasLost: !player.hasLost };
    updatePlayer(updatedPlayer);
  };

  return (
    <LifeCounterContentWrapper $backgroundColor={player.color}>
      <LifeCounterWrapper $rotation={player.settings.rotation}>
        {showStartingPlayer &&
          player.isStartingPlayer &&
          player.showStartingPlayer && (
            <PlayerNoticeWrapper
              $rotation={player.settings.rotation}
              $backgroundColor={theme.palette.primary.main}
            >
              <DynamicText $rotation={player.settings.rotation}>
                You start!
              </DynamicText>
            </PlayerNoticeWrapper>
          )}

        {player.hasLost && (
          <PlayerNoticeWrapper
            $rotation={player.settings.rotation}
            $backgroundColor={'#00000070'}
          />
        )}
        <CommanderDamageBar
          opponents={opponents}
          player={player}
          key={player.index}
          handleLifeChange={handleLifeChange}
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
          rotation={player.settings.rotation}
          differenceKey={differenceKey}
          recentDifference={recentDifference}
          handleLifeChange={handleLifeChange}
        />
        <ExtraCountersBar player={player} />
      </LifeCounterWrapper>

      {showPlayerMenu && (
        <PlayerMenu player={player} setShowPlayerMenu={setShowPlayerMenu} />
      )}
    </LifeCounterContentWrapper>
  );
};

export default LifeCounter;
