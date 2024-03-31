import { Modal, Switch } from '@mui/material';
import { useEffect } from 'react';
import { twc } from 'react-twc';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { Cross } from '../../Icons/generated';
import { PreStartMode } from '../../Types/Settings';
import { ModalWrapper } from './InfoModal';
import { Separator } from './Separator';
import { Paragraph } from './TextComponents';
import { useAnalytics } from '../../Hooks/useAnalytics';

const SettingContainer = twc.div`w-full flex flex-col mb-2`;

const ToggleContainer = twc.div`flex flex-row justify-between items-center -mb-1`;

const Container = twc.div`flex flex-col items-start w-full`;

const Description = twc.p`mr-16 text-xs text-left text-text-secondary`;

const baseGithubReleasesUrl =
  'https://github.com/Vikeo/LifeTrinket/releases/tag/';

type SettingsModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export const SettingsModal = ({ isOpen, closeModal }: SettingsModalProps) => {
  const { settings, setSettings, isPWA, version } = useGlobalSettings();
  const analytics = useAnalytics();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    analytics.trackEvent('settings_opened');
    version.checkForNewVersion('settings');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        analytics.trackEvent('settings_outside_clicked');

        closeModal();
      }}
      className="w-full flex justify-center"
    >
      <>
        <div className="flex justify-center items-center relative w-full max-w-[532px]">
          <button
            onClick={() => {
              analytics.trackEvent('settings_cross_clicked');
              closeModal();
            }}
            className="flex absolute top-12 right-0 z-10 w-10 h-10 bg-primary-main items-center justify-center rounded-full border-solid border-primary-dark border-2"
          >
            <Cross size="16px" className="text-text-primary " />
          </button>
        </div>
        <ModalWrapper>
          <Container>
            <h2 className="text-center text-2xl mb-2 w-full">⚙️ Settings ⚙️</h2>
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

            <SettingContainer>
              <ToggleContainer>
                <label>Show Player Menu Cog</label>
                <Switch
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
                A cog on the top right of each player's card will be shown if
                this is enabled.
              </Description>
            </SettingContainer>
            <SettingContainer>
              <ToggleContainer>
                <label>Show Start Player</label>
                <Switch
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
                  className="bg-primary-main border-none outline-none text-text-primary rounded-md p-1 text-xs disabled:bg-primary-dark"
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
                  <option value={PreStartMode.FingerGame}>
                    Touch Roulette
                  </option>
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
                  <span className="text-text-primary">Royal Shuffle:</span>{' '}
                  Randomly pass a crown between all players, press the screen to
                  stop it. The player who has the crown when it stops gets to
                  start.
                </div>
              )}
              {settings.preStartMode === PreStartMode.FingerGame && (
                <div className="text-xs text-left text-text-secondary mt-1">
                  <span className="text-text-primary">Touch Roulette:</span> All
                  players put a finger on the screen, one will be chosen at
                  random.
                </div>
              )}

              {settings.preStartMode === PreStartMode.Trivia && (
                <div className="text-xs text-left text-text-secondary mt-1">
                  <span className="text-text-primary">Group Trivia:</span> A
                  random "who is the most ..." type question will be shown, the
                  group decides which player fits the question best.
                </div>
              )}
            </SettingContainer>
            <SettingContainer>
              <ToggleContainer>
                <label>Keep Awake</label>
                <Switch
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
                Will prevent device from going to sleep while this app is open
                if this is enabled.
              </Description>
            </SettingContainer>
            <SettingContainer>
              <ToggleContainer>
                <label>
                  Fullscreen on start{' '}
                  <span className="text-xs">(Android only)</span>
                </label>
                <Switch
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
            <Separator height="1px" />
            <button
              className="flex justify-center self-center items-center mt-1 mb-1 bg-primary-main px-3 py-1 rounded-md"
              onClick={() => {
                analytics.trackEvent('settings_save_clicked');
                closeModal();
              }}
            >
              <span className="text-sm">Save and Close</span>
            </button>
            {!isPWA && (
              <>
                <Separator height="1px" />
                <SettingContainer>
                  <ToggleContainer>
                    <Paragraph>
                      <b>Tip:</b> You can{' '}
                      <b>add this webapp to your home page on iOS</b> or{' '}
                      <b>install it on Android</b> to have it act just like a
                      normal app!
                    </Paragraph>
                  </ToggleContainer>
                  <Description className="mt-1">
                    If you do, this app will work offline and the toolbar will
                    be automatically hidden.
                  </Description>
                </SettingContainer>
              </>
            )}
            <Separator height="1px" />
          </Container>
        </ModalWrapper>
      </>
    </Modal>
  );
};
