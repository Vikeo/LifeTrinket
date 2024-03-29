import { Button, Modal, Switch } from '@mui/material';
import { useEffect, useState } from 'react';
import { twc } from 'react-twc';
import { useGlobalSettings } from '../../Hooks/useGlobalSettings';
import { Cross } from '../../Icons/generated';
import { PreStartMode } from '../../Types/Settings';
import { ModalWrapper } from './InfoModal';
import { Separator } from './Separator';
import { Paragraph } from './TextComponents';

const SettingContainer = twc.div`w-full flex flex-col mb-2`;

const ToggleContainer = twc.div`flex flex-row justify-between items-center -mb-1`;

const Container = twc.div`flex flex-col items-center w-full`;

const Description = twc.p`mr-16 text-xs text-left text-text-secondary`;

type SettingsModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

export const SettingsModal = ({ isOpen, closeModal }: SettingsModalProps) => {
  const { settings, setSettings, isPWA } = useGlobalSettings();
  const [isLatestVersion, setIsLatestVersion] = useState(false);
  const [newVersion, setNewVersion] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    async function checkIfLatestVersion() {
      try {
        const result = await fetch(
          'https://api.github.com/repos/Vikeo/LifeTrinket/releases/latest',
          {
            headers: {
              /* @ts-expect-error is defined in vite.config.ts*/
              Authorization: `Bearer ${REPO_READ_ACCESS_TOKEN}`,
              Accept: 'application/vnd.github+json',
              'X-GitHub-Api-Version': '2022-11-28',
            },
          }
        );
        const data = await result.json();

        if (!data.name) {
          setNewVersion(undefined);
          setIsLatestVersion(false);
          return;
        }

        setNewVersion(data.name);

        /* @ts-expect-error is defined in vite.config.ts*/
        if (data.name === APP_VERSION) {
          setIsLatestVersion(true);
          return;
        }

        setIsLatestVersion(false);
      } catch (error) {
        console.error('error getting latest version string', error);
      }
    }
    checkIfLatestVersion();
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      className="w-full flex justify-center"
    >
      <>
        <div className="flex justify-center items-center relative w-full max-w-[532px]">
          <button
            onClick={closeModal}
            className="flex absolute top-12 right-0 z-10 w-10 h-10 bg-primary-main items-center justify-center rounded-full border-solid border-primary-dark border-2"
          >
            <Cross size="16px" className="text-text-primary " />
          </button>
        </div>
        <ModalWrapper>
          <Container>
            <h2 className="text-center text-2xl mb-2">⚙️ Settings ⚙️</h2>
            <SettingContainer>
              <Paragraph>
                {/* @ts-expect-error is defined in vite.config.ts*/}
                Current version: {APP_VERSION}{' '}
                {isLatestVersion && (
                  <span className="text-sm text-text-secondary">(latest)</span>
                )}
              </Paragraph>
              {!isLatestVersion && newVersion && (
                <Paragraph className="text-text-secondary text-lg text-center">
                  New version ({newVersion}) is available!{' '}
                </Paragraph>
              )}
            </SettingContainer>
            {!isLatestVersion && newVersion && (
              <Button
                variant="contained"
                style={{ marginTop: '0.25rem', marginBottom: '0.25rem' }}
                onClick={() => window?.location?.reload()}
              >
                <span>Update</span>
                <span className="text-xs">&nbsp;(reload app)</span>
              </Button>
            )}
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
                <label htmlFor="pre-start-modes">Pre-Start mode</label>
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
                  <option value={PreStartMode.None}>None</option>
                  <option value={PreStartMode.RandomKing}>Random King</option>
                  <option value={PreStartMode.FingerGame}>Finger Game</option>
                </select>
              </div>
              <div className="text-xs text-left text-text-secondary">
                Different ways to determine the starting player before the game
                starts.
              </div>

              {settings.preStartMode === PreStartMode.None && (
                <div className="text-xs text-left text-text-secondary mt-1">
                  <span className="text-text-primary">None:</span> The starting
                  player will simply be shown.
                </div>
              )}
              {settings.preStartMode === PreStartMode.RandomKing && (
                <div className="text-xs text-left text-text-secondary mt-1">
                  <span className="text-text-primary">Random King:</span>{' '}
                  Randomly pass a crown between all players, press the screen to
                  stop it. The player who has the crown when it stops gets to
                  start.
                </div>
              )}
              {settings.preStartMode === PreStartMode.FingerGame && (
                <div className="text-xs text-left text-text-secondary mt-1">
                  <span className="text-text-primary">Finger Game:</span> All
                  players put a finger on the screen, one will be chosen at
                  random.
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

            <Button
              variant="contained"
              onClick={closeModal}
              style={{ marginTop: '0.25rem' }}
            >
              Save and Close
            </Button>
          </Container>
        </ModalWrapper>
      </>
    </Modal>
  );
};
