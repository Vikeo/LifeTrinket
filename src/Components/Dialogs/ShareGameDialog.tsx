import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Dialog } from './Dialog';
import { generateShareableUrl } from '../../Utils/gameStateSharing';
import { useAnalytics } from '../../Hooks/useAnalytics';

export const ShareGameDialog = ({
  dialogRef,
}: {
  dialogRef: React.MutableRefObject<HTMLDialogElement | null>;
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [shareableUrl, setShareableUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const analytics = useAnalytics();

  useEffect(() => {
    // Generate QR code when dialog opens
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleOpen = async () => {
      setIsLoading(true);
      setError('');
      setCopied(false);

      try {
        // Small delay to ensure all localStorage writes from useEffect have completed
        await new Promise(resolve => setTimeout(resolve, 50));

        // Generate the shareable URL
        const url = generateShareableUrl();
        setShareableUrl(url);

        // Generate QR code
        const qrDataUrl = await QRCode.toDataURL(url, {
          width: 300,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        });
        setQrCodeUrl(qrDataUrl);
        analytics.trackEvent('share_game_qr_generated');
      } catch (err) {
        console.error('Error generating QR code:', err);
        setError('Failed to generate QR code. Please try again.');
        analytics.trackEvent('share_game_qr_error');
      } finally {
        setIsLoading(false);
      }
    };

    // Listen for dialog open events
    const observer = new MutationObserver(() => {
      if (dialog.open) {
        handleOpen();
      }
    });

    observer.observe(dialog, { attributes: true, attributeFilter: ['open'] });

    return () => observer.disconnect();
  }, [dialogRef, analytics]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setCopied(true);
      analytics.trackEvent('share_game_url_copied');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
      analytics.trackEvent('share_game_url_copy_error');
    }
  };

  return (
    <Dialog id="share-game" title="Share Game" dialogRef={dialogRef}>
      <div className="flex flex-col items-center gap-4 py-4">
        {isLoading && (
          <div className="text-text-secondary">Generating QR code...</div>
        )}

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {!isLoading && !error && qrCodeUrl && (
          <>
            <div className="bg-white p-4 rounded-lg">
              <img src={qrCodeUrl} alt="QR Code" className="w-full h-auto" />
            </div>

            <div className="text-text-secondary text-sm text-center max-w-full">
              Scan this QR code to share the current game state
            </div>

            <div className="w-full flex flex-col gap-2">
              <div className="text-xs text-text-secondary text-center">
                Or copy the link:
              </div>
              <div className="flex gap-2 items-center w-full">
                <input
                  type="text"
                  value={shareableUrl}
                  readOnly
                  className="flex-1 bg-secondary-main text-text-primary text-xs px-2 py-1 rounded-md border-none outline-none overflow-hidden text-ellipsis"
                  onClick={(e) => e.currentTarget.select()}
                />
                <button
                  onClick={handleCopyUrl}
                  className="bg-primary-main px-3 py-1 rounded-md text-sm font-semibold hover:bg-primary-dark transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </>
        )}

        <button
          className="mt-2 bg-primary-main px-4 py-2 rounded-md font-semibold hover:bg-primary-dark transition-colors"
          onClick={() => {
            analytics.trackEvent('share_game_dialog_closed');
            dialogRef.current?.close();
          }}
        >
          Close
        </button>
      </div>
    </Dialog>
  );
};
