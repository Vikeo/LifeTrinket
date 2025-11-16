import { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { twc } from 'react-twc';
import { useAnalytics } from '../../Hooks/useAnalytics';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { usePlayers } from '../../Hooks/usePlayers';
import { Cog } from '../../Icons/generated';
import { Player, Rotation } from '../../Types/Player';
import {
  RotationButtonProps,
  RotationDivProps,
} from '../Buttons/CommanderDamage';
import { LoseGameButton } from '../Buttons/LoseButton';
import CommanderDamageBar from '../Counters/CommanderDamageBar';
import ExtraCountersBar from '../Counters/ExtraCountersBar';
import PlayerMenu from '../Players/PlayerMenu';
import { StartingPlayerCard } from '../PreStartGame/StartingPlayerCard';
import Health from './Health';

const SettingsButtonTwc = twc.button<RotationButtonProps>((props) => [
  'absolute flex-grow border-none outline-none cursor-pointer bg-transparent z-[1] select-none  webkit-user-select-none opacity-50',
  props.$rotation === Rotation.Side || props.$rotation === Rotation.SideFlipped
    ? `right-auto top-[1vmax] left-[27%]`
    : 'top-1/4 right-[1vmax]',
]);

const MatchScoreBadge = twc.div<RotationDivProps>((props) => [
  'absolute flex items-center justify-center',
  'bg-black/70 backdrop-blur-sm',
  'rounded-full',
  'w-[12vmin] h-[12vmin]',
  'text-white font-bold',
  'text-[6vmin]',
  'z-[1]',
  'pointer-events-none',
  'select-none webkit-user-select-none',
  props.$rotation === Rotation.Side || props.$rotation === Rotation.SideFlipped
    ? `left-[1vmax] top-1/4`
    : 'left-1/4 top-[1vmax]',
]);

type SettingsButtonProps = {
  onClick: () => void;
  rotation: Rotation;
  iconTheme: 'light' | 'dark';
};

const SettingsButton = ({
  onClick,
  rotation,
  iconTheme,
}: SettingsButtonProps) => {
  return (
    <SettingsButtonTwc
      onClick={onClick}
      $rotation={rotation}
      aria-label={`Settings`}
    >
      <Cog
        size="5vmin"
        data-contrast={iconTheme}
        className="data-[contrast=dark]:text-icons-dark data-[contrast=light]:text-icons-light"
      />
    </SettingsButtonTwc>
  );
};

const LifeCounterContentWrapper = twc.div`
  relative flex flex-grow flex-col items-center w-full h-full overflow-hidden`;

const LifeCounterWrapper = twc.div<RotationDivProps>((props) => [
  'relative flex items-center w-full h-full z-[1]',
  props.$rotation === Rotation.SideFlipped || props.$rotation === Rotation.Side
    ? `flex-row`
    : `flex-col`,
]);

const PlayerLostWrapper = twc.div<RotationDivProps>((props) => [
  'z-[1] flex absolute w-full h-full justify-center items-center pointer-events-none select-none webkit-user-select-none bg-lifeCounter-lostWrapper opacity-75',
  props.$rotation === Rotation.SideFlipped || props.$rotation === Rotation.Side
    ? `rotate-[${props.$rotation - 90}deg]`
    : '',
]);

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
  isStartingPlayer?: boolean;
  matchScore?: number;
};

const RECENT_DIFFERENCE_TTL = 3_000;

const LifeCounter = ({ player, opponents, matchScore }: LifeCounterProps) => {
  const { updatePlayer, updateLifeTotal } = usePlayers();
  const { settings, playing } = useGlobalSettings();
  const recentDifferenceTimerRef = useRef<NodeJS.Timeout | undefined>(
    undefined
  );

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
      analytics.trackEvent('open_player_menu_swipe');
      setShowPlayerMenu(true);
    },
    onSwipedUp: (e) => {
      e.event.stopPropagation();
      analytics.trackEvent('close_player_menu_swipe');
      setShowPlayerMenu(false);
    },

    swipeDuration: 500,
    onSwiping: (e) => e.event.stopPropagation(),
    rotationAngle,
  });
  const analytics = useAnalytics();

  useEffect(() => {
    if (recentDifference === 0) {
      clearTimeout(recentDifferenceTimerRef.current);
      return;
    }

    recentDifferenceTimerRef.current = setTimeout(() => {
      analytics.trackEvent('life_changed', {
        lifeChangedAmount: recentDifference,
      });
      setRecentDifference(0);
    }, RECENT_DIFFERENCE_TTL);

    return () => {
      clearTimeout(recentDifferenceTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentDifference]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (document.body.clientWidth > document.body.clientHeight)
        setIsLandscape(true);
      else setIsLandscape(false);
      return () => {
        // Cleanup: disconnect the ResizeObserver when the component unmounts.
        resizeObserver.disconnect();
      };
    });

    resizeObserver.observe(document.body);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document.body.clientHeight, document.body.clientWidth]);

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

  const amountOfPlayers = opponents.length + 1;

  return (
    <LifeCounterContentWrapper style={{ background: player.color }}>
      <LifeCounterWrapper
        $rotation={player.settings.rotation}
        style={{ rotate: `${calcRotation}deg` }}
        {...handlers}
      >
        {amountOfPlayers > 1 &&
          !playing &&
          settings.showStartingPlayer &&
          player.isStartingPlayer && <StartingPlayerCard player={player} />}
        {player.hasLost && (
          <PlayerLostWrapper $rotation={player.settings.rotation} />
        )}
        {matchScore !== undefined && matchScore > 0 && (
          <MatchScoreBadge
            $rotation={player.settings.rotation}
            style={{
              rotate:
                player.settings.rotation === Rotation.Side ||
                player.settings.rotation === Rotation.SideFlipped
                  ? `-90deg`
                  : '0deg',
            }}
          >
            {matchScore}
          </MatchScoreBadge>
        )}
        <CommanderDamageBar
          opponents={opponents}
          player={player}
          key={player.index}
          handleLifeChange={handleLifeChange}
        />
        {settings.showPlayerMenuCog && (
          <SettingsButton
            onClick={() => {
              analytics.trackEvent('open_player_menu_button');
              setShowPlayerMenu(!showPlayerMenu);
            }}
            rotation={player.settings.rotation}
            iconTheme={player.iconTheme}
          />
        )}
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
          onForfeit={toggleGameLost}
          totalPlayers={opponents.length + 1}
        />
      </LifeCounterWrapper>
    </LifeCounterContentWrapper>
  );
};

export default LifeCounter;
