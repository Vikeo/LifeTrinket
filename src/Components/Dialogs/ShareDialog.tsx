import { useState, useRef, useMemo, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Dialog } from './Dialog';
import { useAnalytics } from '../../Hooks/useAnalytics';
import { generateShareUrl, estimateEncodedSize } from '../../Utils/shareState';
import {
  createShortUrl,
  generateShortShareUrl,
} from '../../Utils/firebaseShortener';
import { sharedGameStateSchema } from '../../Types/SharedState';
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
  const [shortUrlLoading, setShortUrlLoading] = useState<boolean>(false);
  const [shortUrlError, setShortUrlError] = useState<string | null>(null);
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  // Generate share URL based on checkbox selections
  // If short URL is available, use that; otherwise use direct encoding
  const shareUrl = useMemo(() => {
    if (shortUrl) {
      return shortUrl;
    }
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
    shortUrl,
  ]);

  // Calculate data size
  const dataSize = useMemo(() => {
    return estimateEncodedSize(
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

  // Format size for display
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} bytes`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  // Check if data is too large for QR code (max ~2953 bytes for level L)
  // But if we have a short URL, it's never too large
  const isTooLarge = dataSize > 2900 && !shortUrl;

  // Determine QR code size based on data size
  // Larger data needs larger QR code for readability
  const qrSize = useMemo(() => {
    if (dataSize < 500) return 280;
    if (dataSize < 1000) return 360;
    return 400;
  }, [dataSize]);

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

  const handleCreateShortUrl = useCallback(async () => {
    setShortUrlLoading(true);
    setShortUrlError(null);

    try {
      // Create game state object
      const gameState = sharedGameStateSchema.parse({
        version,
        initialGameSettings,
        players,
        gameScore: includeGameScore ? gameScore : undefined,
        lifeHistory: includeLifeHistory ? lifeHistory : undefined,
        startingPlayerIndex,
        timestamp: Date.now(),
      });

      // Upload to Firestore and get short ID
      const shortId = await createShortUrl(gameState);

      // Generate short URL
      const generatedShortUrl = generateShortShareUrl(shortId);
      setShortUrl(generatedShortUrl);

      analytics.trackEvent('short_url_created', {
        data_size: dataSize,
        include_game_score: includeGameScore,
        include_life_history: includeLifeHistory,
      });
    } catch (error) {
      console.error('Failed to create short URL:', error);
      setShortUrlError(
        error instanceof Error
          ? error.message
          : 'Failed to create short URL. Please try again.'
      );
      analytics.trackEvent('short_url_failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setShortUrlLoading(false);
    }
  }, [
    players,
    initialGameSettings,
    startingPlayerIndex,
    gameScore,
    lifeHistory,
    version,
    includeGameScore,
    includeLifeHistory,
    dataSize,
    analytics,
  ]);

  return (
    <Dialog id="share-dialog" title="Share Game" dialogRef={dialogRef}>
      <div className="flex flex-col gap-6 py-4">
        {/* QR Code */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-text-secondary text-center">
            Scan this QR code to load the game
          </p>
          <div
            className={`p-4 rounded-xl ${isTooLarge ? 'bg-red-500/10' : 'bg-white'}`}
            style={{ width: qrSize + 32, height: qrSize + 32 }}
          >
            {isTooLarge ? (
              // Error state when data is too large
              <div className="flex flex-col items-center justify-center gap-3 w-full h-full">
                <svg
                  className="w-16 h-16 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div className="text-center">
                  <p className="text-sm font-medium text-text-primary mb-1">
                    Data Too Large
                  </p>
                  <p className="text-xs text-text-secondary">
                    {formatSize(dataSize)} (max ~2.9 KB)
                  </p>
                </div>
              </div>
            ) : (
              <QRCodeSVG
                value={shareUrl}
                size={qrSize}
                level="L"
                includeMargin={false}
              />
            )}
          </div>
          <div className="flex flex-col items-center gap-1">
            {!isTooLarge && (
              <p className="text-xs text-text-secondary">
                Data size: {formatSize(dataSize)}
              </p>
            )}
            {dataSize > 2000 && !isTooLarge && (
              <p className="text-xs text-yellow-500 text-center px-4">
                ⚠️ Large QR code - uncheck options below to reduce size
              </p>
            )}
            {isTooLarge && (
              <p className="text-xs text-red-400 text-center px-4">
                Uncheck "Life History" below to generate QR code
              </p>
            )}
          </div>
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
              className="px-4 py-2 bg-primary-main text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
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

        {/* URL Shortener Section */}
        {isTooLarge && !shortUrl && (
          <div className="bg-primary-main/10 p-4 rounded-lg border border-primary-main/30">
            <p className="text-sm text-text-primary font-medium mb-2">
              🔗 Create Shortened URL
            </p>
            <p className="text-sm text-text-secondary mb-3">
              Your game data ({formatSize(dataSize)}) exceeds the QR code limit.
              Create a shortened URL to generate a scannable QR code!
            </p>
            <p className="text-xs text-text-secondary mb-3 italic">
              ⏱️ Links expire after 30 minutes
            </p>
            <button
              onClick={handleCreateShortUrl}
              disabled={shortUrlLoading}
              className="w-full px-4 py-2 bg-primary-main text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {shortUrlLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating shortened URL...
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
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  Create Shortened URL
                </>
              )}
            </button>
            {shortUrlError && (
              <p className="text-sm text-red-500 mt-2">{shortUrlError}</p>
            )}
          </div>
        )}

        {/* Instructions */}
        {isTooLarge && !shortUrl ? (
          <div className="bg-background-paper p-4 rounded-lg border border-divider">
            <p className="text-sm text-text-primary font-medium mb-2">
              💡 Alternative Solutions
            </p>
            <ul className="text-sm text-text-secondary mt-1 space-y-1 list-disc list-inside">
              <li>Uncheck "Life History" above to reduce data size</li>
              <li>Or copy the share link and send it directly</li>
            </ul>
          </div>
        ) : shortUrl ? (
          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
            <p className="text-sm text-text-primary font-medium mb-2">
              ✅ Shortened URL Created!
            </p>
            <p className="text-sm text-text-secondary">
              Your game has been uploaded and a QR code has been generated. The shortened URL is ready to share!
            </p>
          </div>
        ) : (
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
        )}
      </div>
    </Dialog>
  );
};
