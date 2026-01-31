import { useCallback, useMemo } from 'react';
import { faro, telemetryEnabled } from '../Utils/telemetry';

export const useMetrics = () => {
  const trackLifeLost = useCallback(
    (amount: number, attributes?: Record<string, string | number>) => {
      if (!telemetryEnabled || !faro) {
        console.info('[Metrics] life.lost:', amount, attributes);
        return;
      }

      // Convert all attribute values to strings (Faro only accepts strings in context)
      const context = attributes
        ? Object.fromEntries(
            Object.entries(attributes).map(([key, value]) => [
              key,
              String(value),
            ])
          )
        : undefined;

      // Push measurement to Faro
      faro.api.pushMeasurement(
        {
          type: 'life_lost',
          values: {
            amount,
          },
        },
        {
          context,
        }
      );
    },
    []
  );

  const trackLifeGained = useCallback(
    (amount: number, attributes?: Record<string, string | number>) => {
      if (!telemetryEnabled || !faro) {
        console.info('[Metrics] life.gained:', amount, attributes);
        return;
      }

      // Convert all attribute values to strings (Faro only accepts strings in context)
      const context = attributes
        ? Object.fromEntries(
            Object.entries(attributes).map(([key, value]) => [
              key,
              String(value),
            ])
          )
        : undefined;

      faro.api.pushMeasurement(
        {
          type: 'life_gained',
          values: {
            amount,
          },
        },
        {
          context,
        }
      );
    },
    []
  );

  const trackCommanderDamage = useCallback(
    (amount: number, attributes?: Record<string, string | number>) => {
      if (!telemetryEnabled || !faro) {
        console.info('[Metrics] commander_damage.dealt:', amount, attributes);
        return;
      }

      // Convert all attribute values to strings (Faro only accepts strings in context)
      const context = attributes
        ? Object.fromEntries(
            Object.entries(attributes).map(([key, value]) => [
              key,
              String(value),
            ])
          )
        : undefined;

      faro.api.pushMeasurement(
        {
          type: 'commander_damage_dealt',
          values: {
            amount,
          },
        },
        {
          context,
        }
      );
    },
    []
  );

  const trackExtraCounterChange = useCallback(
    (
      amount: number,
      counterType: string,
      direction: 'increased' | 'decreased',
      attributes?: Record<string, string | number>
    ) => {
      if (!telemetryEnabled || !faro) {
        console.info('[Metrics] extra_counter.changed:', {
          amount,
          counterType,
          direction,
          ...attributes,
        });
        return;
      }

      // Convert all attribute values to strings (Faro only accepts strings in context)
      const stringAttributes = attributes
        ? Object.fromEntries(
            Object.entries(attributes).map(([key, value]) => [
              key,
              String(value),
            ])
          )
        : {};

      faro.api.pushMeasurement(
        {
          type: 'extra_counter_changed',
          values: {
            amount,
          },
        },
        {
          context: {
            counter_type: counterType,
            direction,
            ...stringAttributes,
          },
        }
      );
    },
    []
  );

  const trackGameStarted = useCallback(
    (playerCount: number, attributes?: Record<string, string | number>) => {
      if (!telemetryEnabled || !faro) {
        console.info('[Metrics] games.started:', {
          player_count: playerCount,
          ...attributes,
        });
        return;
      }

      // Convert all attribute values to strings (Faro only accepts strings in context)
      const stringAttributes = attributes
        ? Object.fromEntries(
            Object.entries(attributes).map(([key, value]) => [
              key,
              String(value),
            ])
          )
        : {};

      // Track as an event for game start
      faro.api.pushEvent('game_started', {
        player_count: String(playerCount),
        ...stringAttributes,
      });
    },
    []
  );

  // Generic event tracking to mirror Firebase Analytics
  const trackEvent = useCallback(
    (eventName: string, eventParams?: Record<string, unknown>) => {
      if (!telemetryEnabled || !faro) {
        console.info(`[Metrics] ${eventName}:`, eventParams);
        return;
      }

      // Convert all params to strings (Faro only accepts strings in attributes)
      const stringParams = eventParams
        ? Object.fromEntries(
            Object.entries(eventParams).map(([key, value]) => [
              key,
              String(value),
            ])
          )
        : {};

      faro.api.pushEvent(eventName, stringParams);
    },
    []
  );

  return useMemo(
    () => ({
      trackLifeLost,
      trackLifeGained,
      trackCommanderDamage,
      trackExtraCounterChange,
      trackGameStarted,
      trackEvent,
      telemetryEnabled,
    }),
    [
      trackLifeLost,
      trackLifeGained,
      trackCommanderDamage,
      trackExtraCounterChange,
      trackGameStarted,
      trackEvent,
    ]
  );
};
