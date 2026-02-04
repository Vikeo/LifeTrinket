import { useState, useRef, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Dialog } from './Dialog';
import { useAnalytics } from '../../Hooks/useAnalytics';
import { generateShareUrl } from '../../Utils/shareState';
import type { Player, LifeHistoryEvent } from '../../Types/Player';
import type { InitialGameSettings } from '../../Types/Settings';
import type { GameScore } from '../../Contexts/GlobalSettingsContext';

export const ShareDialog: React.FC<{
  dialogRef: React.MutableRefObject<HTMLDialogElement | null>;
  players: Player[];
  initialGameSettings: InitialGameSettings;
  startingPlayerIndex: number;
  gameScore?: GameScore;
  lifeHistory?: LifeHistoryEvent[];
  version: string;
}> = ({
  dialogRef,
  players,
  initialGameSettings,
  startingPlayerIndex,
  gameScore,
  lifeHistory,
  version,
}) => {
  const analytics = useAnalytics();
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>(
    'idle'
  );
  const [includeGameScore, setIncludeGameScore] = useState<boolean>(true);
  const [includeLifeHistory, setIncludeLifeHistory] = useState<boolean>(true);
  const urlInputRef = useRef<HTMLInputElement>(null);

  // Generate share URL based on checkbox selections
  const shareUrl = useMemo(() => {
    return generateShareUrl(
      players,
      initialGameSettings,
      startingPlayerIndex,
      includeGameScore ? gameScore : undefined,
      includeLifeHistory ? lifeHistory : undefined,
      version
    );
  }, [
    players,
    initialGameSettings,
    startingPlayerIndex,
    gameScore,
    lifeHistory,
    version,
    includeGameScore,
    includeLifeHistory,
  ]);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyStatus('copied');
      analytics.trackEvent('share_link_copied', {
        include_game_score: includeGameScore,
        include_life_history: includeLifeHistory,
      });

      // Reset status after 2 seconds
      setTimeout(() => {
        setCopyStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      setCopyStatus('error');

      // Try fallback method
      try {
        urlInputRef.current?.select();
        document.execCommand('copy');
        setCopyStatus('copied');
        analytics.trackEvent('share_link_copied_fallback');

        setTimeout(() => {
          setCopyStatus('idle');
        }, 2000);
      } catch (fallbackError) {
        console.error('Fallback copy also failed:', fallbackError);
        setTimeout(() => {
          setCopyStatus('idle');
        }, 2000);
      }
    }
  };

  return (
    <Dialog id="share-dialog" title="Share Game" dialogRef={dialogRef}>
      <div className="flex flex-col gap-6 py-4">
        {/* QR Code */}
        <div className="flex flex-col items-center gap-3">
          <div className="bg-white p-4 rounded-xl">
            <QRCodeSVG
              value={shareUrl}
              size={320}
              level="L"
              includeMargin={false}
            />
          </div>
          <p className="text-sm text-text-secondary text-center">
            Scan this QR code to load the game
          </p>
        </div>

        {/* Share options checkboxes */}
        <div className="flex flex-col gap-2 px-4 py-3 bg-background-paper rounded-lg border border-divider">
          <p className="text-sm font-medium text-text-primary mb-1">
            Include in share:
          </p>
          <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
            <input
              type="checkbox"
              checked={includeGameScore}
              onChange={(e) => setIncludeGameScore(e.target.checked)}
              className="w-4 h-4 cursor-pointer"
            />
            <span>Match Score</span>
          </label>

          <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
            <input
              type="checkbox"
              checked={includeLifeHistory}
              onChange={(e) => setIncludeLifeHistory(e.target.checked)}
              className="w-4 h-4 cursor-pointer"
            />
            <span>Life History</span>
            {lifeHistory && lifeHistory.length > 0 && (
              <span className="text-xs text-text-secondary">
                ({lifeHistory.length} events)
              </span>
            )}
          </label>
        </div>

        {/* URL Display and Copy */}
        <div className="flex flex-col gap-2">
          <label htmlFor="share-url" className="text-sm font-medium">
            Share Link
          </label>
          <div className="flex gap-2">
            <input
              id="share-url"
              ref={urlInputRef}
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-background-paper border border-divider rounded-lg text-sm font-mono truncate focus:outline-none focus:ring-2 focus:ring-primary-main"
            />
            <button
              onClick={handleCopyToClipboard}
              className="px-4 py-2 bg-primary-main text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2 whitespace-nowrap"
              disabled={copyStatus === 'copied'}
            >
              {copyStatus === 'copied' ? (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
          {copyStatus === 'error' && (
            <p className="text-sm text-red-500">
              Failed to copy. Please select and copy manually.
            </p>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-background-paper p-4 rounded-lg">
          <p className="text-sm text-text-secondary">
            <strong className="text-text-primary">How to share:</strong>
          </p>
          <ul className="text-sm text-text-secondary mt-2 space-y-1 list-disc list-inside">
            <li>Have another player scan the QR code</li>
            <li>Or copy the link and send it via text/email</li>
            <li>When opened, the game will automatically resume</li>
          </ul>
        </div>
      </div>
    </Dialog>
  );
};
