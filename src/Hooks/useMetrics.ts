import { useCallback, useMemo } from 'react';
import { faro, telemetryEnabled } from '../Utils/telemetry';

export const useMetrics = () => {
  const trackLifeLost = useCallback((amount: number, attributes?: Record<string, string | number>) => {
    if (!telemetryEnabled || !faro) {
      console.info('[Metrics] life.lost:', amount, attributes);
      return;
    }

    // Push measurement to Faro
    faro.api.pushMeasurement(
      {
        type: 'life_lost',
        values: {
          amount,
        },
      },
      {
        context: attributes,
      }
    );
  }, []);

  const trackLifeGained = useCallback((amount: number, attributes?: Record<string, string | number>) => {
    if (!telemetryEnabled || !faro) {
      console.info('[Metrics] life.gained:', amount, attributes);
      return;
    }

    faro.api.pushMeasurement(
      {
        type: 'life_gained',
        values: {
          amount,
        },
      },
      {
        context: attributes,
      }
    );
  }, []);

  const trackCommanderDamage = useCallback((amount: number, attributes?: Record<string, string | number>) => {
    if (!telemetryEnabled || !faro) {
      console.info('[Metrics] commander_damage.dealt:', amount, attributes);
      return;
    }

    faro.api.pushMeasurement(
      {
        type: 'commander_damage_dealt',
        values: {
          amount,
        },
      },
      {
        context: attributes,
      }
    );
  }, []);

  const trackExtraCounterChange = useCallback((
    amount: number,
    counterType: string,
    direction: 'increased' | 'decreased',
    attributes?: Record<string, string | number>
  ) => {
    if (!telemetryEnabled || !faro) {
      console.info('[Metrics] extra_counter.changed:', { amount, counterType, direction, ...attributes });
      return;
    }

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
          ...attributes,
        },
      }
    );
  }, []);

  const trackGameStarted = useCallback((playerCount: number, attributes?: Record<string, string | number>) => {
    if (!telemetryEnabled || !faro) {
      console.info('[Metrics] games.started:', { player_count: playerCount, ...attributes });
      return;
    }

    // Track as an event for game start
    faro.api.pushEvent('game_started', {
      player_count: playerCount,
      ...attributes,
    });
  }, []);

  return useMemo(
    () => ({
      trackLifeLost,
      trackLifeGained,
      trackCommanderDamage,
      trackExtraCounterChange,
      trackGameStarted,
      telemetryEnabled,
    }),
    [trackLifeLost, trackLifeGained, trackCommanderDamage, trackExtraCounterChange, trackGameStarted]
  );
};
