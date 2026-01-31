import { useCallback, useMemo } from 'react';
import { faro, telemetryEnabled } from '../Utils/telemetry';

/**
 * Hook for tracking user actions with Grafana Faro
 *
 * User actions allow tracking key user interactions and following
 * end-to-end user journeys, attaching context to related signals
 * like HTTP requests and performance metrics.
 */
export const useUserActions = () => {
  /**
   * Start a user action to track an interaction
   * @param name - Name of the user action (e.g., 'life_change', 'game_start')
   * @param attributes - Custom attributes to attach to the user action
   * @param options - Optional configuration for the user action
   */
  const startUserAction = useCallback(
    (
      name: string,
      attributes?: Record<string, string | number>,
      options?: {
        triggerName?: string;
        importance?: 'critical' | 'normal';
      }
    ) => {
      if (!telemetryEnabled || !faro) {
        console.info('[User Action]', name, attributes, options);
        return;
      }

      // Convert all attribute values to strings (Faro only accepts strings)
      const stringAttributes = attributes
        ? Object.fromEntries(
            Object.entries(attributes).map(([key, value]) => [
              key,
              String(value),
            ])
          )
        : undefined;

      const config = options
        ? {
            triggerName: options.triggerName,
            importance: options.importance,
          }
        : undefined;

      faro.api.startUserAction(name, stringAttributes, config);
    },
    []
  );

  /**
   * Track a life change user action
   */
  const trackLifeChangeAction = useCallback(
    (change: number, playerIndex: number) => {
      const actionType = change > 0 ? 'life_gain' : 'life_loss';
      startUserAction(
        actionType,
        {
          amount: Math.abs(change),
          player_index: playerIndex,
        },
        {
          triggerName: 'tap_or_longpress',
          importance: 'normal',
        }
      );
    },
    [startUserAction]
  );

  /**
   * Track a commander damage user action
   */
  const trackCommanderDamageAction = useCallback(
    (
      amount: number,
      fromPlayerIndex: number,
      toPlayerIndex: number,
      isPartner: boolean
    ) => {
      startUserAction(
        'commander_damage',
        {
          amount,
          from_player: fromPlayerIndex,
          to_player: toPlayerIndex,
          is_partner: isPartner ? 'true' : 'false',
        },
        {
          triggerName: 'counter_interaction',
          importance: 'normal',
        }
      );
    },
    [startUserAction]
  );

  /**
   * Track an extra counter change user action
   */
  const trackCounterChangeAction = useCallback(
    (
      counterType: string,
      change: number,
      playerIndex: number
    ) => {
      startUserAction(
        'counter_change',
        {
          counter_type: counterType,
          change,
          player_index: playerIndex,
        },
        {
          triggerName: 'counter_interaction',
          importance: 'normal',
        }
      );
    },
    [startUserAction]
  );

  /**
   * Track a game start user action
   */
  const trackGameStartAction = useCallback(
    (playerCount: number, startingLife: number) => {
      startUserAction(
        'game_start',
        {
          player_count: playerCount,
          starting_life: startingLife,
        },
        {
          triggerName: 'button_click',
          importance: 'critical',
        }
      );
    },
    [startUserAction]
  );

  /**
   * Track a game end user action
   */
  const trackGameEndAction = useCallback(
    (winnerIndex: number | null, gameDurationSeconds: number) => {
      startUserAction(
        'game_end',
        {
          winner: winnerIndex !== null ? String(winnerIndex) : 'none',
          duration_seconds: gameDurationSeconds,
        },
        {
          triggerName: 'game_completion',
          importance: 'critical',
        }
      );
    },
    [startUserAction]
  );

  /**
   * Track a menu interaction user action
   */
  const trackMenuInteraction = useCallback(
    (menuType: string, action: string) => {
      startUserAction(
        'menu_interaction',
        {
          menu_type: menuType,
          action,
        },
        {
          triggerName: 'user_interaction',
          importance: 'normal',
        }
      );
    },
    [startUserAction]
  );

  return useMemo(
    () => ({
      startUserAction,
      trackLifeChangeAction,
      trackCommanderDamageAction,
      trackCounterChangeAction,
      trackGameStartAction,
      trackGameEndAction,
      trackMenuInteraction,
      telemetryEnabled,
    }),
    [
      startUserAction,
      trackLifeChangeAction,
      trackCommanderDamageAction,
      trackCounterChangeAction,
      trackGameStartAction,
      trackGameEndAction,
      trackMenuInteraction,
    ]
  );
};
