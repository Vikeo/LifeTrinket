import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { twc } from 'react-twc';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { usePlayers } from '../../Hooks/usePlayers';
import { Player, Rotation } from '../../Types/Player';
import { RotationDivProps } from '../Buttons/CommanderDamage';
import { LoseGameButton } from '../Buttons/LoseButton';
import CommanderDamageBar from '../Counters/CommanderDamageBar';
import ExtraCountersBar from '../Counters/ExtraCountersBar';
import PlayerMenu from '../Player/PlayerMenu';
import Health from './Health';

const LifeCounterContentWrapper = twc.div`
  relative flex flex-grow flex-col items-center w-full h-full overflow-hidden`;

const LifeCounterWrapper = twc.div<RotationDivProps>((props) => [
  'relative flex items-center w-full h-full z-[1]',
  props.$rotation === Rotation.SideFlipped || props.$rotation === Rotation.Side
    ? `flex-row`
    : `flex-col`,
]);

const StartingPlayerNoticeWrapper = twc.div`z-[1] flex absolute w-full h-full justify-center items-center pointer-events-none select-none webkit-user-select-none bg-primary-main`;

const PlayerLostWrapper = twc.div<RotationDivProps>((props) => [
  'z-[1] flex absolute w-full h-full justify-center items-center pointer-events-none select-none webkit-user-select-none bg-lifeCounter-lostWrapper opacity-75',
  props.$rotation === Rotation.SideFlipped || props.$rotation === Rotation.Side
    ? `rotate-[${props.$rotation - 90}deg]`
    : '',
]);

const DynamicText = twc.div`text-[8vmin] whitespace-nowrap`;

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

const RECENT_DIFFERENCE_TTL = 3_000;

const LifeCounter = ({ player, opponents }: LifeCounterProps) => {
  const { updatePlayer, updateLifeTotal } = usePlayers();
  const { settings } = useGlobalSettings();

  const [showPlayerMenu, setShowPlayerMenu] = useState(false);
  const [recentDifference, setRecentDifference] = useState(0);
  const [differenceKey, setDifferenceKey] = useState(Date.now());
  const [isLandscape, setIsLandscape] = useState(false);

  const calcRot = player.isSide
    ? player.settings.rotation - 180
    : player.settings.rotation;

  const rotationAngle = isLandscape ? calcRot : calcRot + 90;

  const handlers = useSwipeable({
    trackMouse: true,
    onSwipedDown: (e) => {
      e.event.stopPropagation();
      console.log(`User DOWN Swiped on player ${player.index}`);
      setShowPlayerMenu(true);
    },
    onSwipedUp: (e) => {
      e.event.stopPropagation();
      console.log(`User UP Swiped on player ${player.index}`);
      setShowPlayerMenu(false);
    },

    swipeDuration: 500,
    onSwiping: (e) => e.event.stopPropagation(),
    rotationAngle,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setRecentDifference(0);
    }, RECENT_DIFFERENCE_TTL);

    const resizeObserver = new ResizeObserver(() => {
      if (document.body.clientWidth > document.body.clientHeight)
        setIsLandscape(true);
      else setIsLandscape(false);
      return;
    });

    resizeObserver.observe(document.body);

    return () => {
      clearTimeout(timer);
      // Cleanup: disconnect the ResizeObserver when the component unmounts.
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentDifference, document.body.clientHeight, document.body.clientWidth]);

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

  const calcRotation =
    player.settings.rotation === Rotation.SideFlipped ||
    player.settings.rotation === Rotation.Side
      ? player.settings.rotation - 90
      : player.settings.rotation;

  const calcTextRotation =
    player.settings.rotation === Rotation.SideFlipped ||
    player.settings.rotation === Rotation.Side
      ? player.settings.rotation - 180
      : player.settings.rotation;

  return (
    <LifeCounterContentWrapper style={{ background: player.color }}>
      <LifeCounterWrapper
        $rotation={player.settings.rotation}
        style={{ rotate: `${calcRotation}deg` }}
        {...handlers}
      >
        {settings.showStartingPlayer &&
          player.isStartingPlayer &&
          player.showStartingPlayer && (
            <StartingPlayerNoticeWrapper
              style={{ rotate: `${calcRotation}deg` }}
            >
              <DynamicText
                style={{
                  rotate: `${calcTextRotation}deg`,
                }}
              >
                You start!
              </DynamicText>
            </StartingPlayerNoticeWrapper>
          )}

        {player.hasLost && (
          <PlayerLostWrapper $rotation={player.settings.rotation} />
        )}
        <CommanderDamageBar
          opponents={opponents}
          player={player}
          key={player.index}
          handleLifeChange={handleLifeChange}
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

        <PlayerMenu
          isShown={showPlayerMenu}
          player={player}
          setShowPlayerMenu={setShowPlayerMenu}
        />
      </LifeCounterWrapper>
    </LifeCounterContentWrapper>
  );
};

export default LifeCounter;
