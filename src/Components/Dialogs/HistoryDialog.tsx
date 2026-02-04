import { useState, useEffect, useCallback } from 'react';
import { Dialog } from './Dialog';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { useAnalytics } from '../../Hooks/useAnalytics';
import { LifeHistoryEvent } from '../../Types/Player';

export const HistoryDialog: React.FC<{
  dialogRef: React.MutableRefObject<HTMLDialogElement | null>;
}> = ({ dialogRef }) => {
  const { lifeHistory, clearLifeHistory } = useGlobalSettings();
  const analytics = useAnalytics();
  const [now, setNow] = useState(() => Date.now());

  // Update timestamp every 10 seconds for relative time display
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all life history?')) {
      clearLifeHistory();
      analytics.trackEvent('life_history_cleared');
      dialogRef.current?.close();
    }
  };

  const formatTimestamp = useCallback((timestamp: number) => {
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return `${seconds}s ago`;
    }
  }, [now]);

  const formatDifference = (difference: number) => {
    return difference > 0 ? `+${difference}` : `${difference}`;
  };

  const getDifferenceColor = (difference: number) => {
    return difference > 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <Dialog id="history-dialog" title="Life History" dialogRef={dialogRef}>
      <div className="flex flex-col gap-4 py-4">
        {/* Header with clear button */}
        {lifeHistory.length > 0 && (
          <div className="flex justify-between items-center">
            <p className="text-sm text-text-secondary">
              {lifeHistory.length} {lifeHistory.length === 1 ? 'event' : 'events'} recorded
            </p>
            <button
              onClick={handleClearHistory}
              className="px-3 py-1.5 text-sm bg-primary-main text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Clear History
            </button>
          </div>
        )}

        {/* History list */}
        {lifeHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <svg
              className="w-16 h-16 text-text-secondary opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-text-secondary text-center">
              No life changes recorded yet.
              <br />
              Changes will appear here once you start playing.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
            {[...lifeHistory].reverse().map((event: LifeHistoryEvent, index: number) => {
              // Calculate total commander damage and self-inflicted change
              const totalCommanderDamage = event.damageSources?.reduce((sum, source) => sum + source.amount, 0) || 0;
              const selfInflictedChange = event.difference - totalCommanderDamage;

              return (
                <div
                  key={lifeHistory.length - index - 1}
                  className="flex items-center gap-3 p-3 bg-background-paper rounded-lg border border-divider"
                >
                  {/* Player indicator */}
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: event.playerColor }}
                  />

                  {/* Event details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {event.playerName}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {event.oldTotal} → {event.newTotal}
                      <span className={`ml-2 font-medium ${getDifferenceColor(event.difference)}`}>
                        {formatDifference(event.difference)}
                      </span>
                    </p>

                    {/* Damage sources breakdown */}
                    {event.damageSources && event.damageSources.length > 0 && (
                      <div className="flex flex-col gap-0.5 mt-1">
                        {event.damageSources.map((source, sourceIndex) => (
                          <div key={sourceIndex} className="flex items-center gap-1.5">
                            <div
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ backgroundColor: source.opponentColor }}
                            />
                            <p className="text-xs text-text-secondary italic">
                              {source.opponentName}
                              {source.isPartner && ' (Partner)'}:
                              <span className={`ml-1 font-medium ${getDifferenceColor(source.amount)}`}>
                                {formatDifference(source.amount)}
                              </span>
                            </p>
                          </div>
                        ))}
                        {/* Show self-inflicted change if it exists */}
                        {selfInflictedChange !== 0 && (
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full flex-shrink-0 bg-text-secondary opacity-50" />
                            <p className="text-xs text-text-secondary italic">
                              Self:
                              <span className={`ml-1 font-medium ${getDifferenceColor(selfInflictedChange)}`}>
                                {formatDifference(selfInflictedChange)}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Timestamp */}
                  <p className="text-xs text-text-secondary whitespace-nowrap">
                    {formatTimestamp(event.timestamp)}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Tournament note */}
        {lifeHistory.length > 0 && (
          <div className="bg-background-paper border border-divider p-3 rounded-lg">
            <p className="text-xs text-text-secondary">
              <strong className="text-text-primary">Tournament Play:</strong> This history can be shown to judges to resolve disputes.
              History is automatically cleared when you start a new game.
            </p>
          </div>
        )}
      </div>
    </Dialog>
  );
};
