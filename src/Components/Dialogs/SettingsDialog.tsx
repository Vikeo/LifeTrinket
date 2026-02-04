import { useRef, useState } from 'react';
import { twc } from 'react-twc';
import { useAnalytics } from '../../Hooks/useAnalytics';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { usePlayers } from '../../Hooks/usePlayers';
import { PreStartMode } from '../../Types/Settings';
import { InstallPWAButton } from '../Misc/InstallPWAButton';
import { Separator } from '../Misc/Separator';
import { Paragraph } from '../Misc/TextComponents';
import { ToggleButton } from '../Misc/ToggleButton';
import { Dialog } from './Dialog';
import { ShareDialog } from './ShareDialog';

const SettingContainer = twc.div`w-full flex flex-col mb-2`;

const ToggleContainer = twc.div`flex flex-row justify-between items-center -mb-1`;

const Description = twc.p`mr-16 text-xs text-left text-text-secondary mt-1`;

const baseGithubReleasesUrl =
  'https://github.com/Vikeo/LifeTrinket/releases/tag/';

export const SettingsDialog = ({
  dialogRef,
}: {
  dialogRef: React.MutableRefObject<HTMLDialogElement | null>;
}) => {
  const {
    settings,
    setSettings,
    isPWA,
    version,
    initialGameSettings,
    gameScore,
    lifeHistory,
  } = useGlobalSettings();
  const { players, startingPlayerIndex } = usePlayers();
  const analytics = useAnalytics();

  const shareDialogRef = useRef<HTMLDialogElement | null>(null);

  const handleShareGame = () => {
    try {
      analytics.trackEvent('game_shared');
      shareDialogRef.current?.showModal();
    } catch (error) {
      console.error('Failed to open share dialog:', error);
      analytics.trackEvent('game_share_failed');
    }
  };

  const hasGameToShare = players && players.length > 0;

  return (
    <>
      <Dialog id="settings" title="⚙️ Settings ⚙️" dialogRef={dialogRef}>
        <div className="flex flex-col mb-2 w-full">
          <div className="text-text-primary flex items-center gap-2">
            Current version: {version.installedVersion}{' '}
            {version.isLatest && (
              <span className="text-sm text-text-secondary">(latest)</span>
            )}
            <div className="text-xs text-text-primary opacity-75">
              (
              <a
                href={baseGithubReleasesUrl + version.installedVersion}
                target="_blank"
                className="underline"
                onClick={() => {
                  analytics.trackEvent(
                    `current_change_log_clicked_v${version.installedVersion}`
                  );
                }}
              >
                Release notes
              </a>
              )
            </div>
          </div>
          {!version.isLatest && version.remoteVersion && (
            <>
              <div className="flex gap-2 items-center mt-2">
                <Paragraph className="text-text-secondary">
                  {version.remoteVersion} available!
                </Paragraph>
                <div className="text-xs text-text-primary opacity-75">
                  (
                  <a
                    href={baseGithubReleasesUrl + version.remoteVersion}
                    target="_blank"
                    className="underline"
                    onClick={() => {
                      analytics.trackEvent(
                        `new_change_log_clicked_v${version.remoteVersion}`
                      );
                    }}
                  >
                    Release notes
                  </a>
                  )
                </div>
              </div>
              <button
                className="flex justify-center items-center self-start mt-2 bg-primary-main px-3 py-1 rounded-md"
                onClick={() => {
                  {
                    analytics.trackEvent(`pressed_update`, {
                      toVersion: version.remoteVersion,
                      fromVersion: version.installedVersion,
                    });
                    window?.location?.reload();
                  }
                }}
              >
                <span className="text-sm">Update</span>
                <span className="text-xs">&nbsp;(reload app)</span>
              </button>
            </>
          )}
        </div>
        <Separator height="1px" />

        {/* Share Game Section */}
        <SettingContainer>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
              <label>Share Game</label>
              <button
                onClick={handleShareGame}
                disabled={!hasGameToShare}
                className="px-4 py-2 bg-primary-main text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
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
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Share via QR
              </button>
            </div>
            <Description>
              Generate a QR code to share your current game state with other
              players. They can scan it to load the exact same game.
              {!hasGameToShare && (
                <span className="block mt-1 text-red-500">
                  Start a game first to enable sharing.
                </span>
              )}
            </Description>
          </div>
        </SettingContainer>
        <Separator height="1px" />

        <SettingContainer>
          <ToggleContainer>
            <label>Show Player Menu Cog</label>
            <ToggleButton
              checked={settings.showPlayerMenuCog}
              onChange={() => {
                setSettings({
                  ...settings,
                  showPlayerMenuCog: !settings.showPlayerMenuCog,
                });
              }}
            />
          </ToggleContainer>
          <Description>
            A cog on the top right of each player's card will be shown if this
            is enabled.
          </Description>
        </SettingContainer>
        <SettingContainer>
          <ToggleContainer>
            <label>Show Start Player</label>
            <ToggleButton
              checked={settings.showStartingPlayer}
              onChange={() => {
                setSettings({
                  ...settings,
                  showStartingPlayer: !settings.showStartingPlayer,
                });
              }}
            />
          </ToggleContainer>
          <Description>
            On start or reset of game, will pick a random starting player,
            according to the <b>Pre-Start mode</b>
          </Description>
        </SettingContainer>
        <SettingContainer>
          <div className="flex flex-row justify-between items-center mb-1">
            <label htmlFor="pre-start-modes">Player selection style</label>
            <select
              name="pre-start-modes"
              id="pre-start-modes"
              value={settings.preStartMode}
              className="bg-secondary-main border-none outline-none text-text-primary rounded-md p-1 text-xs disabled:saturate-50 font-semibold"
              onChange={(e) => {
                setSettings({
                  ...settings,
                  preStartMode: e.target.value as PreStartMode,
                });
              }}
              disabled={!settings.showStartingPlayer}
            >
              <option value={PreStartMode.None}>Instant</option>
              <option value={PreStartMode.RandomKing}>Royal Shuffle</option>
              <option value={PreStartMode.FingerGame}>Touch Roulette</option>
              <option value={PreStartMode.Trivia}>Group Trivia</option>
            </select>
          </div>
          <div className="text-xs text-left text-text-secondary">
            Different ways to determine the starting player before the game
            starts.
          </div>

          {settings.preStartMode === PreStartMode.None && (
            <div className="text-xs text-left text-text-secondary mt-1">
              <span className="text-text-primary">Instant:</span> A random
              starting player will simply be shown on start.
            </div>
          )}
          {settings.preStartMode === PreStartMode.RandomKing && (
            <div className="text-xs text-left text-text-secondary mt-1">
              <span className="text-text-primary">Royal Shuffle:</span> Randomly
              pass a crown between all players, press the screen to stop it. The
              player who has the crown when it stops gets to start.
            </div>
          )}
          {settings.preStartMode === PreStartMode.FingerGame && (
            <div className="text-xs text-left text-text-secondary mt-1">
              <span className="text-text-primary">Touch Roulette:</span> All
              players put a finger on the screen, one will be chosen at random.
            </div>
          )}

          {settings.preStartMode === PreStartMode.Trivia && (
            <div className="text-xs text-left text-text-secondary mt-1">
              <span className="text-text-primary">Group Trivia:</span> A random
              "who is the most ..." type question will be shown, the group
              decides which player fits the question best.
            </div>
          )}
        </SettingContainer>
        <SettingContainer>
          <ToggleContainer>
            <label>Keep Awake</label>
            <ToggleButton
              checked={settings.keepAwake}
              onChange={() => {
                setSettings({
                  ...settings,
                  keepAwake: !settings.keepAwake,
                });
              }}
            />
          </ToggleContainer>
          <Description>
            Will prevent device from going to sleep while this app is open if
            this is enabled.
          </Description>
        </SettingContainer>
        {(!window.isIOS || window.isIPad) && (
          <SettingContainer>
            <ToggleContainer>
              <label>Fullscreen on start</label>
              <ToggleButton
                checked={settings.goFullscreenOnStart}
                onChange={() => {
                  setSettings({
                    ...settings,
                    goFullscreenOnStart: !settings.goFullscreenOnStart,
                  });
                }}
              />
            </ToggleContainer>
            <Description>
              Will enter fullscreen mode when starting a game if this is
              enabled.
            </Description>
          </SettingContainer>
        )}

        <SettingContainer>
          <ToggleContainer>
            <label>Show animations</label>
            <ToggleButton
              checked={settings.showAnimations}
              onChange={() => {
                setSettings({
                  ...settings,
                  showAnimations: !settings.showAnimations,
                });
              }}
            />
          </ToggleContainer>
          <Description>
            Disables the following animation:
            <ul className="pl-1 list-inside">
              <li className="list-disc">Glow effect on start menu</li>
            </ul>
          </Description>
        </SettingContainer>
        <SettingContainer>
          <ToggleContainer>
            <label>Show Match Score</label>
            <ToggleButton
              checked={settings.showMatchScore}
              onChange={() => {
                setSettings({
                  ...settings,
                  showMatchScore: !settings.showMatchScore,
                });
              }}
            />
          </ToggleContainer>
          <Description>
            Shows a score badge on each player's card to track wins across
            multiple games.
          </Description>
        </SettingContainer>
        <Separator height="1px" />
        <div className="flex w-full justify-center">
          <button
            className="mt-1 mb-1 bg-primary-main px-3 py-1 rounded-md duration-200 ease-in-out shadow-[1px_2px_4px_0px_rgba(0,0,0,0.3)] hover:bg-primary-dark font-bold"
            onClick={() => {
              analytics.trackEvent('settings_save_clicked');
              dialogRef.current?.close();
            }}
          >
            <span className="text-sm">Save and Close</span>
          </button>
        </div>
        {!isPWA && (
          <>
            {window.isIOS && (
              <>
                <Separator height="1px" />
                <SettingContainer>
                  <ToggleContainer>
                    <Paragraph>
                      <b>Tip:</b> You can{' '}
                      <b>add this webapp to your home page</b> to have it act
                      just like a normal app!
                    </Paragraph>
                  </ToggleContainer>
                  <Description className="mt-1">
                    If you do, this web app will work offline and the toolbar
                    will be automatically hidden.
                  </Description>
                </SettingContainer>
              </>
            )}

            {!window.isIOS && (
              <>
                <Separator height="1px" />
                <SettingContainer>
                  <ToggleContainer>
                    <Paragraph>
                      <b>Tip:</b> You can <b>install this page as a PWA</b> to
                      have it act just like a normal app!
                    </Paragraph>
                  </ToggleContainer>
                  <Description className="mt-1">
                    If you do, this web app will work offline and the toolbar
                    will be automatically hidden. PWA stands for Progressive Web
                    Application
                  </Description>
                </SettingContainer>
                <div className="flex w-full justify-center">
                  <InstallPWAButton />
                </div>
              </>
            )}
          </>
        )}
        <Separator height="1px" />
      </Dialog>

      <ShareDialog
        dialogRef={shareDialogRef}
        players={players}
        initialGameSettings={initialGameSettings}
        startingPlayerIndex={startingPlayerIndex}
        gameScore={gameScore}
        lifeHistory={lifeHistory}
        version={version.installedVersion}
      />
    </>
  );
};
