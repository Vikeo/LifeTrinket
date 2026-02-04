import { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { twc } from 'react-twc';
import { useAnalytics } from '../../Hooks/useAnalytics';
import { useMetrics } from '../../Hooks/useMetrics';
import { useUserActions } from '../../Hooks/useUserActions';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { usePlayers } from '../../Hooks/usePlayers';
import { recentDifferenceTTL } from '../../Data/constants';
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

type MatchScoreBadgeProps = RotationDivProps & {
  $useCommanderDamage: boolean;
};

const MatchScoreBadge = twc.div<MatchScoreBadgeProps>((props) => [
  'absolute flex items-center justify-center',
  'bg-black/70 backdrop-blur-sm',
  'rounded-full',
  'w-[5vmin] h-[5vmin]',
  'text-white font-bold',
  'text-[3vmin]',
  'z-[1]',
  'pointer-events-none',
  'select-none webkit-user-select-none',
  props.$rotation === Rotation.Side || props.$rotation === Rotation.SideFlipped
    ? `left-[6.5vmax] bottom-[1vmax]`
    : props.$useCommanderDamage
      ? 'left-[0.5vmax] top-[11.5vmin]'
      : 'left-[0.5vmax] top-[1vmax]',
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

const LifeCounter = ({ player, opponents, matchScore }: LifeCounterProps) => {
  const { updatePlayer, updateLifeTotal } = usePlayers();
  const { settings, playing, addLifeHistoryEvent } = useGlobalSettings();
  const metrics = useMetrics();
  const userActions = useUserActions();
  const recentDifferenceTimerRef = useRef<NodeJS.Timeout | undefined>(
    undefined
  );

  const [showPlayerMenu, setShowPlayerMenu] = useState(false);
  const [recentDifference, setRecentDifference] = useState(0);
  const [differenceKey, setDifferenceKey] = useState(Date.now());
  const [isLandscape, setIsLandscape] = useState(false);

  // Track initial state for history batching
  const initialLifeTotalRef = useRef<number | null>(null);
  const damageSourcesMapRef = useRef<Map<string, {
    opponentId: number;
    opponentName: string;
    opponentColor: string;
    isPartner: boolean;
    amount: number;
  }>>(new Map());

  const calcRot = player.isSide
    ? player.settings.rotation - 180
    : player.settings.rotation;

  const rotationAngle = isLandscape ? calcRot : calcRot + 90;

  const handlers = useSwipeable({
    trackMouse: true,
    onSwipedDown: (e) => {
      e.event.stopPropagation();
      analytics.trackEvent('open_player_menu_swipe');
      metrics.trackEvent('open_player_menu_swipe');
      userActions.trackMenuInteraction('player_menu', 'open_swipe');
      setShowPlayerMenu(true);
    },
    onSwipedUp: (e) => {
      e.event.stopPropagation();
      analytics.trackEvent('close_player_menu_swipe');
      metrics.trackEvent('close_player_menu_swipe');
      userActions.trackMenuInteraction('player_menu', 'close_swipe');
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
      initialLifeTotalRef.current = null;
      damageSourcesMapRef.current.clear();
      return;
    }

    // Capture initial life total when difference starts accumulating
    if (initialLifeTotalRef.current === null) {
      initialLifeTotalRef.current = player.lifeTotal - recentDifference;
    }

    recentDifferenceTimerRef.current = setTimeout(() => {
      // Track life gained and lost separately for better analytics insights
      if (recentDifference > 0) {
        // Start user action first to capture the measurement within its context
        userActions.trackLifeChangeAction(recentDifference, player.index);

        // Then push measurement and event (these will be associated with the user action)
        analytics.trackEvent('life_gained', {
          amount: recentDifference,
        });
        metrics.trackLifeGained(recentDifference);
      } else if (recentDifference < 0) {
        // Start user action first to capture the measurement within its context
        userActions.trackLifeChangeAction(recentDifference, player.index);

        // Then push measurement and event (these will be associated with the user action)
        analytics.trackEvent('life_lost', {
          amount: Math.abs(recentDifference),
        });
        metrics.trackLifeLost(Math.abs(recentDifference));
      }

      // Record history after animation completes
      if (initialLifeTotalRef.current !== null) {
        const finalLifeTotal = player.lifeTotal;
        const damageSources = Array.from(damageSourcesMapRef.current.values());

        addLifeHistoryEvent({
          playerId: player.index,
          playerName: player.name || `Player ${player.index + 1}`,
          playerColor: player.color,
          oldTotal: initialLifeTotalRef.current,
          newTotal: finalLifeTotal,
          difference: finalLifeTotal - initialLifeTotalRef.current,
          timestamp: Date.now(),
          damageSources: damageSources.length > 0 ? damageSources : undefined,
        });

        initialLifeTotalRef.current = null;
        damageSourcesMapRef.current.clear();
      }

      setRecentDifference(0);
    }, recentDifferenceTTL);

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

  const handleLifeChange = (
    updatedLifeTotal: number,
    commanderDamageContext?: {
      opponentId: number;
      opponentName: string;
      opponentColor: string;
      isPartner: boolean;
    }
  ) => {
    const difference = updateLifeTotal(player, updatedLifeTotal);

    // Accumulate commander damage sources
    if (commanderDamageContext) {
      const key = `${commanderDamageContext.opponentId}-${commanderDamageContext.isPartner}`;
      const existing = damageSourcesMapRef.current.get(key);

      if (existing) {
        // Accumulate amount for this source
        existing.amount += difference;
      } else {
        // Add new damage source
        damageSourcesMapRef.current.set(key, {
          ...commanderDamageContext,
          amount: difference,
        });
      }
    }

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
        <CommanderDamageBar
          opponents={opponents}
          player={player}
          key={player.index}
          handleLifeChange={handleLifeChange}
        />
        {matchScore !== undefined && matchScore > 0 && (
          <MatchScoreBadge
            $rotation={player.settings.rotation}
            $useCommanderDamage={player.settings.useCommanderDamage}
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
        {settings.showPlayerMenuCog && (
          <SettingsButton
            onClick={() => {
              analytics.trackEvent('open_player_menu_button');
              metrics.trackEvent('open_player_menu_button');
              userActions.trackMenuInteraction('player_menu', 'open_button');
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
